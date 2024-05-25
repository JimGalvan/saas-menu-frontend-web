import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';

import {MenuItem} from '../types';

export const getMenuItems = async ({menuId, searchParams = {}}: { menuId: string, searchParams?: Record<string, string | number> }): Promise<{count: number, results: MenuItem[]}> => {

    const fetchUrl = new URL(`/menus/${menuId}/menu_items/`);
    // Object.entries(searchParams).forEach(([key, value]) => {
    //     fetchUrl.searchParams.set(key, `${value}`);
    // });
    console.log("URL: " + fetchUrl.href);
    const response = await axios.get(`/menus/${menuId}/menu_items/`);
    return response.data; // return the entire response object
};

type QueryFnType = typeof getMenuItems

type UseMenuItemsOptions = {
    config?: QueryConfig<QueryFnType>;
    menuId: string;
    searchParams?: Record<string, string | number>;
};

export const useMenuItems = ({menuId, searchParams = {}, config}: UseMenuItemsOptions) => {

    const query = useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['menu-items', ...Object.values(searchParams)],
        queryFn: () => getMenuItems({menuId, searchParams}),
        placeholderData: keepPreviousData,
    });

    // Access the count property from the returned object
    const count = query.data?.count;

    return {...query, count}; // Include count in the returned object
};