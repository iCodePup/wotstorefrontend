import {useNotificationStore} from '@/stores/notifications';
import {Alert, AlertTitle} from "@mui/material";


export const Notifications = () => {
    const {notifications, dismissNotification} = useNotificationStore();

    return (
        <div
            aria-live="assertive"
            className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
            {notifications.map((notification) => (
                <Alert severity={notification.type}>
                    <AlertTitle>{notification.title}</AlertTitle>
                    {notification.message}
                </Alert>

            ))}
        </div>
    );
};