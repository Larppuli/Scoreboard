import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Achievementcard from '../components/Achievementcard';

const AchievementPage = ({ data }) => {
    return (
        <Box>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
                POIKAINSCORE
                </Typography>
            </Stack>
            <Stack paddingBottom={10} alignItems="center">
                <Achievementcard  name='Oskari Valkama' games={data}/>
                <Achievementcard  name='Janne Peltokorpi' games={data}/>
                <Achievementcard  name='Lauri Talvitie' games={data}/>
                <Achievementcard  name='Eero Reijonen' games={data}/>
            </Stack>
        </Box>
    );
};

export default AchievementPage;
