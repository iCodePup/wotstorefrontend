import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


export const dashboardBody = (
    <Grid container spacing={3}>
        {/* Chart */}
        {/* Nb d'objets à la vente */}
        <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <div>Bienvenue sur le tableau de bord d'administration de WOTStore</div>
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
                <div>nb d'objet à la vente TODO</div>
            </Paper>
        </Grid>
        {/* Nb de clients */}
        <Grid item xs={12} md={4} lg={6}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                <div>nb de clients TODO</div>
            </Paper>
        </Grid>
    </Grid>
);
