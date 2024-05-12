import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import FormField from '../../components/AddItemDialog/FormField';
import DropdownList from '../../components/AddItemDialog/DropdownList';
import {SelectChangeEvent} from '@mui/material';
import {ChangeEvent} from 'react';
import MenuItem from "../../models/MenuItem.ts";

interface AddItemDialogProps {
    open: boolean;
    onClose: () => void;
}

interface TextField {
    id: string;
    label: string;
    type: string;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({open, onClose}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [newItem, setNewItem] = useState<MenuItem>({
        categoryName: "",
        id: 0,
        itemCategoryId: 0,
        itemGroupId: 0,
        itemName: "",
        price: "",
        restaurantId: 0,
    });
    const categories = [{id: '1', CategoryName: 'Category 1'}, {id: '2', CategoryName: 'Category 2'}];

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
        setNewItem({...newItem, itemCategoryId: parseInt(event.target.value)});
    };

    const handleNewItemChange = (fieldId: string, event: ChangeEvent<HTMLInputElement>) => {
        setNewItem({...newItem, [fieldId]: event.target.value});
    };

    const textFields: TextField[] = [
        {id: 'itemName', label: 'Item Name', type: 'text'},
        {id: 'Price', label: 'Price', type: 'text'},
        {id: 'RestaurantID', label: 'Restaurant ID', type: 'text'}
    ];

    function onAdd() {
        resetForm();
        onClose();
    }

    function resetForm() {
        setNewItem({
            categoryName: "",
            id: 0,
            itemCategoryId: 0,
            itemGroupId: 0,
            itemName: "",
            price: "",
            restaurantId: 0
        });
        setSelectedCategory('');
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {minWidth: {sm: 700}}
            }}
        >
            <DialogTitle>Add New Item</DialogTitle>
            <DialogContent>
                {textFields.map((field) => (
                    <FormField
                        key={field.id}
                        label={field.label}
                        value={"test"}
                        handleChange={(event) => handleNewItemChange(field.id, event)}
                    />
                ))}
                <DropdownList
                    // id="ItemCategoryID"
                    value={selectedCategory}
                    handleChange={handleCategoryChange}
                    items={categories}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onAdd} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddItemDialog;