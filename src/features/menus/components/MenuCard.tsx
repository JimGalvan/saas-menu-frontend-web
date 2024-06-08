import { Link } from 'react-router-dom';
import { IconEdit } from "@tabler/icons-react";
import { Menu } from "@/features/menus/types";

const MenuCard = ({menu}: { menu: Menu }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg cursor-pointer">
            <img className="w-full h-48 object-cover" src="/src/assets/logo-placeholder.png" alt="Logo Placeholder"/>
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{menu.title}</div>
                <div className="flex justify-between items-center mt-4">
                    <Link
                        to={`./${menu.id}/menu-items/`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3.5 rounded text-sm">
                        Menu Items
                    </Link>
                    <IconEdit size={32}/>
                </div>
            </div>
        </div>
    );
}

export default MenuCard;