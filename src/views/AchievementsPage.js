import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import Achievementcard from '../components/Achievementcard';

const AchievementPage = ({ data }) => {
    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
                POIKAINSCORE
                </Typography>
            </Stack>
            <Stack paddingBottom={10} alignItems="center">
                <Achievementcard  photoId={process.env.REACT_APP_OSKARI_ID} name='Oskari Valkama' games={data}/>
                <Achievementcard  photoId={process.env.REACT_APP_JANNE_ID} name='Janne Peltokorpi' games={data}/>
                <Achievementcard  photoId={process.env.REACT_APP_LAURI_ID} name='Lauri Talvitie' games={data}/>
                <Achievementcard  photoId={process.env.REACT_APP_EERO_ID} name='Eero Reijonen' games={data}/>
            </Stack>
        </Box>
    );
};

export default AchievementPage;
