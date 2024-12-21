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
import MenuSelection from '../components/MenuSelection';
import Datepicker from '../components/Datepicker';

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

const GamesPage = ({
    data,
    selectedDate,
    handleDateChange,
    handleWinnerChange,
    handleParticipantsChange,
    handleSportChange,
    selectedParticipants,
    selectedSport,
    selectedWinner,
    setSelectedDate
}) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [games, setGames] = useState([])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setGames(data);
        }
    }, [data]);

    const handleDeleteGame = () => {
        if (selectedGame) {
            setDeleteDialogOpen(true);
        }
    };

    const handleEditGame = () => {
        if (selectedGame) {
            setEditDialogOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedGame) {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await fetch(`${apiUrl}/api/games?id=${selectedGame.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    setSelectedGame(null);
                    setDeleteDialogOpen(false);
                    setGames(games => games.filter(game => game.id !== selectedGame.id));
                } else {
                    console.error(`Failed to delete game with ID: ${selectedGame.id}`);
                }
            } catch (error) {
                console.error(`Error deleting game: ${error}`);
            }
        }
    };

    const handleConfirmEdit = async () => {
        const updatedGame = {
            date: selectedDate ? selectedDate.utc().format('YYYY-MM-DD') : selectedGame?.date,
            participants: selectedParticipants?.length > 0 ? selectedParticipants : selectedGame?.participants,
            sport: selectedSport || selectedGame?.sport,
            winner: selectedWinner || selectedGame?.winner,
        };
    
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/games?id=${selectedGame.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGame),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the game');
            }
        
            setGames((games) =>
                games.map((game) =>
                    game.id === selectedGame.id
                        ? {
                            ...game,
                            ...updatedGame,
                            date: selectedDate.format('DD.MM.YYYY'),
                        }
                        : game
                )
            );
    
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating the game:', error);
        }
    }; 

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };

    const handleCancelEdit = () => {
        setEditDialogOpen(false);
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
                                    onClick={() => setSelectedGame(game)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#3c3f3f',
                                            transition: 'background-color 0.3s ease'
                                        },
                                        animation: `${fadeInUp} 0.3s ease-out`,
                                        cursor: 'pointer',
                                        backgroundColor: selectedGame === game ? '#3c3f3f' : 'inherit'
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
            <Stack direction='row' justifyContent='center'>
                <Button
                    variant="contained"
                    onClick={handleEditGame}
                    sx={{
                        width: '170px',
                        marginRight: '10px',
                        background: '#3b66fb',
                        padding: '20px',
                        marginTop: '20px',
                        fontSize: '15px',
                        fontFamily: '"Audiowide", sans-serif',
                        '&.Mui-disabled': {
                            borderColor: '#080c0c',
                            color: '#080c0c'
                        }
                    }}
                    disabled={!selectedGame}
                >
                    Edit Game
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDeleteGame}
                    sx={{
                        width: '170px',
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
                    disabled={!selectedGame}
                >
                    Delete Game
                </Button>
            </Stack>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="delete-confirmation-dialog-title"
                aria-describedby="delete-confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirmation-dialog-description">
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
            <Dialog
                open={editDialogOpen}
                key={selectedGame?.id}
                onClose={handleCancelDelete}
                aria-labelledby="delete-confirmation-dialog-title"
                aria-describedby="edit-confirmation-dialog-description"
            >
                <DialogTitle id="edtit-confirmation-dialog-title">Edit game</DialogTitle>
                <DialogContent>
                    <Stack direction="column" alignItems="center" marginTop='10px'>
                        <Datepicker
                            customSx={{ width: '257px' }}
                            handleDateChange={handleDateChange}
                            defaultDate={selectedGame?.date ? selectedGame.date ? selectedGame.date : null : null}
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                        />
                        <MenuSelection
                            selections={["Eero", "Janne", "Lauri", "Oskari"]}
                            autoSelect={selectedGame?.participants}
                            multi={true}
                            label="Select Participants"
                            onSelectionChange={handleParticipantsChange}
                            customSx={{width: '257px'}}
                        />
                        <MenuSelection
                            selections={selectedParticipants && selectedParticipants.length > 0 ? selectedParticipants : selectedGame?.participants}
                            autoSelect={selectedWinner.length > 0 ?[selectedWinner] : [selectedGame?.winner]}
                            multi={false}
                            label="Select Winner"
                            onSelectionChange={handleWinnerChange}
                            customSx={{width: '257px'}}
                        />
                        <MenuSelection
                            selections={["Snooker", "Petanque", "Darts"]}
                            autoSelect={selectedSport.length > 0 ?[selectedSport] : [selectedGame?.sport]}
                            multi={false}
                            label="Select Winner"
                            onSelectionChange={handleSportChange}
                            customSx={{width: '257px'}}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmEdit} color="error" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GamesPage;