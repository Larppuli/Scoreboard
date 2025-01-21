import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Stack, Typography, Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
import Piechart from './Piechart';
import SkillRadar from './Skillradar';
import WinBarchart from './WinBarchart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Playercharts = ({ player, games }) => {
  return (
    <Accordion       
        sx={{
            background: '#080c0c',
            marginTop: '10px',
            maxWidth: '1000px',
            borderRadius: '5px',
        }}
        align="center">
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
        >
            <Stack direction="row" alignItems="center" spacing={3} sx={{ marginBottom: '20px' }}>
                <img
                src={`/images/${player}.jpg`}
                alt="Player Thumbnail"
                style={{
                    borderRadius: '6%',
                    width: '60px',
                    height: '60px',
                }}
                />
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '18px' }} color="white">
                {player}'s Data Charts
                </Typography>
            </Stack>
        </AccordionSummary>
        <AccordionDetails>
            <Piechart games={games} player={player} />
            <WinBarchart games={games} player={player}/>
            <SkillRadar games={games} player={player} />
        </AccordionDetails>
    </Accordion>
  );
};

export default Playercharts;
