import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText } from '@mui/material';
import WarningFilter from '../utils/WarningFilter';

const MenuSelection = forwardRef(({ multi, selections, label, onSelectionChange }, ref) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedItems(
            typeof value === 'string' ? value.split(',') : value
        );
        onSelectionChange(value);
    };

    useImperativeHandle(ref, () => ({
        handleClearSelection: () => {
            setSelectedItems([]);
        }
    }));

    return (
        <WarningFilter>
            <FormControl sx={{ marginTop: '20px' }}>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ color: 'white' }}>
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple={multi}
                    value={selectedItems}
                    onChange={handleSelectionChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputBase-root': {
                            color: 'white',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& input::placeholder': {
                            color: 'white',
                        },
                        background: '#080c0c',
                        borderRadius: '3px',
                        color: 'white',
                    }}
                >
                    {selections.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            <Checkbox checked={selectedItems.includes(item)} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </WarningFilter>
    );
});

export default MenuSelection;
