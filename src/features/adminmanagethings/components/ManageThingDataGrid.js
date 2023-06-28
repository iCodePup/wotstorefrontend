import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import {frFR} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {useThingTypes} from "@/features/adminmanagethings/api/getThingType";
import {CircularProgress} from "@mui/material";


export function ManageThingDataGrid() {

    const [rows, setRows] = useState([]);
    const thingTypesQuery = useThingTypes();
    let optionsType = [];
    if (thingTypesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (thingTypesQuery.isSuccess) {
        const newElement = {value: thingTypesQuery.data.id, label: thingTypesQuery.data.title}
        optionsType = thingTypesQuery.data.map(type =>  [...optionsType, newElement])

    }

    const columns = [
        {
            field: "Type d'objet connecté",
            headerName: "Type d'objet connecté",
            width: 200,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            valueOptions: optionsType,
            editable: true,
        },
        {
            field: "Nom",
            headerName: "Nom",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "Description",
            headerName: "Description",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: true,
        },
        {
            field: "Prix",
            headerName: "Prix",
            width: 200,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: true,
        }
    ];


    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <FullFeaturedCrudGrid
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={rows}
                    // onSaveRow={onSaveRow}
                    // onDeleteRow={onDeleteRow}
                    // createRowData={createRowData}
                />
            </Paper>
        </Grid>

    </Grid>)

}
