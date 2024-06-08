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
import {IconRefresh} from '@tabler/icons-react';

import defaultImage from "@/assets/menu-item-placeholder.webp";
import '@/App.css';
import {useMenuItems} from "@/features/menu-items/api/getMenuItems.ts";
import {MenuItem} from "@/features/menu-items";
import {DeleteMenuItem} from "@/features/menu-items/components/DeleteMenuItem.tsx";
import {formatPrice} from "@/utils/format.ts";
import {UpdateMenuItem} from "@/features/menu-items/components/UpdateMenuItem.tsx";
import {Menu} from "@/features/menus/types";

type MantineAdminTableProps = {
    menuId: string;
    menu: Menu;
};

const MenuItemList = ({menuId, menu}: MantineAdminTableProps) => {
        const columns = useMemo<MRT_ColumnDef<MenuItem>[]>(
            () => [
                {
                    header: '#',
                    size: 50,
                    Cell({row}) {
                        return <span>{row.index + 1}</span>;
                    },
                },
                {
                    header: 'Image',
                    accessorKey: 'image',
                    enableColumnFilter: false,
                    enableSorting: false,
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
                    Cell({cell}) {
                        // @ts-ignore todo fix this
                        return <span className={cell.getValue() ? '' : 'menu-item-description-unavailable-gray-text'}>{cell.getValue() || 'No description'}</span>;
                    }
                },
                {
                    header: 'Price',
                    accessorKey: 'price',
                    Cell({cell}) {
                        // @ts-ignore todo fix this
                        return <span>{formatPrice(cell.getValue())}</span>;
                    }
                },
                {
                    header: 'Category',
                    accessorKey: 'categoryName',
                },
                {
                    header: 'Actions',
                    accessorKey: 'id',
                    enableColumnFilter: false,
                    enableSorting: false,
                    Cell({cell}) {
                        return (
                            <div className="flex space-x-2">
                                <Tooltip label="Edit">
                                    <ActionIcon>
                                        <UpdateMenuItem menuItemId={cell.row.original.id} menu={menu}/>
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Delete">
                                    <ActionIcon>
                                        <DeleteMenuItem id={cell.row.original.id}/>
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
            rowCount: Number(totalRowCount),
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

export default MenuItemList;