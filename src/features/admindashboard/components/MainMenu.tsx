import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import {useEffect} from "react";
import {dashboardBody} from "@/features/admindashboard/components/dashboardBody";
import { ManageThingDataGrid } from '@/features/adminmanagethings/components/ManageThingDataGrid';


// @ts-ignore
export function MainMenu({updateBody}) {

    return (<React.Fragment>
        <ListItemButton onClick={(event) => {
            updateBody(dashboardBody)
        }}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Accueil"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<ManageThingDataGrid/>)
        }}>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Gestion du magasin"/>
        </ListItemButton>
        <ListItemButton onClick={(event) => {
            updateBody(<div>todo</div>)
        }}>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Gestion des clients"/>
        </ListItemButton>
    </React.Fragment>)
}