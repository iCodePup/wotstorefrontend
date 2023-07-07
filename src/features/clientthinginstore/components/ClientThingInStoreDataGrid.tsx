import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {frFR, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "@/components/datagrid";
import {useThingTypes} from "@/features/clientthinginstore/api/getThingType";
import {CircularProgress} from "@mui/material";
import {useThingsInStore} from "@/features/clientthinginstore/api/getThingInStore";
import ReadOnlyToolbar from "@/components/datagrid/ReadOnlyToolbar";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {usePurchaseThingInStore} from "@/features/clientthinginstore/api/purchaseThingInStore";


export function ClientThingInStoreDataGrid() {

    const thingTypesQuery = useThingTypes();
    const thingsInStoreQuery = useThingsInStore();
    const purchaseThingInStoreMutation = usePurchaseThingInStore();

    if (thingsInStoreQuery.isLoading || thingTypesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingsInStoreQuery.data) return null;
    if (!thingTypesQuery.data) return null;

    const columns = [
        {
            field: "thingId",
            headerName: "Type d'objet connecté",
            width: 200,
            headerAlign: "center",
            type: "singleSelect",
            align: "center",
            valueOptions: thingTypesQuery.data,
            editable: false,
        },
        {
            field: "name",
            headerName: "Nom",
            width: 200,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            headerAlign: "center",
            type: "string",
            align: "center",
            editable: false,
        },
        {
            field: "prix",
            headerName: "Prix",
            width: 20,
            headerAlign: "center",
            type: "integer",
            align: "center",
            editable: false,
        }
    ];

    const handleBuyClick = (row: any) => async () => {
        console.log("BUT" + row)
        await purchaseThingInStoreMutation.mutateAsync(row.row)
    };


    const newColmuns = [
        ...columns,
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: (row: any) => {
                //const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                //
                // if (isInEditMode) {
                //     return [
                //         <GridActionsCellItem
                //             icon={<SaveIcon/>}
                //             label="Save"
                //             onClick={console.log(id)}
                //         />,
                //         <GridActionsCellItem
                //             icon={<CancelIcon/>}
                //             label="Cancel"
                //             className="textPrimary"
                //             onClick={console.log(id)}
                //             color="inherit"
                //         />
                //     ];
                // }

                return [
                    <GridActionsCellItem
                        icon={<ShoppingCart/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleBuyClick(row)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <FullFeaturedCrudGrid
                    readOnly={true}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    columns={newColmuns}
                    rows={thingsInStoreQuery.data}
                    defaultPageSize={undefined}
                    onSaveRow={undefined}
                    onDeleteRow={undefined}
                    createRowData={undefined}
                    onProcessRowUpdateError={undefined}
                    slots={{
                        toolbar: ReadOnlyToolbar
                    }}
                />
            </Paper>
        </Grid>
    </Grid>)
}
