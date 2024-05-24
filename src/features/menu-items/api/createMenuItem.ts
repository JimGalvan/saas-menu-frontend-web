import {useMutation} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';

import {MenuItem} from '../types';

export type CreateMenuItemDTO = {
    data: {
        name: string;
        description: string;
        price: string;
        image: string;
        menu: string;
        category: string;
    };
};

export const createMenuItem = ({data}: CreateMenuItemDTO): Promise<MenuItem> => {
    return axios.post(`/menu-items/`, data);
};

type UseCreateMenuItemOptions = {
    config?: MutationConfig<typeof createMenuItem>;
};

export const useCreateMenuItem = ({config}: UseCreateMenuItemOptions = {}) => {
    const {addNotification} = useNotificationStore();
    return useMutation({
        onMutate: async (newMenuItem: CreateMenuItemDTO) => {
            await queryClient.cancelQueries({queryKey: ['menu-items']});

            const previousMenuItems = queryClient.getQueryData<MenuItem[]>(['menu-items']);

            queryClient.setQueryData(['menu-items'], [...(previousMenuItems || []), newMenuItem.data]);

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
                title: 'Menu Item Created',
            });
        },
        ...config,
        mutationFn: createMenuItem,
    });
};
