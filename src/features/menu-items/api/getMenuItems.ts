import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { MenuItem } from '../types';

export const getMenuItems = (): Promise<MenuItem[]> => {
    return axios.get('/menus/1/menu_items/');
};

type QueryFnType = typeof getMenuItems

type UseMenuItemsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useMenuItems = ({ config }: UseMenuItemsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['menu-items'],
        queryFn: () => getMenuItems(),
    });
};
