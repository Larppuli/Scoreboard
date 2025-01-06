import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Formbox from './Formbox';

const Form = ({ games, player }) => {
  const [lastFiveGames, setLastFiveGames] = useState([{},{},{},{},{}])
  useEffect(() => {
    if (games.length > 0) {
      const slicedGames = games.slice(-5).reverse();
      const emptySlots = 5 - slicedGames.length;
      const updatedGames = [...slicedGames, ...Array(Math.max(emptySlots, 0)).fill({})];
      setLastFiveGames(updatedGames);
    }
  }, [games]);

  return (
    <Stack direction="row" spacing={1} justifyContent="right">
      {lastFiveGames.map((game, index) => {
        return <Formbox game={game} player={player} key={player + index} />;
      })}
    </Stack>
  );
};

export default Form;
