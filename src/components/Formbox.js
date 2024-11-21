import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Formbox = ({ game, player }) => {
  const pickColor = () => {
    let color;
    let indicatorLetter;
  
    if (Object.keys(game).length === 0) {
      color = "#c8c4c4";
      indicatorLetter = '?';
    } else if (game.winner === player) {
      color = "#60a44c";
      indicatorLetter = 'W';
    } else {
      color = "#c02c1c";
      indicatorLetter = 'L';
    }
  
    return { color, indicatorLetter };
  };

  const { color, indicatorLetter } = pickColor();

  return (
    <Paper
      sx={{
        background: color,
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        width: '2px',
        height: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      elevation={1}
    >      
    <Typography variant="body1">{indicatorLetter}</Typography>
    </Paper>
  );
};

export default Formbox;
