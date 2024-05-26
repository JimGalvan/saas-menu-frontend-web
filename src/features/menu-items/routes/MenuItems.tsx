import {ContentLayout} from '@/components/Layout';
import {useParams} from "react-router-dom";
import {CreateMenuItem} from "@/features/menu-items/components/CreateMenuItem.tsx";
import {useMenu} from "@/features/menus/api/getMenu.ts";
import {Spinner} from "@/components/Elements";
import AdminTable from "@/components/AdminTable.tsx";

export const MenuItems = () => {
    const {menuId = ''} = useParams<string>();
    const useMenuQuery = useMenu({menuId});

    if (useMenuQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!useMenuQuery.data) return null;

    return (
        <ContentLayout title="Menu Items">
            <div className="flex justify-end">
                <CreateMenuItem menu={useMenuQuery.data}/>
            </div>
            <div className="mt-4">
                <AdminTable menuId={menuId}/>
            </div>
        </ContentLayout>
    );
};
