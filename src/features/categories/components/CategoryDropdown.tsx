import {useCategories} from '../api/getCategories';
import {Category} from '../types';
import {Spinner} from "@/components/Elements";
import {SelectField} from "@/components/Form";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type CategoryDropdownProps = {
    menuId: string | undefined;
    error: FieldError | undefined;
    registration: UseFormRegisterReturn;
};

export const CategoryDropdown = ({menuId, error, registration}: CategoryDropdownProps) => {
    const categoriesQuery = useCategories({menuId});

    if (categoriesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    if (!categoriesQuery?.data?.length)
        return (
            <div
                role="list"
                aria-label="categories"
                className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
            >
                <h4>No Comments Found</h4>
            </div>
        );

    return (
        <SelectField
            label="Category"
            error={error}
            registration={registration}
            options={[
                {value: '', label: 'Select Category'},
                ...categoriesQuery.data.map((category: Category) => ({
                    value: category.id,
                    label: category.name,
                })),
            ]}
        />
    );
}