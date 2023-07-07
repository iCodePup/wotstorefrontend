import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useThingsInStore} from "@/features/clientdashboard/api/getThingInStore";

import {Alert, CircularProgress} from "@mui/material";
import {useUser} from "@/lib/auth";


export default function DashboardClientBody() {

    const thingsInStoreQuery = useThingsInStore();
    const auth = useUser();

    if (thingsInStoreQuery.isLoading || auth.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <CircularProgress size="lg"/>
            </div>
        );
    }
    if (!thingsInStoreQuery.data) return null;
    if (!auth.data) return null;

    return (<Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <div>Bonjour {auth.data.firstName} {auth.data.lastName}. Bienvenue sur la boutique d'objet connecté WOTStore</div>
            </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                <Alert severity="info">Nombre d'objets à la vente : {thingsInStoreQuery.data.length}</Alert>
                <p></p>
                <Alert severity="success">Mes objets connectés : todo</Alert>

            </Paper>
        </Grid>

    </Grid>);

}
