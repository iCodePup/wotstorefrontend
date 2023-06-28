import {Route, Routes} from 'react-router-dom';
import {Dashboard} from "@/features/admindashboard/routes/Dashboard";



export const ManageThingRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>
    );
};
