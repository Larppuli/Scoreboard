import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Navbar = () => {
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
                <BottomNavigation showLabels sx={{ width: '100%', background: 'inherit' }}>
                    <BottomNavigationAction
                        href="/"
                        icon={<EqualizerIcon sx={{color: '#ececec'}} />}
                        label="Stats"
                        sx={{ color: '#ececec' }}
                    />
                    <BottomNavigationAction
                        href="achievements"
                        icon={<EmojiEventsIcon sx={{ color: '#ececec' }} />}
                        label="Achievements"
                        sx={{ color: '#ececec' }}
                    />
                </BottomNavigation>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
