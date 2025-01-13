import React, { useState } from 'react';
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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Leaguetable = ({ games }) => {
  const players = ['Oskari', 'Janne', 'Eero', 'Lauri'];

  const [sortColumn, setSortColumn] = useState('winPercentage');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedColumn, setSelectedColumn] = useState('winPercentage');

  const calculateStats = (player) => {
    const playerGames = games.filter((game) => game.participants.includes(player));
    const gamesWon = playerGames.filter((game) => game.winner === player).length;
    const gamesPlayed = playerGames.length;
    const gamesLost = gamesPlayed - gamesWon;
    const winPercentage = gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0;

    return { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage };
  };

  const handleHeaderClick = (column) => {
    setSelectedColumn(column);
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const statA = calculateStats(a)[sortColumn];
    const statB = calculateStats(b)[sortColumn];
    return sortDirection === 'asc' ? statA - statB : statB - statA;
  });

  return (
    <TableContainer component={Paper} elevation={2} sx={{ maxWidth: '1020px' }}>
      <Table sx={{ background: '#080c0c', border: '3px solid #080c0c' }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: 'white',
                padding: '4px',
                paddingLeft: '24px',
                background: 'inherit',
              }}
            >
              PLAYER
            </TableCell>
            {['gamesPlayed', 'gamesWon', 'gamesLost', 'winPercentage'].map((col, index) => (
            <TableCell
              key={col}
              sx={{
                color: 'white',
                padding: '4px',
                fontWeight: selectedColumn === col ? 'bold' : 400,
                cursor: 'pointer',
                background: selectedColumn === col ? '#202424' : 'inherit',
              }}
              align="center"
              onClick={() => handleHeaderClick(col)}
            >
              {['MP', 'W', 'L', 'W%'][index]}
              {selectedColumn === col && (
                sortDirection === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 10, marginBottom: 0.06 }} /> : <ArrowDownwardIcon sx={{ fontSize: 10, marginBottom: -0.06 }} />
              )}
            </TableCell>
          ))}

            <TableCell
              sx={{ color: 'white', padding: '4px', paddingRight: '38px' }}
              align="right"
            >
              FORM
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers.map((player, index) => {
            const { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage } = calculateStats(player);
            return (
              <TableRow key={player} sx={{ height: '36px' }}>
                <TableCell
                  sx={{
                    color: 'white',
                    padding: '4px',
                    background: selectedColumn === 'player' ? '#202424' : 'inherit',
                  }}
                >
                  <Stack direction="row">
                    <PositionBox position={index + 1} />
                    {player}
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    padding: '4px',
                    width: '12%',
                    background: selectedColumn === 'gamesPlayed' ? '#202424' : 'inherit',
                  }}
                  align="center"
                >
                  <NumAnimation targetNumber={gamesPlayed} fixedNum={0} />
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    padding: '4px',
                    width: '9%',
                    background: selectedColumn === 'gamesWon' ? '#202424' : 'inherit',
                  }}
                  align="center"
                >
                  <NumAnimation targetNumber={gamesWon} fixedNum={0} />
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    padding: '4px',
                    width: '9%',
                    background: selectedColumn === 'gamesLost' ? '#202424' : 'inherit',
                  }}
                  align="center"
                >
                  <NumAnimation targetNumber={gamesLost} fixedNum={0} />
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    padding: '4px',
                    width: '15%',
                    background: selectedColumn === 'winPercentage' ? '#202424' : 'inherit',
                  }}
                  align="center"
                >
                  <NumAnimation targetNumber={winPercentage} fixedNum={1} />%
                </TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <Form games={playerGames} player={player} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaguetable;
