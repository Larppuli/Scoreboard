import React from 'react';
import { Stack } from '@mui/material';
import Formbox from './Formbox';
import { v4 as uuidv4 } from 'uuid';

const Form = ({ games, player }) => {
  const lastFiveGames = games.slice(-5).reverse();

  return (
    <Stack direction="row" spacing={1} justifyContent="right">
      {lastFiveGames.map((game) => {
        return <Formbox game={game} player={player} key={uuidv4()} />;
      })}
    </Stack>
  );
};

export default Form;
