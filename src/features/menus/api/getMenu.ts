import {useQuery} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {Menu} from '../types';

export const getMenu = ({menuId}: { menuId: string }): Promise<Menu> => {
    return axios.get(`/menus/${menuId}`);
};

type QueryFnType = typeof getMenu;

type UseMenuOptions = {
    menuId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useMenu = ({menuId, config}: UseMenuOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['menu', menuId],
        queryFn: () => getMenu({menuId: menuId}),
    });
};
