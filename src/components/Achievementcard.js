import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import { Grow } from '@mui/material';
import Achievement from './Achievement';
import NumAnimation from './NumAnimation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Achievementcard = ({ photoId, name, games }) => {
    const [expanded, setExpanded] = useState(false);
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
        { achievement: ['Play 20 games', 'Play 40 games', 'Play 100 games', 'Play 150 games'], unlocked: [participationCount >= 20, participationCount >= 40, participationCount >= 100, participationCount >= 150], name: "Game Enthusiast" },
        { achievement: ['Win 10 games', 'Win 20 games', 'Win 40 games', 'Win 60 games'], unlocked: [gamesWon >= 10, gamesWon >= 20, gamesWon >= 40, gamesWon >= 60], name: "Champion's Path" },
        { achievement: ['Win 3 games in a row', 'Win 4 games in a row', 'Win 6 games in a row', 'Win 7 games in a row'], unlocked: [winStreak() >= 3, winStreak() >= 4, winStreak() >= 6, winStreak() >= 7], name: "Streak Conqueror" },
        { achievement: ['Win 5 snooker games', 'Win 10 snooker games', 'Win 20 snooker games', 'Win 40 snooker games'], unlocked: [snookerWins() >= 5, snookerWins() >= 10, snookerWins() >= 20, snookerWins() >= 40], name: "Snooker Specialist" },
        { achievement: ['Win 5 petanque games', 'Win 10  petanque games', 'Win 20  petanque games', 'Win 40  petanque games'], unlocked: [petanqueWins() >= 5, petanqueWins() >= 10, petanqueWins() >= 20, petanqueWins() >= 40], name: "Petanque Mastery" },
        { achievement: ['Play 1 vs 1 against everyone'], unlocked: [hasPlayedAgainstEveryone()], name: "Ultimate Competitor" },
        { achievement: ['Play on every day of the week'], unlocked: [hasPlayedEveryDay()], name: "Weekly Warrior" },
    ];

    const unlockedCount = achievements
    .flatMap(a => a.unlocked)
    .filter(value => value === true).length;

    const rank = () => {
        if (unlockedCount === 0) {
            return 'Newbie';
        } else if (unlockedCount <= 4) {
            return 'Rookie';
        } else if (unlockedCount <= 7) {
            return 'Intermediate';
        } else if (unlockedCount <= 10) {
            return 'Experienced';
        } else if (unlockedCount <= 15) {
            return 'Veteran';
        } else if (unlockedCount <= 20) {
            return 'Elite';
        } else {
            return 'Legend';
        }
    };

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };   

    return (
        <Grow in={true} timeout={700}>
            <Stack spacing={2}
                sx={{
                    background: '#080c0c',
                    color: 'white',
                    padding: '10px',
                    marginTop: '10px',
                    width: '95%',
                    maxWidth: '1000px',
                    borderRadius: '5px'
                }}>
                <Accordion 
                    sx={{
                        background: '#080c0c',
                        color: 'white',
                        padding: '10px',
                        marginTop: '10px',
                        width: '95%',
                        maxWidth: '1000px',
                        paddingBottom: '10px',
                        boxShadow: 'none',
                        '& .MuiAccordionSummary-content': {
                            margin: 0.5, // Remove default margin from the summary content
                        },
                        '& .MuiAccordionDetails-root': {
                            padding: '10px', // Padding for the details section to maintain space
                        },
                    }}
                    expanded={expanded}
                    onChange={handleAccordionChange}
                    >
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
                        <Stack spacing={-2} >
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
                                    expanded={expanded}
                                    name={a.name}
                                />
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Grow>
    );
};

export default Achievementcard;
