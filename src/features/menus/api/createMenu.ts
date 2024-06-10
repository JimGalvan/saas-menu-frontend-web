import {useMutation} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';

import {CreateMenuDTO} from '../types';

export const createMenu = ({data}: { data: CreateMenuDTO }): Promise<CreateMenuDTO> => {
    return axios.post(`/menus/`, data);
};

type UseCreateMenuOptions = {
    config?: MutationConfig<typeof createMenu>;
};

export const useCreateMenu = ({config}: UseCreateMenuOptions = {}) => {
    const {addNotification} = useNotificationStore();
    return useMutation({
        onMutate: async (newMenu: { data: CreateMenuDTO }) => {
            await queryClient.cancelQueries({queryKey: ['menus']});

            const previousMenus = queryClient.getQueryData<CreateMenuDTO[]>(['menus']);

            queryClient.setQueryData(['menus'], [...(previousMenus || []), newMenu.data]);

            return {previousMenus: previousMenus};
        },
        onError: (_, __, context: any) => {
            if (context?.previousMenus) {
                queryClient.setQueryData(['menus'], context.previousMenus);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['menus']}).then(result => console.log(result));
            addNotification({
                type: 'success',
                title: 'Menu Created',
            });
        },
        ...config,
        mutationFn: createMenu,
    });
};