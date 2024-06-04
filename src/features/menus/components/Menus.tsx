import {useMenus} from "@/features/menus/api/getMenus.ts";
import {Spinner} from "@/components/Elements";

const Menus = () => {

    const menusQuery = useMenus({});

    // Check if the menu data is still loading
    if (menusQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    // Check if menusQuery.data and menusQuery.data.results are defined and menusQuery.data.results is an array
    if (!menusQuery.data || !Array.isArray(menusQuery.data.results)) {
        console.log('Data is not available or not an array');
        return null; // or return some fallback UI
    }

    // Now you can use the real menu data
    return (
        <div className="flex h-screen bg-gray-100">
            {menusQuery.data.results.map((menu, index) => (
                <div key={index} className="flex-1 p-6">
                    <h2 className="text-xl font-semibold text-gray-800">{menu.title}</h2>
                    <div className="p-6 w-64 bg-white border-l">
                        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                        <ul>
                            {menu.categories && Array.isArray(menu.categories) ? menu.categories.map((category, index) => (
                                <li key={index} className="mt-4 text-gray-700">
                                    {category}
                                </li>
                            )) : null}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menus;