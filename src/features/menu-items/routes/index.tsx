import {Navigate, Route, Routes} from 'react-router-dom';

import {MenuItems} from './MenuItems.tsx';

export const MenuItemsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<MenuItems/>}/>
            <Route path="*" element={<Navigate to="."/>}/>
        </Routes>
    );
};
