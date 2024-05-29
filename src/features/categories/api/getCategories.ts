import {axios} from '@/lib/axios';
import {Category} from '../types';
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query.ts";
import {useQuery} from '@tanstack/react-query';

export const getCategories = ({menuId}: { menuId: string }): Promise<Category[]> => {
    return axios.get(`/menus/${menuId}/categories/`);
};

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
    menuId: string;
    config?: QueryConfig<QueryFnType>;
};

export const useCategories = ({menuId, config}: UseCategoriesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['categories', menuId],
        queryFn: () => getCategories({menuId}),
    });
};