import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useLocation } from 'react-router'; // Import useLocation hook

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
                height: '70px',
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
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
