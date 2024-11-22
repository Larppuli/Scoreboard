import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Grow } from '@mui/material';

const Playercard = ({photoId, name, games}) => {
    const firstName = name.split(' ')[0];
    const playerGames = games.filter((game) => game.participants.includes(firstName));
    const eightLatestGames = playerGames.slice(playerGames.length - 8, playerGames.length);
    
    const calculateMarketValue = () => {
        let marketValue = 10;
    
        eightLatestGames.slice().reverse().forEach((game, index) => {
            const weight = Math.max(0.1, 3 - index * 0.1);
            const lossWeight = Math.max(0.1, 0.4 - index * 0.1);
    
            if (game.winner === firstName) {
                marketValue += 6 * weight;
            } else {
                marketValue -= 2 * lossWeight;
            }
        });
    
        return marketValue.toFixed(1);
    };
    
    return (
        <Grow in={true} timeout={500}>
            <Paper
                sx={{
                    background: '#080c0c',
                    color: 'white',
                    padding: '10px',
                    marginTop: '10px',
                }}
                elevation={2}
                align='left'
                >
                    <Stack direction="row"> 
                        <img
                            src={`https://drive.google.com/thumbnail?id=${photoId}`}
                            alt="Player Thumbnail"
                            style={{
                                borderRadius: '6%',
                                width: '60px',
                                height: '60px',

                            }}
                        />
                        <Stack paddingLeft={1} spacing={0.01}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {name}
                            </Typography>
                            <Typography variant="body2">
                                Market value: €{calculateMarketValue()}M
                            </Typography>
                        </Stack>
                    </Stack>
            </Paper>
        </Grow>
    );
};

export default Playercard;