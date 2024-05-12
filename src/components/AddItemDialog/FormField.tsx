import { Box, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

interface FormFieldProps {
    label: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, handleChange, children }) => (
    <Box mb={1}>
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            fullWidth
        >
            {children}
        </TextField>
    </Box>
);

export default FormField;