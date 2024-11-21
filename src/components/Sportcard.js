import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';

const Sportcard = (sportData) => {
    const [sport, games] = sportData.sportData;
    const players = ['Oskari', 'Janne', 'Eero', 'Lauri'];

    const winPercentage = (player) => {
        const playerGames = games.filter((game) => game.participants.includes(player));
        const gamesWon = playerGames.filter((game) => game.winner === player).length;
        return ((gamesWon / playerGames.length) * 100).toFixed(1);
    };

    const bestWinPercentage = (players) => {
        let bestPlayer = null;
        let bestPercentage = 0;

        players.forEach((player) => {
            const percentage = winPercentage(player);
            if (percentage > bestPercentage) {
                bestPercentage = percentage;
                bestPlayer = player;
            }
        });

        return { bestPlayer, bestPercentage };
    };

    const winnerCounts = games.reduce((acc, game) => {
        acc[game.winner] = (acc[game.winner] || 0) + 1;
        return acc;
    }, {});

    const mostWins = Object.entries(winnerCounts).reduce(
        (max, [player, count]) => {
            return count > max.count ? { player, count } : max;
        },
        { player: null, count: 0 }
    );

    return (
        <Grow in={true} timeout={500}>
            <Paper
                sx={{
                    background: '#080c0c',
                    color: 'white',
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px',
                }}
                elevation={2}
            >
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '20px', marginBottom: '4px' }}>
                    {sport}
                </Typography>
                <Typography variant="body1">Games played: <b>{games.length}</b></Typography>
                <Typography variant="body1">Most wins: <b>{mostWins.player}</b>, {mostWins.count} games</Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    Best winning percentage: <b>{bestWinPercentage(players).bestPlayer}</b>, {bestWinPercentage(players).bestPercentage}%
                </Typography>
            </Paper>
        </Grow>
    );
};

export default Sportcard;
