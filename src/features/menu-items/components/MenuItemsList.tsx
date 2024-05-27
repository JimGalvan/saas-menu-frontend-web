import {Link, Spinner, Table} from '@/components/Elements';
import {formatDate, formatPrice} from '@/utils/format';
import '@/App.css';
import {useMenuItems} from '../api/getMenuItems.ts';
import {MenuItem} from '../types';
import defaultImage from '@/assets/menu-item-placeholder.webp';

type MenuItemsListProps = {
    menuId: string;
};

export const MenuItemsList = ({menuId}: MenuItemsListProps) => {
    const menuItemsQuery = useMenuItems({menuId});

    if (menuItemsQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!menuItemsQuery.data) return null;

    // @ts-ignore
    return (
        <Table<MenuItem>
            // @ts-ignore
            data={menuItemsQuery.data}
            columns={[
                {
                    title: 'ID',
                    field: 'id',
                },
                {
                    title: 'Image',
                    field: 'image',
                    Cell({entry: {image}}) {
                        return <img className="fixed-size-image" src={image || defaultImage} alt="Menu item"/>;
                    },
                },
                {
                    title: 'Name',
                    field: 'name',
                },
                {
                    'title': 'Description',
                    field: 'description',
                    Cell({entry: {description}}) {
                        return <span
                            className={description ? '' : 'menu-item-description-unavailable-gray-text'}>{description || 'No description'}</span>;
                    },
                },
                {
                    title: 'Price',
                    field: 'price',
                    Cell({entry: {price}}) {
                        return <span>{formatPrice(price)}</span>;
                    },
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
                        return (
                            <Link to={`./${id}`}>View</Link>
                        );
                    },
                },
            ]}
        />
    );
};