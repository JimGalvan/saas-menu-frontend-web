import {useMenus} from "@/features/menus/api/getMenus.ts";
import {Spinner} from "@/components/Elements";
import {IconSettings} from '@tabler/icons-react';


const Menus = () => {
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
                        <div key={index} className="rounded overflow-hidden shadow-lg cursor-pointer">
                            <img className="w-full h-48 object-cover" src="/src/assets/logo-placeholder.png" alt="Logo Placeholder"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-2xl mb-2">{menu.title}</div> {/* Removed the yellow background */}
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3.5 rounded text-sm"> {/* Increased the padding */}
                                        Menu Items
                                    </button>
                                    <IconSettings size={32}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menus;