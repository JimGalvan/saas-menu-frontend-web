import {Button, Spinner} from '@/components/Elements';

import {useMenuItem} from '../api/getMenuItem.ts';

import {Menu} from "@/features/menus/types";
import {useUpdateMenuItem} from "@/features/menu-items/api/updateMenuItem.ts";
import {Form, FormDrawer, InputField, TextAreaField} from "@/components/Form";
import {CreateMenuItemDTO} from "@/features/menu-items/api/createMenuItem.ts";
import {CategoryDropdown} from "@/features/categories/components/CategoryDropdown.tsx";
import * as z from "zod";
import {IconEdit} from "@tabler/icons-react";
import {formatDate} from "@/utils/format.ts";

type UpdateMenuItemProps = {
    menuItemId: string;
    menu: Menu;
}

const schema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
    price: z.string().min(1, 'Required'),
    category: z.string().min(1, 'Required'),
});


export const UpdateMenuItem = ({menu, menuItemId}: UpdateMenuItemProps) => {

    const menuItemQuery = useMenuItem({menuItemId});
    const updateMenuItemMutation = useUpdateMenuItem();

    if (menuItemQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (menuItemQuery.isError) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <span className="text-red-500">Failed to load menu item</span>
            </div>
        );
    }

    if (!menuItemQuery.data) return null;

    // name state

    return (
        // <Authorization allowedRoles={[ROLES.ADMIN]}>
        <FormDrawer
            isDone={updateMenuItemMutation.isSuccess}
            triggerButton={
                <IconEdit/>
            }
            title="Create Menu Item"
            submitButton={
                <Button
                    form="create-menu-item"
                    type={'submit' as any}
                    size="sm"
                    isLoading={updateMenuItemMutation.isPending}
                >
                    Submit
                </Button>
            }
        >
            <Form<CreateMenuItemDTO['data'], typeof schema>
                id="create-menu-item"
                onSubmit={async (values: any) => {
                    if (values.description === null || values.description === undefined || values.description === "") {
                        delete values.description;
                    }
                    await updateMenuItemMutation.mutateAsync({menuItemId: menuItemId, data: values});
                    await menuItemQuery.refetch();
                }}
                options={{
                    defaultValues: {
                        name: menuItemQuery.data.name,
                        description: menuItemQuery.data.description || '',
                        price: menuItemQuery.data.price,
                        category: menuItemQuery.data.category,
                    },
                }}
                // schema={schema}
            >
                {({register, formState}) => (
                    <>
                        <InputField
                            label="Name"
                            error={formState.errors['name']}
                            registration={register('name')}
                        />

                        <TextAreaField
                            label="Description"
                            error={formState.errors['description']}
                            registration={register('description')}
                        />

                        <InputField
                            label="Price"
                            error={formState.errors['price']}
                            registration={register('price')}
                        />
                        <CategoryDropdown
                            menuId={menu.id}
                            error={formState.errors['category']}
                            registration={register('category')}/>
                        <input type="hidden" {...register('menu')} value={menu.url}/>
                        <p
                            className="mt-2 text-xs font-bold">Created
                            At: {formatDate(menuItemQuery.data.createdAt)}</p>
                        <p
                            className="mt-2 text-xs font-bold">Modified
                            At: {formatDate(menuItemQuery.data.modifiedAt)}</p>
                    </>
                )}
            </Form>
        </FormDrawer>
        // </Authorization>
    );
};