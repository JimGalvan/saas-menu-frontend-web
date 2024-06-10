import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type CheckboxFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
    const { label, className, registration, error } = props;
    return (
        <FieldWrapper label={label} error={error}>
            <input
                type="checkbox"
                className={clsx(
                    'appearance-none h-4 w-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                    className
                )}
                {...registration}
            />
        </FieldWrapper>
    );
};