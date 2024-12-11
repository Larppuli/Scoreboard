import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import { Grow } from '@mui/material';
import Achievement from './Achievement';
import NumAnimation from './NumAnimation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Achievementcard = ({ photoId, name, games }) => {
    const firstName = name.split(' ')[0];
    const participationCount = games.filter(match => match.participants.split(', ').includes(firstName)).length;
    const gamesWon = games.filter((game) => game.winner === firstName).length;
    
    const winStreak = () => {
        let maxStreak = 0;
        let currentStreak = 0;
        
        games.forEach((game) => {
            if (game.winner === firstName) {
                currentStreak += 1;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        });
    
        return maxStreak;
    };

    const hasPlayedEveryDay = () => {
        const daysPlayed = new Set();
        
        games.forEach((game) => {
            if (game.participants.split(', ').includes(firstName)) {
                const gameDate = new Date(game.date);
                const dayOfWeek = gameDate.getDay();
                daysPlayed.add(dayOfWeek);
            }
        });
    
        return daysPlayed.size === 7;
    };

    const achievements = [
        { achievement: 'Play 10 games', unlocked: participationCount >= 10 },
        { achievement: 'Play 20 games', unlocked: participationCount >= 20 },
        { achievement: 'Play 40 games', unlocked: participationCount >= 40 },
        { achievement: 'Play 60 games', unlocked: participationCount >= 60 },
        { achievement: 'Win 5 games', unlocked: gamesWon >= 5 },
        { achievement: 'Win 10 games', unlocked: gamesWon >= 10 },
        { achievement: 'Win 20 games', unlocked: gamesWon >= 20 },
        { achievement: 'Win 3 games in a row', unlocked: winStreak() >= 3 },
        { achievement: 'Win 5 games in a row', unlocked: winStreak() >= 5 },
        { achievement: 'Play on every day of the week', unlocked: hasPlayedEveryDay() },
    ];

    const rank = () => {
        if (unlockedCount === 0) {
            return 'Loser';
        } else if (unlockedCount <= 3) {
            return 'Rookie';
        } else if (unlockedCount <= 5) {
            return 'Intermediate';
        } else if (unlockedCount <= 10) {
            return 'Veteran';
        } else {
            return 'Legend';
        }
    };

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <Grow in={true} timeout={700}>
            <Paper
                sx={{
                    background: '#080c0c',
                    color: 'white',
                    padding: '10px',
                    marginTop: '10px',
                    maxWidth: '1000px',
                }}
                elevation={2}
                align="left"
            >
                <Stack spacing={2}>
                    <Accordion sx={{
                            backgroundColor: '#080c0c',
                            color: 'white',
                            boxShadow: 'none',
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}

                        >
                            <Stack direction="row" alignItems='center'>
                        <img
                            src={`https://drive.google.com/thumbnail?id=${photoId}`}
                            alt="Player Thumbnail"
                            style={{
                                borderRadius: '6%',
                                width: '60px',
                                height: '60px',
                            }}
                        />
                        <Stack paddingLeft={1} spacing={0.5}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {name}
                            </Typography>
                            <Typography variant="body2">
                                <b>Achievements unlocked:</b> <NumAnimation targetNumber={unlockedCount} fixedNum={0} colorChange={false}/>/{achievements.length}
                            </Typography>
                            <Typography variant="body2">
                                <b>Rank:</b> {rank()}
                            </Typography>
                        </Stack>
                    </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={-2}>
                                {achievements.map((a, index) => (
                                    <Achievement
                                        key={index}
                                        achievement={a.achievement}
                                        unlocked={a.unlocked}
                                    />
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Paper>
        </Grow>
    );
};

export default Achievementcard;
