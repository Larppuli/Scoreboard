import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Formbox from './Formbox';

const Form = ({ games, player }) => {
  const [lastFourGames, setLastFourGames] = useState([{},{},{},{}])
  useEffect(() => {
    if (games.length > 0) {
      const slicedGames = games.slice(-4).reverse();
      const emptySlots = 4 - slicedGames.length;
      const updatedGames = [...slicedGames, ...Array(Math.max(emptySlots, 0)).fill({})];
      setLastFourGames(updatedGames);
    }
  }, [games]);

  return (
    <Stack direction="row" spacing={1} justifyContent="right">
      {lastFourGames.map((game, index) => {
        return <Formbox game={game} player={player} key={player + index} />;
      })}
    </Stack>
  );
};

export default Form;
