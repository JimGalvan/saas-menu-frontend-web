import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {axios} from '@/lib/axios';
import {QueryConfig} from '@/lib/react-query';

import {MenuItem} from '../types';

import type {
    MRT_ColumnFilterFnsState,
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState
} from "mantine-react-table";
import {API_URL} from "@/config";

type UseMenuItemsResponse = {
    results: Array<MenuItem>;
    count: string;
    next: string | null;
    previous: string | null;
};

type CommonOptions = {
    menuId: string;
    pagination?: MRT_PaginationState;
    columnFilterFns?: MRT_ColumnFilterFnsState;
    columnFilters?: MRT_ColumnFiltersState;
    globalFilter?: string;
    sorting?: MRT_SortingState;
};

type Params = CommonOptions;

type UseMenuItemsOptions = CommonOptions & {
    config?: QueryConfig<QueryFnType>;
};

const fieldMapping: { [key: string]: string } = {
    categoryName: 'category__name',
};

function getFetchURL(menuId: string, defaultFilter: string = "?ordering=-createdAt"): URL {
    return new URL(`${API_URL}/menus/${menuId}/menu_items/${defaultFilter}`);
}

export const getMenuItems = ({
                                 menuId,
                                 pagination = {pageIndex: 0, pageSize: 10},
                                 columnFilterFns,
                                 columnFilters,
                                 globalFilter,
                                 sorting = [],
                             }: Params): Promise<UseMenuItemsResponse> => {

    const fetchURL = getFetchURL(menuId);

    fetchURL.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
    );
    fetchURL.searchParams.set('size', `${pagination.pageSize}`);
    fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    fetchURL.searchParams.set('filterModes', JSON.stringify(columnFilterFns ?? {}),);
    fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
    fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));
    fetchURL.searchParams.set('search', globalFilter ?? '');

    if (sorting.length > 0) {
        let sortField = sorting[0].id;
        const sortOrder = sorting[0].desc ? '-' : '';

        // Use the field mapping to convert the field name
        if (sortField in fieldMapping) {
            sortField = fieldMapping[sortField];
        }

        fetchURL.searchParams.set('ordering', `${sortOrder}${sortField}`);
    }

    return axios.get(fetchURL.href);
};

type QueryFnType = typeof getMenuItems

export const useMenuItems = ({
                                 menuId,
                                 pagination,
                                 columnFilterFns,
                                 columnFilters,
                                 globalFilter,
                                 sorting,
                                 config
                             }: UseMenuItemsOptions) => {

    const query = useQuery<UseMenuItemsResponse>({
        ...config,
        queryKey: ['menu-items', menuId, pagination, columnFilterFns, columnFilters, globalFilter, sorting],
        queryFn: () => getMenuItems(
            {
                menuId,
                pagination,
                columnFilterFns,
                columnFilters,
                globalFilter,
                sorting
            }
        ),
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });

    return {
        data: query.data,
        isError: query.isError,
        isFetching: query.isFetching,
        isLoading: query.isLoading,
        refetch: query.refetch,
    };
};
