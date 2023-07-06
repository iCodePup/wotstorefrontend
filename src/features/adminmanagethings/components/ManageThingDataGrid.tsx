import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import {frFR} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {useThingTypes} from "@/features/adminmanagethings/api/getThingType";
import {CircularProgress} from "@mui/material";
import {createThingInStore} from "@/features/adminmanagethings/api/createThingInStore";
import {useThingsInStore} from "@/features/adminmanagethings/api/getThingInStore";
import {ThingInStore, ThingTypeDataGrid} from "@/features/adminmanagethings/types";
import {deleteThingInStore} from '../api/deleteThingInStore';


export function ManageThingDataGrid() {

    const thingTypesQuery = useThingTypes();
    const thingsInStoreQuery = useThingsInStore();
    const [rows, setRows] = useState<ThingInStore[]>([]);
    const [optionsType, setOptionsType] = useState<ThingTypeDataGrid[]>([]);

    useEffect(() => {
        setOptionsType([]);
        if (thingTypesQuery.data) {
            thingTypesQuery.data.map(type => {
                let newElement = {
                    key: type.id,
                    value: type.id,
                    label: type.title
                } as ThingTypeDataGrid;
                setOptionsType(optionsType => [...optionsType, newElement]);
            });
        }
    }, [thingTypesQuery.data])

    useEffect(() => {
        setRows([]);
        if (thingsInStoreQuery.data) {
            thingsInStoreQuery.data.map(thingInStore => {
                setRows(rows => [...rows, thingInStore]);
            });
        }
    }, [thingsInStoreQuery.data])


    if (thingsInStoreQuery.isLoading || thingTypesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }

    const columns = [
        {
            field: "thingId",
            headerName: "Type d'objet connecté",
            width: 200,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            // valueOptions: [{key: "0", value: "0", label: "A"}, {key: "1", value: "1", label: "B"}, {
            //     key: "2",
            //     value: "2",
            //     label: "C"
            // }],
            valueOptions: optionsType,
            //defaultValue: { value: "0", label: "test" },
            editable: true,
        },
        {
            field: "name",
            headerName: "Nom",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "prix",
            headerName: "Prix",
            width: 200,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: true,
        }
    ];

    // @ts-ignore
    const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
            if (id === -Infinity) {
                id = 0;
            }
            const data = await createThingInStore({
                id: id,
                thingId: updatedRow.thingId,
                name: updatedRow.name,
                description: updatedRow.description,
                prix: updatedRow.prix
            }, () => {
                // @ts-ignore
                setRows(oldRows)
            })

            // sellerController // server communication controller
            //     .saveRow(updatedRow) // send row data of the component
            //     .then((res) => {
            //         console.log("server saving success!");
            //         const dbRow = res.data; // get exact row data of server from response
            //         setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r))); // syncronize server and component
            //     })
            //     .catch((err) => {
            //         console.log("server saving failed!");
            //        // update nothing on component by old rows
            //     });
        }
    ;

    // @ts-ignore
    const onDeleteRow = async (id, oldRow, oldRows) => {
        if (id === -Infinity) {
            id = 0;
        }
        const data = await deleteThingInStore(
            id, () => {
                // @ts-ignore
                setRows(oldRows)
            })

        console.log(data)

        // sellerController
        //     .deleteRow(id)
        //     .then((res) => {
        //         console.log("server deleting success!");
        //         const dbRowId = res.data.id; // get exact deleted id of server from response
        //         setRows(oldRows.filter((r) => r.id !== dbRowId)); // remove row in component
        //     })
        //     .catch((err) => {
        //         console.log("server deleting failed!");
        //         setRows(oldRows); // update nothing on component by old rows
        //     });
    };

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <FullFeaturedCrudGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={rows}
                    defaultPageSize={undefined}
                    onSaveRow={onSaveRow}
                    onDeleteRow={onDeleteRow}
                    createRowData={undefined}
                    onProcessRowUpdateError={undefined}
                />
            </Paper>
        </Grid>
    </Grid>)
}
