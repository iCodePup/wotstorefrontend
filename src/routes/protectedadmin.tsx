
import {ManageThingRoutes} from "@/features/admindashboard";

export const protectedAdminRoutes = [
    {
        path: '/*',
        element: <ManageThingRoutes/>,
    },
];


