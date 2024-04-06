import {useState} from 'react';

import {
    MRT_RowSelectionState,
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    type MRT_ColumnDef,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
// import FilterDropdown from './FilterDropdown';

import MenuItem from '../models/MenuItem';
import useItemList from "../hooks/MenuItems.ts";

// @ts-ignore
const columns: MRT_ColumnDef<MenuItem>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'itemName',
        header: 'Item Name',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'restaurantID',
        header: 'Restaurant ID',
        // @ts-expect-error TODO: fix this with a better type
        Cell: ({cell}) => cell.getValue() ?? 'None',
    },
    {
        accessorKey: 'itemGroupID',
        header: 'Item Group ID',
        // @ts-expect-error TODO: fix this with a better type
        Cell: ({cell}) => cell.getValue() ?? 'None',
    },
    {
        accessorKey: 'itemCategoryID',
        header: 'Item Category ID',
        // @ts-expect-error TODO: fix this with a better type
        Cell: ({cell}) => cell.getValue() ?? 'None',
    },
    {
        accessorKey: 'categoryName',
        header: 'Category Name',
        // @ts-expect-error TODO: fix this with a better type
        Cell: ({cell}) => cell.getValue() ?? 'None',
    },
];
const AdminTable = () => {

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const {items, isLoading, error} = useItemList();
    const table = useMaterialReactTable({
        columns,
        data: items ?? [],
        enableColumnFilters: true,
        enableRowSelection: true,
        muiFilterTextFieldProps: ({column}) => ({
            label: `Filter by ${column.columnDef.header}`,
        }),
        onRowSelectionChange: setRowSelection,
        state: {rowSelection},
        initialState: {
            pagination: {pageSize: 10, pageIndex: 0},
            showColumnFilters: true,
            showGlobalFilter: true,
            sorting: [
                {
                    id: 'categoryName', //sort by age by default on page load
                    desc: false,
                },
            ],
        },
        muiPaginationProps: {
            rowsPerPageOptions: [10, 15, 20],
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });

    const isSomeRowsSelected = () => {
        return Object.values(rowSelection).length > 0;
    }

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {}
            <Stack sx={{m: '2rem 0'}} style={{border: '1px solid #9e9e9e', padding: '10px'}}>
                <Box display="flex" gap='0.5rem' p='4px'>
                    <Button
                        color="secondary"
                        onClick={() => {
                            alert('Create New Account');
                        }}
                        variant="contained"
                    >
                        Create Entity
                    </Button>
                    <Button
                        color="error"
                        disabled={!isSomeRowsSelected()}
                        onClick={() => {
                            alert('Delete Selected Accounts');
                        }}
                        variant="contained"
                    >
                        Delete
                    </Button>
                    {/* <FilterDropdown tableInstance={table} /> */}
                    <Box flexGrow={1}/> {/* Invisible spacer */}
                    <MRT_GlobalFilterTextField table={table}/>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell align="center" variant="head" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.Header ?? header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} selected={row.getIsSelected()}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell align="center" variant="body" key={cell.id}>
                                            <MRT_TableBodyCellValue cell={cell} table={table}/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <MRT_TablePagination table={table}/>
                </Box>
                <MRT_ToolbarAlertBanner stackAlertBanner table={table}/>
            </Stack>
        </div>
    );
};

export default AdminTable;
