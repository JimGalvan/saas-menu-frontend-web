import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {MenuItem} from '../types';

export const getMenuItem = ({menuItemId}: { menuItemId: string }): Promise<MenuItem> => {
    return axios.get(`/menu-items/${menuItemId}`);
};

type QueryFnType = typeof getMenuItem;

type UseDiscussionOptions = {
    menuItemId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useMenuItem = ({menuItemId, config}: UseDiscussionOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['menuItem', menuItemId],
        queryFn: () => getMenuItem({menuItemId}),
    });
};
