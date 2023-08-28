import * as React from "react";
import {
    GridCsvExportMenuItem,
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExportContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function DefaultToolbar(props) {

    const {rows, setRows, setRowModesModel, columns, createRowData} = props;

    const handleClick = () => {
        const newData = createRowData(rows);
        newData.isNew = true;
        if (!newData.hasOwnProperty("id"))
            newData.newId = Math.max(...rows.map((r) => r.id * 1)) + 1;
        setRows((oldRows) => {
            return [...oldRows, newData]
        });
        setRowModesModel((oldModel) => {
            const firstEditable = columns.find(c => c.editable && !c.hide);
            return {
                ...oldModel,
                [newData.id]: {mode: GridRowModes.Edit, fieldToFocus: firstEditable.field}
            }
        });
    };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarExportContainer>
                <GridCsvExportMenuItem/>
            </GridToolbarExportContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Ajouter une nouvelle entrée
            </Button>
            <GridToolbarQuickFilter/>
        </GridToolbarContainer>
    );
}

DefaultToolbar.defaultProps = {
    createRowData: (rows) => {
        const newId = Math.max(...rows.map((r) => r.id * 1)) + 1;
        return {id: newId}
    }
}

export default DefaultToolbar;