import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const MenuSelection = ({ multi, selections, label, onSelectionChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (event) => {
        setSelectedItems(event.target.value)
        onSelectionChange(event.target.value);
    };

    return (
        <FormControl sx={{marginTop: '20px',}}>
            <InputLabel sx={{color: 'white' }}>{label}</InputLabel>
            <Select
                multiple={multi}
                value={selectedItems}
                onChange={handleSelectionChange}
                displayEmpty
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
                        '&:hover fieldset': {
                            borderColor: 'lightblue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'lightblue',
                        },
                    },
                    '& input::placeholder': {
                        color: 'white',
                    },
                    background: '#080c0c',
                    borderRadius: '3px',
                    color: 'white'
                }}
            >
                {selections.map((item, index) => 
                    <MenuItem 
                        value={item}
                        key={index}
                    >
                        {item}
                    </MenuItem>
                )}

            </Select>
        </FormControl>
    );
};

export default MenuSelection;