import { Stack, Typography } from '@mui/material';
import React from 'react';

const AchievementPage = () => {
    return (
        <div>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
                POIKAINSCORE
                </Typography>
            </Stack>
            <Stack sx={{ height: '790px', alignItems: 'center', paddingTop: '60%'}}>
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '55px' }} color='white' align='center'>
                    Coming <br/>soon
                </Typography>
            </Stack>
        </div>
    );
};

export default AchievementPage;
