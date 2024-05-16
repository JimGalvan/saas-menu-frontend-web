import { ContentLayout } from '@/components/Layout';

// import { CreateDiscussion } from '../components/CreateDiscussion';
import { MenuItemsList } from '../components/MenuItemsList.tsx';

export const MenuItems = () => {
  return (
    <ContentLayout title="Menu Items">
      <div className="flex justify-end">
        {/*<CreateDiscussion />*/}
      </div>
      <div className="mt-4">
        <MenuItemsList />
      </div>
    </ContentLayout>
  );
};
