import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Leaguetable from './components/Leaguetable';
import { Typography, Stack } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const games = result.data.map(row => ({
            date: row['Pelipäivä'],
            winner: row['Voittaja'],
            participants: row['Osallistujat'],
            sport: row['Laji'], 
          }));
          setData(games);
        },
      });
    };

    fetchData();
  }, []);
  return (
    <div align="center">
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
        <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
          POIKAINSCORE
        </Typography>
      </Stack>
      <Leaguetable games={data}/>
    </div>
  );
};

export default App;
