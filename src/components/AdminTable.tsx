import {useMemo, useState} from 'react';
import {
    MantineReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFilterFnsState,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
    useMantineReactTable,
} from 'mantine-react-table';
import {ActionIcon, Tooltip} from '@mantine/core';
import {IconEdit, IconRefresh, IconTrash} from '@tabler/icons-react';

import MenuItem from "@/models/MenuItem.ts";
import defaultImage from "@/assets/menu-item-placeholder.webp";
import '@/App.css';
import {useMenuItems} from "@/features/menu-items/api/getMenuItemsMantine.ts";
import {Link} from "react-router-dom";

type MantineAdminTableProps = {
    menuId: string;
};

const AdminTable = ({menuId}: MantineAdminTableProps) => {
        const columns = useMemo<MRT_ColumnDef<MenuItem>[]>(
            () => [
                {
                    header: 'Image',
                    accessorKey: 'image',
                    Cell({cell}) {
                        // @ts-ignore
                        return <img className="fixed-size-image" src={cell.image || defaultImage} alt="Menu item"/>;
                    },
                },
                {
                    header: 'Name',
                    accessorKey: 'name',
                },
                {
                    header: 'Description',
                    accessorKey: 'description',
                    // Cell({cell}) {
                    //     // @ts-ignore
                    //     return <div>{cell.value ? cell.value : "No description"}</div>;
                    // }
                },
                {
                    header: 'Price',
                    accessorKey: 'price',
                },
                {
                    header: 'Category',
                    accessorKey: 'categoryName',
                },
                {
                    header: 'Actions',
                    accessorKey: 'id',
                    Cell({cell}) {
                        return (
                            <div className="flex space-x-2">
                                <Tooltip label="Edit">
                                    <ActionIcon>
                                        <Link to={`./${cell.getValue()}/`}>
                                            <IconEdit/>
                                        </Link>
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Delete">
                                    <ActionIcon>
                                        <IconTrash/>
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        );
                    },
                }
            ],
            [],
        );

        //Manage MRT state that we want to pass to our API
        const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
            [],
        );
        const [columnFilterFns, setColumnFilterFns] = //filter modes
            useState<MRT_ColumnFilterFnsState>(
                Object.fromEntries(
                    columns.map(({accessorKey}) => [accessorKey, 'contains']),
                ),
            ); //default to "contains" for all columns
        const [globalFilter, setGlobalFilter] = useState('');
        const [sorting, setSorting] = useState<MRT_SortingState>([]);
        const [pagination, setPagination] = useState<MRT_PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

        //call our custom react-query hook
        const {data, isError, isFetching, isLoading, refetch} = useMenuItems({
                    menuId,
                    columnFilterFns,
                    columnFilters,
                    globalFilter,
                    pagination,
                    sorting,
                }
            )
        ;

        const fetchedMenuItems = data?.results ?? [];
        const totalRowCount = data?.count ?? 0;

        console.log("fetchedMenuItems: " + fetchedMenuItems)
        console.log("totalRowCount: " + totalRowCount)

        const table = useMantineReactTable({
            columns,
            data: fetchedMenuItems,
            enableColumnFilterModes: true,
            columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'],
            initialState: {showColumnFilters: false},
            manualFiltering: true,
            manualPagination: true,
            manualSorting: true,
            mantineToolbarAlertBannerProps: isError
                ? {
                    color: 'red',
                    children: 'Error loading data',
                }
                : undefined,
            onColumnFilterFnsChange: setColumnFilterFns,
            onColumnFiltersChange: setColumnFilters,
            onGlobalFilterChange: setGlobalFilter,
            onPaginationChange: setPagination,
            onSortingChange: setSorting,
            renderTopToolbarCustomActions: () => (
                <Tooltip label="Refresh Data">
                    <ActionIcon onClick={() => refetch()}>
                        <IconRefresh/>
                    </ActionIcon>
                </Tooltip>
            ),
            rowCount: totalRowCount,
            state: {
                columnFilterFns,
                columnFilters,
                globalFilter,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isFetching,
                sorting,
            },
        });

        return <MantineReactTable table={table}/>;
    }
;

export default AdminTable;