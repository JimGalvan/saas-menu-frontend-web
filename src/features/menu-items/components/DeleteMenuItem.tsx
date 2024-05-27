import {IconTrash} from '@tabler/icons-react';

import {Button, ConfirmationDialog} from '@/components/Elements';

import {useDeleteMenuItem} from '../api/deleteMenuItem.ts';

type DeleteMenuItemProps = {
    id: string;
};

export const DeleteMenuItem = ({id}: DeleteMenuItemProps) => {
    const deleteMenuItemMutation = useDeleteMenuItem({menuItemId: id});

    return (
        <ConfirmationDialog
            isDone={deleteMenuItemMutation.isSuccess}
            icon="danger"
            title="Delete Menu Item"
            body="Are you sure you want to delete this Menu Item?"
            triggerButton={
                <IconTrash>
                    Delete Menu Item
                </IconTrash>
            }
            confirmButton={
                <Button
                    isLoading={deleteMenuItemMutation.isPending}
                    type="button"
                    className="bg-red-600"
                    onClick={async () => await deleteMenuItemMutation.mutateAsync({menuItemId: id})}
                >
                    Delete Menu Item
                </Button>
            }
        />
    );
};
