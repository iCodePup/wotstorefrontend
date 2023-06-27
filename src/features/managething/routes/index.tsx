import {Route, Routes} from 'react-router-dom';
import {Dashboard} from "@/features/managething/routes/Dashboard";



export const ManageThingRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>
    );
};
