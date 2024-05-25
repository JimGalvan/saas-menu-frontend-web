import {useMemo, useState} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_PaginationState,
} from 'material-react-table';
import {IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuItem from "@/models/MenuItem.ts";
import {useMenuItems} from "@/features/menu-items/api/getMenuItemsParams.ts";


type MenuItemsListProps = {
    menuId: string;
};

const AdminTableQuery = ({menuId}: MenuItemsListProps) => {
        //manage our own state for stuff we want to pass to the API
        const [pagination, setPagination] = useState<MRT_PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

        const page = pagination.pageIndex * pagination.pageSize;
        const searchParams = {
            page,
        };

        //consider storing this code in a custom hook (i.e useFetchUsers)
        const {
            data: { results = [], count = 0 } = {}, // Destructure results and count from data
            isError,
            isRefetching,
            isLoading,
            refetch,
        } = useMenuItems({menuId, searchParams});

        console.log(results, isError, isRefetching, isLoading);

        const columns = useMemo<MRT_ColumnDef<MenuItem>[]>(
            () => [
                {
                    header: 'Name', // replace 'title' with 'Header' or the correct property name
                    accessorKey: 'name', // replace 'field' with 'accessor' or the correct property name
                },
                {
                    header: 'Description', // replace 'title' with 'Header' or the correct property name
                    accessorKey: 'description', // replace 'field' with 'accessor' or the correct property name
                },
                {
                    header: 'Price', // replace 'title' with 'Header' or the correct property name
                    accessorKey: 'price', // replace 'field' with 'accessor' or the correct property name
                }
            ],
            [],
        );

        const table = useMaterialReactTable({
            columns,
            data: results, // Destructure results and count from data
            initialState: {showColumnFilters: true},
            manualFiltering: true, //turn off built-in client-side filtering
            manualPagination: true, //turn off built-in client-side pagination
            manualSorting: true, //turn off built-in client-side sorting
            muiToolbarAlertBannerProps: isError
                ? {
                    color: 'error',
                    children: 'Error loading data',
                }
                : undefined,
            onPaginationChange: setPagination,
            renderTopToolbarCustomActions: () => (
                <Tooltip arrow title="Refresh Data">
                    <IconButton onClick={() => refetch()}>
                        <RefreshIcon/>
                    </IconButton>
                </Tooltip>
            ),
            rowCount: count,
            state: {
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
            },
        });

        return <MaterialReactTable table={table}/>;
    };

export default AdminTableQuery;
