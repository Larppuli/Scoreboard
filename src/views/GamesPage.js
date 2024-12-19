import React, { useState, useEffect } from 'react';
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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    keyframes
} from '@mui/material';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GamesView = ({ data }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [games, setGames] = useState([])

    useEffect(() => {
        if (data) {
            setGames(data);
        }
    }, [data]);

    const handleDeleteGame = () => {
        console.log(selectedId)
        if (selectedId) {
            setDialogOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedId) {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await fetch(`${apiUrl}/api/games?id=${selectedId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    console.log(`Deleted game with ID: ${selectedId}`);
                    setSelectedId(null);
                    setDialogOpen(false);
                    setGames(games => games.filter(game => game.id !== selectedId));
                } else {
                    console.error(`Failed to delete game with ID: ${selectedId}`);
                }
            } catch (error) {
                console.error(`Error deleting game: ${error}`);
            }
        }
    };
    

    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    return (
        <Box sx={{ paddingBottom: '80px' }} align="center">
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color="white">
                    POIKAINSCORE
                </Typography>
            </Stack>
            <Box
                sx={{
                    marginTop: '40px',
                    overflowY: 'auto',
                    height: '470px',
                    backgroundColor: '#080c0c',
                    borderRadius: '2px'
                }}
            >
                <TableContainer sx={{ background: '#080c0c' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 13, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">
                                    Date
                                </TableCell>
                                <TableCell sx={{ fontSize: 13, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">
                                    Participants
                                </TableCell>
                                <TableCell sx={{ fontSize: 13, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">
                                    Sport
                                </TableCell>
                                <TableCell sx={{ fontSize: 13, padding: '8px', fontWeight: 'bold', color: 'white' }} align="center">
                                    Winner
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.slice().reverse().map((game, index) => (
                                <TableRow
                                    key={index}
                                    value={game}
                                    onClick={() => setSelectedId(game.id)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#3c3f3f',
                                            transition: 'background-color 0.3s ease'
                                        },
                                        animation: `${fadeInUp} 0.3s ease-out`,
                                        cursor: 'pointer',
                                        backgroundColor: selectedId === game.id ? '#3c3f3f' : 'inherit'
                                    }}
                                >
                                    <TableCell sx={{ padding: '13px', color: 'white' }} align="center">
                                        <Typography fontSize={13}>{game.date}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">
                                        <Typography fontSize={13}>
                                            {game.participants.map(name => name.charAt(0)).join(', ')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">
                                        <Typography fontSize={13}>{game.sport}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="center">
                                        <Typography fontSize={13}>{game.winner}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Button
                variant="contained"
                onClick={handleDeleteGame}
                sx={{
                    background: '#c84c4c',
                    padding: '20px',
                    marginTop: '20px',
                    fontSize: '15px',
                    fontFamily: '"Audiowide", sans-serif',
                    '&.Mui-disabled': {
                        borderColor: '#080c0c',
                        color: '#080c0c'
                    }
                }}
                disabled={!selectedId}
            >
                Delete Game
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirmation-dialog-description">
                        Are you sure you want to delete the selected game?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GamesView;
