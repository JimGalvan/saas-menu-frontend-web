import {Navigate, Route, Routes} from 'react-router-dom';

import {MenuItems} from './MenuItems.tsx';
import {UpdateMenuItem} from './UpdateMenuItem.tsx';

export const MenuItemsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<MenuItems/>}/>
            <Route path="/:menuItemId" element={<UpdateMenuItem/>}/>
            <Route path="*" element={<Navigate to="."/>}/>
        </Routes>
    );
};
