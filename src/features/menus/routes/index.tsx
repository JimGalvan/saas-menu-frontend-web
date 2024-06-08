import {Navigate, Route, Routes} from 'react-router-dom';
import Menus from '@/features/menus/routes/Menus';

export const MenuItemsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Menus/>}/>
            <Route path="*" element={<Navigate to="."/>}/>
        </Routes>
    );
};
