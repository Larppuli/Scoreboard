import React from 'react';
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Box,
    TableHead,
} from '@mui/material';

const GamesView = ({ data }) => {
  return (
    <Box sx={{ paddingBottom: '80px' }} align='center'>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
                POIKAINSCORE
            </Typography>
        </Stack>
        <Box
            sx={{
                marginTop: '40px',
                overflowY: 'auto',
                maxHeight: '650px',
                backgroundColor: '#080c0c',
                borderRadius: '2px'
            }}
        >
            <TableContainer sx={{background: '#080c0c'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 11, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">Date</TableCell>
                            <TableCell sx={{ fontSize: 11, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">Participants</TableCell>
                            <TableCell sx={{ fontSize: 11, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">Sport</TableCell>
                            <TableCell sx={{ fontSize: 11, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">Winner</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {data.map((game, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#3c3f3f',
                                        transition: 'background-color 0.3s ease', 
                                    }
                                }}
                            >
                                <TableCell sx={{ padding: '13px', color: 'white' }} align="center">
                                    <Typography fontSize={13}>{game.date}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '8px', color: 'white' }} align="center">
                                    <Typography fontSize={13}>
                                        {game.participants.map(name => name.charAt(0)).join(', ')}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '8px', color: 'white' }} align="center">
                                    <Typography fontSize={13}>{game.sport}</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: '8px', color: 'white' }} align="center">
                                    <Typography fontSize={13}>{game.winner}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
  );
};

export default GamesView;
