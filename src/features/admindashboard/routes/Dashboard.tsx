import {useNavigate} from 'react-router-dom';
import DashboardComponent from "@/features/admindashboard/components/DashboardComponent";


export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <DashboardComponent onLogout={() => navigate('/')}/>
    );
};
