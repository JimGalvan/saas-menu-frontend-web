import {PlusIcon} from '@heroicons/react/20/solid';
import * as z from 'zod';

import {Button} from '@/components/Elements';
import {Form, FormDrawer, InputField, TextAreaField} from '@/components/Form';
import {CreateMenuItemDTO, useCreateMenuItem} from '../api/createMenuItem.ts';
import {CategoryDropdown} from "@/features/categories/components/CategoryDropdown.tsx";
import {Menu} from "@/features/menus/types";

const schema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
    price: z.string().min(1, 'Required'),
    category: z.string().min(1, 'Required'),
});

type CreateMenuItemProps = {
    menu: Menu
};

export const CreateMenuItem = ({menu}: CreateMenuItemProps) => {
    const createMenuItemMutation = useCreateMenuItem();

    return (
        // <Authorization allowedRoles={[ROLES.ADMIN]}>
        <FormDrawer
            isDone={createMenuItemMutation.isSuccess}
            triggerButton={
                <Button size="sm" startIcon={<PlusIcon className="h-4 w-4"/>}>
                    Create Menu Item
                </Button>
            }
            title="Create Menu Item"
            submitButton={
                <Button
                    form="create-menu-item"
                    type={'submit' as any}
                    size="sm"
                    isLoading={createMenuItemMutation.isLoading}
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
                    await createMenuItemMutation.mutateAsync({data: values});
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
                    </>
                )}
            </Form>
        </FormDrawer>
        // </Authorization>
    );
};
