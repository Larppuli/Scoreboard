import React from 'react';
import Leaguetable from '../components/Leaguetable';
import { Typography, Stack, Box } from '@mui/material';
import Playercard from '../components/Playercard';

const HomePage = ({ data }) => {

    return (
      <Box sx={{ paddingBottom: '120px' }} align='center'>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
              POIKAINSCORE
            </Typography>
          </Stack>
          <Leaguetable games={data} />
          <Playercard name='Oskari Valkama' games={data} />
          <Playercard name='Janne Peltokorpi' games={data} />
          <Playercard name='Lauri Talvitie' games={data} />
          <Playercard name='Eero Reijonen' games={data} />
      </Box>
    );
};

export default HomePage;
