import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import ListIcon from '@mui/icons-material/List';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: 'rgba(30, 30, 30, 0.5)',
                backdropFilter: 'blur(5px)',
                bottom: 0,
                top: 'auto',
                height: '90px',
            }}
        >
            <Toolbar>
                <BottomNavigation
                    showLabels
                    sx={{
                        width: '100%',
                        background: 'inherit',
                    }}
                >
                    <BottomNavigationAction
                        component={Link}
                        to="/"
                        icon={<EqualizerIcon sx={{ color: currentPath === '/' ? '#528afc' : '#969696' }} />}
                        label="Stats"
                        style={{
                            color: currentPath === '/' ? '#528afc' : '#969696',
                            background: 'inherit',
                            borderRadius: '5px',
                            height: '90px',
                            paddingBottom: '30px'
                        }}
                    />

                    <BottomNavigationAction
                        component={Link}
                        to="/achievements"
                        icon={<EmojiEventsIcon sx={{ color: currentPath === '/achievements' ? '#528afc' : '#969696' }} />}
                        label="Achievements"
                        style={{
                            color: currentPath === '/achievements' ? '#528afc' : '#969696',
                            background: 'inherit',
                            borderRadius: '5px',
                            height: '90px',
                            paddingBottom: '30px'
                        }}
                    />

                    <BottomNavigationAction
                        component={Link}
                        to="/new-game"
                        icon={<SportsKabaddiIcon sx={{ color: currentPath === '/new-game' ? '#528afc' : '#969696' }} />}
                        label="New Game"
                        style={{
                            color: currentPath === '/new-game' ? '#528afc' : '#969696',
                            background: 'inherit',
                            borderRadius: '5px',
                            height: '90px',
                            paddingBottom: '30px'
                        }}
                    />

                    <BottomNavigationAction
                        component={Link}
                        to="/games"
                        icon={<ListIcon sx={{ color: currentPath === '/games' ? '528afc' : '#969696' }} />}
                        label="Games"
                        style={{
                            color: currentPath === '/games' ? '#528afc' : '#c3c3c3',
                            background: 'inherit',
                            borderRadius: '5px',
                            height: '90px',
                            paddingBottom: '30px'
                        }}
                    />
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;