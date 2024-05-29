import {Category} from '../types';
import {SelectField} from "@/components/Form";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import {useCategories} from "@/features/categories/api/getCategories.ts";
import {Spinner} from "@/components/Elements";

type CategoryDropdownProps = {
    menuId: string;
    error: FieldError | undefined;
    registration: UseFormRegisterReturn;
};

export const CategoryDropdown = ({menuId, error, registration}: CategoryDropdownProps) => {
    const categoriesQuery = useCategories({menuId: menuId});

    if (categoriesQuery.isLoading) {
        return (
            <div className="w-full h-48 flex justify-center items-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    const options = [
        {value: '', label: 'Select Category'},
        ...(categoriesQuery.data && categoriesQuery.data.length > 0
            ? categoriesQuery.data.map((category: Category) => ({
                value: category.url,
                label: category.name,
            }))
            : [{value: '', label: 'No categories'}])
    ];

    return (
        <SelectField
            label="Category"
            error={error}
            registration={registration}
            options={options}
        />
    );
}