import {useCreateMenu} from "@/features/menus/api/createMenu.ts";
import * as z from 'zod';
import {Form, InputField, TextAreaField} from '@/components/Form';
import {CreateMenuDTO} from "@/features/menus/types";
import {CheckboxField} from "@/components/Form/CheckboxField.tsx";
import {ContentLayout} from "@/components/Layout";

const schema = z.object({
    title: z.string().min(1, 'Required'),
    description: z.string().optional(),
    isActive: z.boolean(),
    logo: z.any().optional(),
});

const CreateMenu = () => {
    const createMenuMutation = useCreateMenu();

    return (
        <ContentLayout title="Create Menu">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-lg mx-auto p-6 space-y-6">
                    <Form<CreateMenuDTO['data'], typeof schema>
                        id="create-menu"
                        onSubmit={async (values: any) => {
                            if (values.description === null || values.description === undefined || values.description === "") {
                                delete values.description;
                            }
                            await createMenuMutation.mutateAsync({data: values});
                        }}
                        // schema={schema}
                    >
                        {({register, formState}) => (
                            <>
                                <InputField
                                    label="Title"
                                    error={formState.errors['title']}
                                    registration={register('title')}
                                />

                                <TextAreaField
                                    label="Description"
                                    error={formState.errors['description']}
                                    registration={register('description')}
                                />

                                <CheckboxField
                                    label="Is Active"
                                    error={formState.errors['isActive']}
                                    registration={register('isActive')}
                                />

                                <InputField
                                    label="Logo"
                                    type="file"
                                    error={formState.errors['logo']}
                                    registration={register('logo')}
                                />

                                <button type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Create Menu
                                </button>
                            </>
                        )}
                    </Form>
                </div>
        </div>
        </ContentLayout>
    );
};

export default CreateMenu;