import {axios} from "@/lib/axios";
import {useNotificationStore} from "@/stores/notifications";
import {useMutation} from "@tanstack/react-query";
import {ThingInStore} from "@/features/adminmanagethings/types";
import {MutationConfig, queryClient} from "@/lib/react-query";


export const purchaseThingInStore = (t: ThingInStore): Promise<boolean> => {
        console.log("REQUEST WITH ID")
        console.log(t)
        return axios.post('/client/thinginstore', t)
    }
;

type UsePurchaseThingInStoreOptions = {
    config?: MutationConfig<typeof purchaseThingInStore>;
};

export const usePurchaseThingInStore = ({config}: UsePurchaseThingInStoreOptions = {}) => {
    const {addNotification} = useNotificationStore();
    const mutation = useMutation<boolean, any, ThingInStore>(purchaseThingInStore, {
        onMutate: async (deletedThingInStore) => {
            await queryClient.cancelQueries(['thinginstore']);
            const previousThingInStore = queryClient.getQueryData<ThingInStore[]>(['thinginstore']);
            queryClient.setQueryData(
                ['thinginstore'],
                previousThingInStore?.filter(
                    (thingInStore) => thingInStore.id !== deletedThingInStore.id
                )
            );

            return {previousThingInStore};
        },
        onError: (error, _, context: any) => {
            if (context?.previousThingInStore) {
                queryClient.setQueryData(['thinginstore'], context.previousThingInStore);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['thinginstore']);
            addNotification({
                type: 'success',
                title: "Merci pour votre achat. Vous pouvez désormais retrouver votre objet connecté dans votre liste",
            });
        },
        ...config
    });

    return mutation;
};
