import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const PositionBox = (position) => {
    const pickColor = () => {
        let color;    
        if ([1,2,3].includes(position.position)) {
          color = "#30447c";
        } else {
          color = "#a82414";
        }
    
        return color;
      };

    const color = pickColor();
    return (
        <Paper
            sx={{
                background: color,
                color: 'white',
                padding: '10px',
                textAlign: 'center',
                width: '2px',
                height: '2px',
                marginRight: '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            elevation={1}>      
            <Typography variant="body1">{position.position}.</Typography>
        </Paper>
    );
};

export default PositionBox;
