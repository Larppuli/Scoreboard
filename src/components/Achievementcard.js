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
                const [day, month, year] =game.date.split('.').map(Number);
                const gameDate = new Date(year, month - 1, day);
                const dayOfWeek = gameDate.getDay();
                daysPlayed.add(dayOfWeek);
            }
        });

        return daysPlayed.size === 7;
    };

    const hasPlayedAgainstEveryone = () => {
        const players = [];
    
        games.forEach((game) => {
            const participants = game.participants.split(',').map(name => name.trim())
            if (participants.length === 2) {
                for (const participant of participants) {
                    if (!players.includes(participant)) {
                        players.push(participant)
                    }
                }
            }
        });
        return players.length === 4;
    };

    const snookerWins = () => {
        let snookersWon = 0;
        
        games.forEach((game) => {
            if (game.winner === firstName && game.sport === 'Snooker') {
                snookersWon += 1;
            }
        });

        return snookersWon;
    };

    const petanqueWins = () => {
        let petanquesWon = 0;
        
        games.forEach((game) => {
            if (game.winner === firstName && game.sport === 'Petanque') {
                petanquesWon += 1;
            }
        });

        return petanquesWon;
    };

    const achievements = [
        { achievement: ['Play 20 games', 'Play 40 games', 'Play 100 games'], unlocked: [participationCount >= 20, participationCount >= 40, participationCount >= 100] },
        { achievement: ['Win 10 games', 'Win 20 games', 'Win 40 games'], unlocked: [gamesWon >= 10, gamesWon >= 20, gamesWon >= 40] },
        { achievement: ['Win 3 games in a row', 'Win 5 games in a row', 'Win 7 games in a row'], unlocked: [winStreak() >= 3, winStreak() >= 5, winStreak() >= 7] },
        { achievement: ['Win 5 snooker games', 'Win 10 snooker games', 'Win 20 snooker games'], unlocked: [snookerWins() >= 5, snookerWins() >= 10, snookerWins() >= 20] },
        { achievement: ['Win 5 petanque games', 'Win 10  petanque games', 'Win 20  petanque games'], unlocked: [petanqueWins() >= 5, petanqueWins() >= 10, petanqueWins() >= 20] },
        { achievement: ['Play 1 vs 1 against everyone'], unlocked: [hasPlayedAgainstEveryone()] },
        { achievement: ['Play on every day of the week'], unlocked: [hasPlayedEveryDay()] },
    ];

    const unlockedCount = achievements
    .flatMap(a => a.unlocked)
    .filter(value => value === true).length;

    const rank = () => {
        if (unlockedCount === 0) {
            return 'Newbie';
        } else if (unlockedCount <= 3) {
            return 'Rookie';
        } else if (unlockedCount <= 5) {
            return 'Intermediate';
        } else if (unlockedCount <= 8) {
            return 'Experienced';
        } else if (unlockedCount <= 12) {
            return 'Veteran';
        } else if (unlockedCount <= 15) {
            return 'Elite';
        } else if (unlockedCount <= 17) {
            return 'Legend';
        }
    };
    

    return (
        <Grow in={true} timeout={700} >
            <Paper
                sx={{
                    background: '#080c0c',
                    color: 'white',
                    padding: '10px',
                    marginTop: '10px',
                    width: '95%',
                    maxWidth: '1000px',
                }}
                elevation={3}
                align="left"
            >
                <Stack spacing={2}>
                    <Accordion sx={{
                            backgroundColor: '#080c0c',
                            color: 'white',
                            boxShadow: 'none',
                        }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>} >
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
                                <b>Achievements unlocked:</b> <NumAnimation targetNumber={unlockedCount} fixedNum={0} colorChange={false}/>/{achievements.flatMap(a => a.achievement).length}
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
                                        achievement={a.achievement[
                                            a.unlocked.filter(value => value === true).length === a.achievement.length
                                                ? a.unlocked.filter(value => value === true).length + 1
                                                : a.unlocked.filter(value => value === true).length
                                        ]}
                                        unlocked={a.unlocked.filter(value => value === true).length}
                                        stars={a.achievement.length}
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
