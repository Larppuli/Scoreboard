import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useLocation } from 'react-router';
import ListIcon from '@mui/icons-material/List';

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
                height: '120px',
                justifyContent: 'center',
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
                    href="/"
                    icon={<EqualizerIcon sx={{ color: currentPath === '/' ? 'white' : '#969696' }} />}
                    label="Stats"
                    style={{
                        color: currentPath === '/' ? 'white' : '#969696',
                        background: currentPath === '/' ? 'rgba(40, 40, 40, 0.3)' : 'inherit',
                        borderRadius: '5px'
                    }}
                />

                <BottomNavigationAction
                    href="/achievements"
                    icon={<EmojiEventsIcon sx={{ color: currentPath === '/achievements' ? 'white' : '#969696' }} />}
                    label="Achievements"
                    style={{
                        color: currentPath === '/achievements' ? 'white' : '#969696',
                        background: currentPath === '/achievements' ? 'rgba(40, 40, 40, 0.3)' : 'inherit',
                        borderRadius: '5px'
                    }}
                />
                <BottomNavigationAction
                    href="/new-game"
                    icon={<SportsKabaddiIcon sx={{ color: currentPath === '/new-game' ? 'white' : '#969696' }} />}
                    label="New game"
                    style={{
                        color: currentPath === '/new-game' ? 'white' : '#969696',
                        background: currentPath === '/new-game' ? 'rgba(40, 40, 40, 0.3)' : 'inherit',
                        borderRadius: '5px'
                    }}
                />
                <BottomNavigationAction
                    href="/games"
                    icon={<ListIcon sx={{ color: currentPath === '/games' ? 'white' : '#969696' }} />}
                    label="Games"
                    style={{
                        color: currentPath === '/games' ? 'white' : '#969696',
                        background: currentPath === '/games' ? 'rgba(40, 40, 40, 0.3)' : 'inherit',
                        borderRadius: '5px'
                    }}
                />
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
