import {useMutation} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';

import {MenuItem} from '../types';

export type UpdateMenuItemDTO = {
    data: {
        name: string;
        description: string;
        price: string;
        image: string;
        menu: string;
        category: string;
    };
    menuItemId: string;
};

export const updateMenuItem = ({data, menuItemId}: UpdateMenuItemDTO): Promise<MenuItem> => {
    return axios.put(`/menu-items/${menuItemId}`, data);
};

type UseUpdateMenuItemOptions = {
    config?: MutationConfig<typeof updateMenuItem>;
};

export const useUpdateMenuItem = ({config}: UseUpdateMenuItemOptions = {}) => {
    const {addNotification} = useNotificationStore();
    return useMutation({
        onMutate: async (updatedMenuItem: UpdateMenuItemDTO) => {
            await queryClient.cancelQueries({queryKey: ['menu-items']});

            const previousMenuItems = queryClient.getQueryData<MenuItem[]>(['menu-items']);

            if (previousMenuItems) {
                const updatedMenuItems = previousMenuItems.map(item =>
                    item.id === updatedMenuItem.menuItemId ? {...item, ...updatedMenuItem.data} : item
                );

                queryClient.setQueryData(['menu-items'], updatedMenuItems);
            }

            return {previousMenuItems: previousMenuItems};
        },
        onError: (_, __, context: any) => {
            if (context?.previousMenuItems) {
                queryClient.setQueryData(['menu-items'], context.previousMenuItems);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menu-items']}).then(result => console.log(result));
            addNotification({
                type: 'success',
                title: 'Menu Item Updated',
            });
        },
        ...config,
        mutationFn: updateMenuItem,
    });
};