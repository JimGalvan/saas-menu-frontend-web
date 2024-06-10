import {Navigate, Route, Routes} from 'react-router-dom';
import Menus from '@/features/menus/routes/Menus';
import CreateMenu from "@/features/menus/components/CreateMenu.tsx";
import {MenuItems} from "@/features/menu-items/routes/MenuItems.tsx";

export const MenusRoutes = () => {
    return (
        <Routes>
            <Route path="create" element={<CreateMenu/>}/>
            <Route path="" element={<Menus/>}/>
            <Route path=":menuId/menu-items/*" element={<MenuItems/>}/>
            <Route path="*" element={<Navigate to="."/>}/>
        </Routes>
    );
};
