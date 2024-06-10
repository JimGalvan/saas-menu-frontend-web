import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password' | 'file';
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
    const { type = 'text', label, className, registration, error } = props;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0]); // You can handle the file here
        }
    };

    return (
        <FieldWrapper label={label} error={error}>
            <input
                type={type}
                className={clsx(
                    'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                    className
                )}
                onChange={type === 'file' ? handleFileChange : undefined}
                {...registration}
            />
        </FieldWrapper>
    );
};