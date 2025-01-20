import React from 'react';
import Leaguetable from '../components/Leaguetable';
import { Typography, Stack, Box } from '@mui/material';
import Playercard from '../components/Playercard';

const HomePage = ({ data }) => {

  const calculateScoreDevelopments = (games) => {
    const uniqueParticipants = [...new Set(games.flatMap(game => game.participants))];

    const scoreObjects = uniqueParticipants.map((player) => {
        return { player: player, scores: [0], games: 0, wins: 0, gamePointWeights: 0 };
    });

    games.forEach(game => {
        uniqueParticipants.forEach(player => {
            const scoreObject = scoreObjects.find(obj => obj.player === player);

            if (game.winner === player) {
                scoreObject.wins += 1;
                scoreObject.games += 1;
                scoreObject.gamePointWeights += game.participants.length;
            } else if (game.participants.includes(player)) {
                scoreObject.games += 1;
                scoreObject.gamePointWeights -= (5- game.participants.length);
            };
            if (scoreObject.games < 1) {
              scoreObject.scores.push(Math.max(0, scoreObject.wins / scoreObject.games * 50 + scoreObject.gamePointWeights));
            } else if (scoreObject.games < 2) {
              scoreObject.scores.push(Math.max(0, scoreObject.wins / scoreObject.games * 70 + scoreObject.gamePointWeights));
            } 
            else {
              scoreObject.scores.push(Math.max(0, scoreObject.wins / scoreObject.games * 200 + scoreObject.gamePointWeights));
            };
        });
    });

    return scoreObjects;
  };

  const scoreObjects = calculateScoreDevelopments(data);

  return (
    <Box sx={{ paddingBottom: '120px' }} align='center'>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
            POIKAINSCORE
          </Typography>
        </Stack>
        <Leaguetable games={data} scores={scoreObjects.map((scoreObject) => ({
          name: scoreObject.player,
          score: scoreObject.scores[scoreObject.scores.length - 1],
        }))}
        />
        <Playercard scoreDevelopments={scoreObjects} games={data} />
    </Box>
  );
};

export default HomePage;
