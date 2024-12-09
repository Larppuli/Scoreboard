import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Form from './Form';
import { Stack } from '@mui/material';
import PositionBox from './Positionbox';
import NumAnimation from './NumAnimation';

const Leaguetable = ({ games }) => {
  const players = ['Oskari', 'Janne', 'Eero', 'Lauri'];

  const calculateStats = (player) => {
    const playerGames = games.filter((game) => game.participants.includes(player));
    const gamesWon = playerGames.filter((game) => game.winner === player).length;
    const gamesPlayed = playerGames.length;
    const gamesLost = gamesPlayed - gamesWon;
    const winPercentage = gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0;

    return { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage };
  };

  const sortedPlayers = players.sort((a, b) => {
    const { winPercentage: winPercentageA } = calculateStats(a);
    const { winPercentage: winPercentageB } = calculateStats(b);
    return winPercentageB - winPercentageA;
  });

  return (
    <TableContainer component={Paper} elevation={2}
      sx={{ maxWidth: '1020px' }}
    >
      <Table
        sx={{ background: '#080c0c', border: '3px solid #080c0c' }}
      >
        <TableHead>
            <TableRow>
                <TableCell sx={{ color: 'white', padding: '4px', fontWeight: 'bold', paddingLeft: '24px' }}>PLAYER</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', fontWeight: 'bold' }} align="center">MP</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', fontWeight: 'bold' }} align="center">W</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', fontWeight: 'bold' }} align="center">L</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', fontWeight: 'bold' }} align="center">W%</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', paddingRight: '55px', fontWeight: 'bold' }} align="right">FORM</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers.map((player, index) => {
            const { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage } = calculateStats(player);
            return (
              <TableRow
                key={player}
                sx={{
                  height: '36px',
                }}
              >
                    <TableCell sx={{ color: 'white', padding: '4px' }}  scope="row">
                    <Stack direction="row" >
                        <PositionBox position={index+1}/>
                        {player}
                    </Stack>
                    </TableCell>
                    <TableCell sx={{ color: 'white', padding: '4px', width: '10%' }} align="center">
                      <NumAnimation targetNumber={gamesPlayed} fixedNum={0}/>
                    </TableCell>
                    <TableCell sx={{ color: 'white', padding: '4px', width: '7%' }} align="center">
                      <NumAnimation targetNumber={gamesWon} fixedNum={0}/>
                    </TableCell>
                    <TableCell sx={{ color: 'white', padding: '4px', width: '7%' }} align="center">
                      <NumAnimation targetNumber={gamesLost} fixedNum={0}/>
                    </TableCell>
                    <TableCell sx={{ color: 'white', padding: '4px', width: '15%' }} align="center">
                      <NumAnimation targetNumber={winPercentage} fixedNum={1}/>%
                    </TableCell>
                    <TableCell sx={{ padding: '4px' }} ><Form games={playerGames} player={player}/></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaguetable;
