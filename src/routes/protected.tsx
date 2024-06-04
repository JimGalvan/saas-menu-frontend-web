import {Suspense} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {Spinner} from '@/components/Elements';
import {MainLayout} from '@/components/Layout';
import {lazyImport} from '@/utils/lazyImport';
import Menus from "@/features/menus/components/Menus.tsx";

const {MenuItemsRoutes} = lazyImport(
    () => import('@/features/menu-items'),
    'MenuItemsRoutes'
);
const {Dashboard} = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const App = () => {
    return (
        <MainLayout>
            <Suspense
                fallback={
                    <div className="h-full w-full flex items-center justify-center">
                        <Spinner size="xl"/>
                    </div>
                }
            >
                <Outlet/>
            </Suspense>
        </MainLayout>
    );
};

export const protectedRoutes = [
    {
        path: '/app',
        element: <App/>,
        children: [
            // {path: 'menu-items/*', element: <MenuItemsRoutes/>},
            {path: 'menu/:menuId/menu-items/*', element: <MenuItemsRoutes/>,},
            {path: 'menus/', element: <Menus/>,},
            // {path: 'menu/*/menu-items', element: <MenuItemsRoutes/>},
            // { path: 'menu/*', element: <Dashboard />},
            // { path: 'users', element: <Users /> },
            // { path: 'profile', element: <Profile /> },
            {path: '', element: <Dashboard/>},
            {path: '*', element: <Navigate to="."/>},
        ],
    },
];
