import {Table, Spinner, Link} from '@/components/Elements';
import {formatDate} from '@/utils/format';

import {useMenuItems} from '../api/getMenuItems.ts';
import {MenuItem} from '../types';

// import {DeleteDiscussion} from './DeleteDiscussion';

export const MenuItemsList = () => {
    const discussionsQuery = useMenuItems();

    if (discussionsQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!discussionsQuery.data) return null;

    return (
        <Table<MenuItem>
            data={discussionsQuery.data}
            columns={[
                {
                    title: 'ID',
                    field: 'id',
                },
                {
                    title: 'Name',
                    field: 'name',
                },
                {
                    'title': 'Description',
                    field: 'description',
                },
                {
                    title: 'Price',
                    field: 'price',
                },
                {
                    title: 'Image',
                    field: 'image',
                },
                {
                    title: 'Category',
                    field: 'categoryName',
                },
                {
                    title: 'Created At',
                    field: 'createdAt',
                    Cell({entry: {createdAt}}) {
                        return <span>{formatDate(createdAt)}</span>;
                    },
                },
                {
                    title: '',
                    field: 'id',
                    Cell({entry: {id}}) {
                        return <Link to={`./${id}`}>View</Link>;
                    },
                },
                // {
                //     title: '',
                //     field: 'id',
                //     Cell({entry: {id}}) {
                //         return <DeleteDiscussion id={id}/>;
                //     },
                // },
            ]}
        />
    );
};
