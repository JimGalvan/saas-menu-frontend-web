import { Navigate, Route, Routes } from 'react-router-dom';

// import { Discussion } from './Discussion';
import { MenuItems } from './MenuItems.tsx';

export const MenuItemsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MenuItems />} />
      {/*<Route path=":discussionId" element={<Discussion />} />*/}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
