import { ContentLayout } from '@/components/Layout';

// import { CreateMenuItem } from '../components/CreateMenuItem';
import { MenuItemsList } from '../components/MenuItemsList.tsx';
import { CreateMenuItem } from '../components/CreateMenuItem.tsx';

export const MenuItems = () => {
  return (
    <ContentLayout title="Menu Items">
      <div className="flex justify-end">
        <CreateMenuItem />
      </div>
      <div className="mt-4">
        <MenuItemsList />
      </div>
    </ContentLayout>
  );
};
