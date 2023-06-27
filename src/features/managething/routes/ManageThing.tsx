import {useNavigate} from 'react-router-dom';
import ManageThingForm from "@/features/managething/components/ManageThingForm";


export const ManageThing = () => {
    const navigate = useNavigate();

    return (
        <ManageThingForm onSuccess={() => navigate('/app')}/>
    );
};
