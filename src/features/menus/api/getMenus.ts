import {useQuery} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';
import {ApiResponse} from "@/types";
import {Menu} from "@/features/menus/types";


export const getMenus = (): Promise<ApiResponse<Menu>> => {
    return axios.get(`/menus/`);
};

type GetMenusQueryFnType = typeof getMenus;

type UseMenusOptions = {
    config?: QueryConfig<GetMenusQueryFnType>;
};

export const useMenus = ({config}: UseMenusOptions) => {
    return useQuery<ExtractFnReturnType<GetMenusQueryFnType>>({
        ...config,
        queryKey: ['menus'],
        queryFn: getMenus,
    });
};
