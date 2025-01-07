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
    const participationCount = games.filter(match => match.participants.includes(firstName)).length;
    const gamesWon = games.filter((game) => game.winner === firstName).length;
    const playerGames = games.filter((game) => game.participants.includes(firstName));

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
            if (game.participants.includes(firstName)) {
                const [day, month, year] =game.date.split('.').map(Number);
                const gameDate = new Date(year, month - 1, day);
                const dayOfWeek = gameDate.getDay();
                daysPlayed.add(dayOfWeek);
            }
        });

        return daysPlayed.size === 7;
    };

    const hasPlayedAgainstEveryone = () => {
        const players = new Set();
    
        playerGames.forEach((game) => {
            if (game.participants.length === 2) {
                const participants = game.participants
                for (const participant of participants) {
                    players.add(participant)
                }
            };
        });
        return players.size === 4;
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
        <Grow in={true} timeout={700} > 
            <Stack spacing={2}
                sx={{
                    background: '#080c0c',
                    color: 'white',
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
                    }}
                    expanded={expanded}
                    onChange={handleAccordionChange}
                    >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
                      sx={{

                        "& .MuiAccordionSummary-content.Mui-expanded": {
                          margin: "12px 0"
                        }
                      }}
                    >
                    <Stack direction="column" sx={{ width: '100%', paddingLeft: '2%' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center">
                                <img
                                    src={`/images/insignia_${rank()}.png`}
                                    alt="Insignia"
                                    style={{ height: '60px' }}
                                />
                                <img
                                    src={`/images/${name.split(' ')[0]}.jpg`}
                                    alt="Player Thumbnail"
                                    style={{
                                        borderRadius: '6%',
                                        width: '60px',
                                        height: '60px',
                                        marginLeft: '10px',
                                    }}
                                />
                                <Stack paddingLeft={1} spacing={0.5}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Achievements:</b>{' '}
                                        <NumAnimation
                                            targetNumber={unlockedCount}
                                            fixedNum={0}
                                            colorChange={false}
                                        />
                                        /{achievements.flatMap((a) => a.achievement).length}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Rank:</b> {rank()}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack alignItems="center" justifyContent="center" sx={{ marginTop: '10px' }}>
                            
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
                                            ? a.unlocked.filter(value => value === true).length - 1
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
