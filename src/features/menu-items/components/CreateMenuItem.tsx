import {PlusIcon} from '@heroicons/react/20/solid';
import * as z from 'zod';

import {Button} from '@/components/Elements';
import {Form, FormDrawer, InputField, SelectField, TextAreaField} from '@/components/Form';
// import { Authorization, ROLES } from '@/lib/authorization';

import {CreateMenuItemDTO, useCreateMenuItem} from '../api/createMenuItem.ts';

const schema = z.object({
    name: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
    price: z.number().min(1, 'Required'),
    category_id: z.number().min(1, 'Required'),
});

export const CreateMenuItem = () => {
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
                    type="submit"
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
                    await createMenuItemMutation.mutateAsync({data: values});
                }}
                schema={schema}
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
                        <SelectField
                            label="Category"
                            error={formState.errors['category']}
                            registration={register('category')}
                            options={[
                                { value: '1', label: 'Option 1' },
                                { value: '2', label: 'Option 2' },
                                // Add more options as needed
                            ]}
                        />
                    </>
                )}
            </Form>
        </FormDrawer>
        // </Authorization>
    );
};
