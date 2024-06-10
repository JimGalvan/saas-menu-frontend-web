import {useMenus} from "@/features/menus/api/getMenus.ts";
import {Button, Spinner} from "@/components/Elements";
import MenuCard from "@/features/menus/components/MenuCard.tsx";
import {PlusIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";

const MenusGrid = () => {
    const menusQuery = useMenus({});

    if (menusQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!menusQuery.data || !Array.isArray(menusQuery.data.results)) {
        console.log('Data is not available or not an array');
        return null;
    }

    return (
        <div className="w-full p-6 overflow-auto">
            <div className="flex justify-end">
                <Link to="./create">
                    <Button size="sm" startIcon={<PlusIcon className="h-4 w-4"/>}>
                        Create Menu
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
                {menusQuery.data.results.map((menu, index) => (
                    <MenuCard key={index} menu={menu}/>
                ))}
            </div>
        </div>
    );
};

export default MenusGrid;