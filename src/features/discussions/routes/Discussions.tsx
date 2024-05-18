import { ContentLayout } from '@/components/Layout';

import { CreateMenuItem } from '../components/CreateMenuItem.tsx';
import { DiscussionsList } from '../components/DiscussionsList';

export const Discussions = () => {
  return (
    <ContentLayout title="Discussions">
      <div className="flex justify-end">
        <CreateMenuItem />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  );
};
