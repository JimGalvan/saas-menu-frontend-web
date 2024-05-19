import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {MenuItem} from '../types';

export const getMenuItems = ({menuId}: { menuId: string }): Promise<MenuItem[]> => {
    return axios.get(`/menus/${menuId}/menu_items/`);
};

type QueryFnType = typeof getMenuItems

type UseMenuItemsOptions = {
    config?: QueryConfig<QueryFnType>;
    menuId: string;
};

export const useMenuItems = ({menuId, config}: UseMenuItemsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['menu-items'],
        queryFn: () => getMenuItems({menuId}),
    });
};
