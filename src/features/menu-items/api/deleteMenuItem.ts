import {useMutation} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';
import {MenuItem} from "@/features/menu-items";

export const deleteMenuItem = ({menuItemId}: { menuItemId: string }): Promise<MenuItem> => {
    return axios.delete(`/menu-items/${menuItemId}`);
};


type UseDeleteMenuItemOptions = {
    config?: MutationConfig<typeof deleteMenuItem>;
};

export const useDeleteMenuItem = ({config}: UseDeleteMenuItemOptions) => {
    const {addNotification} = useNotificationStore();
    return useMutation({
        onMutate: async (deleteMenuItem: { menuItemId: string; }) => {
            await queryClient.cancelQueries({queryKey: ['menu-items']});

            const previousMenuItems = queryClient.getQueryData<MenuItem[]>(['menu-items']) as MenuItem[];

            queryClient.setQueryData(['menu-items'], previousMenuItems?.filter((menuItem: {
                id: string;
            }) => menuItem.id !== deleteMenuItem.menuItemId));

            return {previousMenuItems: previousMenuItems};
        },
        onError: (_: any, __: any, context: any) => {
            if (context?.previousMenuItems) {
                queryClient.setQueryData(['menu-items'], context.previousMenuItems);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menu-items']});
            addNotification({
                type: 'success',
                title: 'Menu Item Deleted',
            });
        },
        ...config,
        mutationFn: deleteMenuItem,
    });
};
