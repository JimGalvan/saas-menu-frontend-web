import {useMenus} from "@/features/menus/api/getMenus.ts";
import {Spinner} from "@/components/Elements";
import QueryError from "@/components/Elements/Errors/QueryError.tsx";
import {ContentLayout} from "@/components/Layout";
import MenusGrid from "@/features/menus/components/MenusGrid.tsx";

const Menus = () => {
    const menusQuery = useMenus({});

    if (menusQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!menusQuery.data) return <QueryError message="Failed to load menus."/>;

    return (
        <ContentLayout title="Menus">
                <MenusGrid/>
        </ContentLayout>
    );
};

export default Menus;