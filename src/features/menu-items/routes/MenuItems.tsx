import {ContentLayout} from '@/components/Layout';

import {MenuItemsList} from '../components/MenuItemsList.tsx';
import {useParams} from "react-router-dom";
// import {CreateMenuItem} from "@/features/menu-items/components/CreateMenuItem.tsx";
// import {useParams} from "react-router-dom";
// import {CreateMenuItem} from '../components/CreateMenuItem.tsx';
// import {useParams} from "react-router-dom";

export const MenuItems = () => {

    const {menuId = ''} = useParams<string>();

    return (
        <ContentLayout title="Menu Items">
            <div className="flex justify-end">
                {/*<CreateMenuItem/>*/}
            </div>
            <div className="mt-4">
                <MenuItemsList menuId={menuId}/>
            </div>
        </ContentLayout>
    );
};
