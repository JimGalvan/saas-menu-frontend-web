import {useParams} from 'react-router-dom';

import {Spinner} from '@/components/Elements';
import {Head} from '@/components/Head';
import {ContentLayout} from '@/components/Layout';
import {formatDate, formatPrice} from '@/utils/format.ts';

import {useMenuItem} from '../api/getMenuItem.ts';
import defaultImage from '@/assets/menu-item-placeholder.webp';

export const MenuItem = () => {
    const {menuItemId} = useParams();

    if (!menuItemId) {
        // Return fallback UI or handle error
        return <div>No menu item ID provided</div>;
    }

    const menuItemQuery = useMenuItem({menuItemId: menuItemId});

    if (menuItemQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!menuItemQuery.data) return null;

    return (
        <>
            <Head title={menuItemQuery.data.name}/>
            <ContentLayout title={menuItemQuery.data.name}>
                <div className="mt-6 flex flex-col space-y-16">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <img src={menuItemQuery.data.image || defaultImage} alt={menuItemQuery.data.name}
                                     className="w-full h-64 object-cover md:h-full"/>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 p-4">
                                {menuItemQuery.data.description
                                    ? <p
                                        className="mt-2 prose prose-indigo">Description: {menuItemQuery.data.description.trim()}</p>
                                    : <p className="mt-2 prose prose-indigo">No description</p>
                                }
                                <p className="mt-2 text-sm text-gray-500">Category: {menuItemQuery.data.categoryName}</p>
                                <p className="mt-2 text-sm text-gray-500">Menu: {menuItemQuery.data.menuName}</p>
                                <p className="mt-2 text-sm text-gray-500">Price: {formatPrice(menuItemQuery.data.price)}</p>
                                <p
                                    className="mt-2 text-xs font-bold">Created
                                    At: {formatDate(menuItemQuery.data.createdAt)}</p>
                                <p
                                    className="mt-2 text-xs font-bold">Modified
                                    At: {formatDate(menuItemQuery.data.modifiedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentLayout>
        </>
    );
};