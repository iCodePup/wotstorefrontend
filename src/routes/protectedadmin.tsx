import DashboardComponent from "@/features/managething/components/DashboardComponent";
import {useNavigate} from 'react-router-dom';
import {ManageThingRoutes} from "@/features/managething";

export const protectedAdminRoutes = [
    {
        path: '/*',
        element: <ManageThingRoutes/>,
    },
];


