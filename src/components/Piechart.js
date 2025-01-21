import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Typography, Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ games, player }) => {
    const playerGames = games.filter((game) => game.participants.includes(player));
  
    const counts = { 2: 0, 3: 0, 4: 0 };
    playerGames.forEach((game) => {
      const participantCount = game.participants.length;
      if (participantCount >= 2 && participantCount <= 4) {
        counts[participantCount]++;
      }
    });
  
    const data = {
      labels: ['2 Players', '3 Players', '4 Players'],
      datasets: [
        {
          label: 'Game Participant Distribution',
          data: [counts[2], counts[3], counts[4]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <Paper sx={{ maxWidth: '600px', background: '#171f1f', paddingBlock: '20px' }}>
        <Typography 
          sx={{
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}
        >
          Game Participant Distribution
        </Typography>
        <Pie data={data} />
      </Paper>
    );
  };
  
  export default Piechart;
  
  