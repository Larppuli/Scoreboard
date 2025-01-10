import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from '@mui/material';
import WarningFilter from '../utils/WarningFilter';

const MenuSelection = forwardRef(
    ({ multi, selections, label, onSelectionChange, customSx, color, defaultValue = [], placeholder, autoSelect = [] }, ref) => {
        const [selectedItems, setSelectedItems] = useState(defaultValue);

        const handleSelectionChange = (event) => {
            const {
                target: { value },
            } = event;
            setSelectedItems(
                typeof value === 'string' ? value.split(',') : value
            );
            onSelectionChange(value);
        };

        useEffect(() => {
            if (autoSelect.length > 0) {
                setSelectedItems(autoSelect);
            }
        }, [autoSelect]);

        useImperativeHandle(ref, () => ({
            handleClearSelection: () => {
                setSelectedItems([]);
            },
            setSelections: (newSelections) => {
                setSelectedItems(newSelections);
            },
        }));

        return (
            <WarningFilter>
                <FormControl sx={{ marginTop: '20px' }}>
                    <InputLabel id="demo-multiple-checkbox-label" sx={{ color: color }}>
                        {label}
                    </InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple={multi}
                        value={selectedItems}
                        onChange={handleSelectionChange}
                        input={<OutlinedInput label={label} />}
                        renderValue={(selected) =>
                            selected.length > 0 ? selected.join(', ') : <span style={{ color: '#9e9e9e' }}>{placeholder}</span>
                        }
                        sx={customSx}
                    >
                        {selections?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                <Checkbox checked={selectedItems.includes(item)} />
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </WarningFilter>
        );
    }
);

export default MenuSelection;