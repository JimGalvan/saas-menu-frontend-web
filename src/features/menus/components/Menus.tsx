import { useState } from 'react';
import { useMenus } from "@/features/menus/api/getMenus.ts";
import { Spinner } from "@/components/Elements";
import {Menu} from "@/features/menus/types";

const Menus = () => {
    const menusQuery = useMenus({});
    const [selectedMenu, setSelectedMenu] = useState<Menu>({} as Menu);

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {menusQuery.data.results.map((menu, index) => (
                        <div key={index} className="rounded overflow-hidden shadow-lg cursor-pointer" onClick={() => setSelectedMenu(menu)}>
                            <img className="w-full h-48 object-cover" src="/src/assets/logo-placeholder.png" alt="Logo Placeholder"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{menu.title}</div>
                                <p className="text-gray-700 text-base">{menu.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedMenu && (
                <div className="w-full md:w-1/3 p-6 bg-white border-l overflow-auto">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedMenu.title} Categories</h2>
                    <ul>
                        {selectedMenu.categories && Array.isArray(selectedMenu.categories) ? selectedMenu.categories.map((category, index) => (
                            <li key={index} className="mt-4 text-gray-700">
                                {category}
                            </li>
                        )) : null}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menus;