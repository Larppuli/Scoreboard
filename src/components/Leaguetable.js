import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Form from './Form';

const Leaguetable = ({ games }) => {
  const players = ['Janne', 'Oskari', 'Lauri', 'Eero'];

  const calculateStats = (player) => {
    const playerGames = games.filter((game) => game.participants.includes(player));
    const gamesWon = playerGames.filter((game) => game.winner === player).length;
    const gamesPlayed = playerGames.length;
    const gamesLost = gamesPlayed - gamesWon;
    const winPercentage = gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0;

    return { gamesPlayed, gamesWon, gamesLost, winPercentage };
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ background: '#101c24', color: 'white' }}
        size="small" // Makes the table more compact
        aria-label="league table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white', padding: '4px' }}>Player</TableCell>
            <TableCell sx={{ color: 'white', padding: '4px' }} align="center">MP</TableCell>
            <TableCell sx={{ color: 'white', padding: '4px' }} align="center">W</TableCell>
            <TableCell sx={{ color: 'white', padding: '4px' }} align="center">L</TableCell>
            <TableCell sx={{ color: 'white', padding: '4px', }} align="center">W%</TableCell>
            <TableCell sx={{ color: 'white', padding: '4px'}} align="center">FORM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => {
            const { gamesPlayed, gamesWon, gamesLost, winPercentage } = calculateStats(player);
            return (
              <TableRow
                key={player}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  height: '36px', // Set the row height
                }}
              >
                <TableCell sx={{ color: 'white', padding: '4px' }} component="th" scope="row">
                  {player}
                </TableCell>
                <TableCell sx={{ color: 'white', padding: '4px' }} align="center">{gamesPlayed}</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px' }} align="center">{gamesWon}</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px' }} align="center">{gamesLost}</TableCell>
                <TableCell sx={{ color: 'white', padding: '4px' }} align="center">{winPercentage}%</TableCell>
                <TableCell sx={{ padding: '4px' }} ><Form /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaguetable;
