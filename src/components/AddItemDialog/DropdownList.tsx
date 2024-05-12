import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Item {
    id: string;
    CategoryName: string;
}

interface DropdownListProps {
    items: Item[];
    value: string;
    handleChange: (event: SelectChangeEvent) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ items, value, handleChange }) => {
    return (
        <Select autoFocus margin="dense" value={value} onChange={handleChange} fullWidth displayEmpty>
            <MenuItem value="" disabled>
                Select a Category
            </MenuItem>
            {items.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                    {item.CategoryName}
                </MenuItem>
            ))}
        </Select>
    );
}

export default DropdownList;