import clsx from 'clsx';
import * as React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

import {FieldWrapper, FieldWrapperPassThroughProps} from './FieldWrapper';

type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
    const {label, options, error, className, defaultValue, registration, placeholder} = props;
    return (
        <FieldWrapper label={label} error={error}>
            <select
                name="location"
                className={clsx(
                    'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                    className
                )}
                defaultValue={defaultValue}
                {...registration}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map(({label, value}) => (
                    <option key={label?.toString()} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    );
};
