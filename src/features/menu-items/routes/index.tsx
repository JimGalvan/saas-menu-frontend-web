import {Navigate, Route, Routes} from 'react-router-dom';

import {MenuItems} from './MenuItems.tsx';
import {MenuItem} from './MenuItem.tsx';

export const MenuItemsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<MenuItems/>}/>
            <Route path="/:menuItemId" element={<MenuItem/>}/>
            <Route path="*" element={<Navigate to="."/>}/>
        </Routes>
    );
};
