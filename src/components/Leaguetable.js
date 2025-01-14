import React, { useState, useEffect } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Leaguetable = ({ games }) => {
  const players = ['Oskari', 'Janne', 'Eero', 'Lauri'];

  const [sortColumn, setSortColumn] = useState('winPercentage');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedColumn, setSelectedColumn] = useState('winPercentage');
  const [sport, setSport] = useState('All sports');
  const [sortedGames, setSortedGames] = useState(games);

  const handleChange = (event) => {
    setSport(event.target.value);
  };

  useEffect(() => {
    if (sport !== 'All sports') {
      setSortedGames(games.filter((game) => game.sport === sport));
    } else {
      setSortedGames(games);
    }
  }, [sport, games]);

  const calculateStats = (player) => {
    const playerGames = sortedGames.filter((game) => game.participants.includes(player));
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
      <Table sx={{ background: '#080c0c', border: '3px solid #080c0c', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: '1px', paddingBottom: '4px', paddingTop: '1px' }}>
              <FormControl
                sx={{
                  width: 90,
                  backgroundColor: '#383535',
                  borderRadius: 1.1,
                  '& .MuiInputBase-input': {
                    color: 'white',
                    fontSize: 9,
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    marginLeft: -1.2,
                    marginBlock: -1,
                    textAlign: 'center',
                  },
                  '& .MuiOutlinedInput-root': {
                    border: '1px solid inherit',
                    '&:hover': {
                      borderColor: '#888',
                    },
                  },
                }}
                size="small"
              >
                <Select value={sport} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem sx={{ fontSize: 15 }} value={'All sports'}>All sports</MenuItem>
                  <MenuItem sx={{ fontSize: 15 }} value={'Snooker'}>Snooker</MenuItem>
                  <MenuItem sx={{ fontSize: 15 }} value={'Petanque'}>Petanque</MenuItem>
                  <MenuItem sx={{ fontSize: 15 }} value={'Darts'}>Darts</MenuItem>
                  <MenuItem sx={{ fontSize: 15 }} value={'Card games'}>Card games</MenuItem>
                  <MenuItem sx={{ fontSize: 15 }} value={'Football'}>Football</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            {['gamesPlayed', 'gamesWon', 'gamesLost', 'winPercentage'].map((col, index) => (
              <TableCell
                key={col}
                sx={{
                  color: 'white',
                  padding: '4px',
                  marginLeft: 0,
                  width: col === 'winPercentage' ? '18%' : '7%',
                  paddingInline: col === 'winPercentage' ? '20px' : '0px',
                  fontWeight: selectedColumn === col ? 'bold' : 400,
                  cursor: 'pointer',
                  background: selectedColumn === col ? '#202424' : 'inherit',
                }}
                align="center"
                onClick={() => handleHeaderClick(col)}
              >
                {['MP', 'W', 'L', 'W%'][index]}
              </TableCell>
            ))}
            <TableCell sx={{ color: 'white', padding: '4px', paddingRight: '38px' }} align="right">
              FORM
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers.map((player, index) => {
            const { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage } = calculateStats(player);
            return (
              <TableRow key={player} sx={{ height: '36px' }}>
                <TableCell sx={{ color: 'white', padding: '4px' }}>
                  <Stack direction="row">
                    <PositionBox position={index + 1} />
                    {player}
                  </Stack>
                </TableCell>
                <TableCell sx={{  color: 'white', padding: '4px', background: selectedColumn === 'gamesPlayed' ? '#202424' : 'inherit', }} align="center">
                  <NumAnimation targetNumber={gamesPlayed} fixedNum={0} />
                </TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', background: selectedColumn === 'gamesWon' ? '#202424' : 'inherit' }} align="center">
                  <NumAnimation targetNumber={gamesWon} fixedNum={0} />
                </TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', background: selectedColumn === 'gamesLost' ? '#202424' : 'inherit' }} align="center">
                  <NumAnimation targetNumber={gamesLost} fixedNum={0} />
                </TableCell>
                <TableCell sx={{ color: 'white', padding: '4px', background: selectedColumn === 'winPercentage' ? '#202424' : 'inherit' }} align="center">
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