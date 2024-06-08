import {useMenus} from "@/features/menus/api/getMenus.ts";
import {Spinner} from "@/components/Elements";
import MenuCard from "@/features/menus/components/MenuCard.tsx";

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
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-2/3 p-6 overflow-auto">
                <h1 className="text-3xl font-bold mb-4">My Menus</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {menusQuery.data.results.map((menu, index) => (
                        <MenuCard key={index} menu={menu}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenusGrid;