import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Leaguetable from './components/Leaguetable';
import { Typography, Stack } from '@mui/material';
import Sportcard from './components/Sportcard';
import { v4 as uuidv4 } from 'uuid'
import Playercard from './components/Playercard';
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
      <div align="center">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color='white'>
            POIKAINSCORE
          </Typography>
        </Stack>
        <Leaguetable games={data} />
        <Playercard photoId={process.env.REACT_APP_OSKARI_ID} name='Oskari Valkama' games={data}/>
        <Playercard photoId={process.env.REACT_APP_JANNE_ID} name='Janne Peltokorpi' games={data}/>
        <Playercard photoId={process.env.REACT_APP_LAURI_ID} name='Lauri Talvitie' games={data}/>
        <Playercard photoId={process.env.REACT_APP_EERO_ID} name='Eero Reijonen' games={data}/>
        {Object.entries(groupBySport()).map((sportData)=>{
          return <Sportcard sportData={sportData} key={uuidv4()}/>
        })}
      </div>
    );
};

export default App;
