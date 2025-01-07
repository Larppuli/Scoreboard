import React from 'react';
import Leaguetable from '../components/Leaguetable';
import { Typography, Stack, Box } from '@mui/material';
import Sportcard from '../components/Sportcard';
import { v4 as uuidv4 } from 'uuid';
import Playercard from '../components/Playercard';

const HomePage = ({ data }) => {

    const groupBySport = () => {
        const grouped = {};
        data.forEach(game => {
          if (!grouped[game.sport]) {
            grouped[game.sport] = [];
          }
          grouped[game.sport].push(game);
        });
        return grouped;
      };

    return (
      <Box sx={{ paddingBottom: '120px' }} align='center'>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
              POIKAINSCORE
            </Typography>
          </Stack>
          <Leaguetable games={data} />
          <Playercard photoId={process.env.REACT_APP_OSKARI_ID} name='Oskari Valkama' games={data} />
          <Playercard photoId={process.env.REACT_APP_JANNE_ID} name='Janne Peltokorpi' games={data} />
          <Playercard photoId={process.env.REACT_APP_LAURI_ID} name='Lauri Talvitie' games={data} />
          <Playercard photoId={process.env.REACT_APP_EERO_ID} name='Eero Reijonen' games={data} />
          {Object.entries(groupBySport()).map((sportData) => {
            return <Sportcard sportData={sportData} key={uuidv4()} />;
          })}
      </Box>
    );
};

export default HomePage;
