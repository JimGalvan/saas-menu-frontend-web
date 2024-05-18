import {useMutation} from 'react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {useNotificationStore} from '@/stores/notifications';

import {MenuItem} from '../types';

export type CreateMenuItemDTO = {
    data: {
        name: string;
        description: string;
        price: number;
        category: number;
    };
};

export const createMenuItem = ({data}: CreateMenuItemDTO): Promise<MenuItem> => {
    return axios.post(`/discussions`, data);
};

type UseCreateDiscussionOptions = {
    config?: MutationConfig<typeof createMenuItem>;
};

export const useCreateMenuItem = ({config}: UseCreateDiscussionOptions = {}) => {
    const {addNotification} = useNotificationStore();
    return useMutation({
        onMutate: async (newDiscussion) => {
            await queryClient.cancelQueries('menu-items');

            const previousDiscussions = queryClient.getQueryData<MenuItem[]>('menu-items');

            queryClient.setQueryData('menu-items', [...(previousDiscussions || []), newDiscussion.data]);

            return {previousDiscussions};
        },
        onError: (_, __, context: any) => {
            if (context?.previousDiscussions) {
                queryClient.setQueryData('menu-items', context.previousDiscussions);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('menu-items');
            addNotification({
                type: 'success',
                title: 'Menu Item Created',
            });
        },
        ...config,
        mutationFn: createMenuItem,
    });
};
