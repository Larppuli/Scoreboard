import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const WinBarchart = ({ games, player }) => {
  const playerCounts = [2, 3, 4];

  const winningPercentages = playerCounts.map((count) => {
    const filteredGames = games.filter(
      (game) => game.participants.length === count && game.winner === player
    );
    const totalGames = games.filter((game) => game.participants.length === count).length;
    return totalGames > 0 ? (filteredGames.length / totalGames) * 100 : 0;
  });

  const backgroundColors = winningPercentages.map((percentage, index) => {
    const threshold = 100 / playerCounts[index];
    return percentage < threshold
      ? 'rgba(255, 99, 133, 0.39)'
      : 'rgba(97, 192, 75, 0.38)';
  });

  const borderColors = winningPercentages.map((percentage, index) => {
    const threshold = 100 / playerCounts[index];
    return percentage < threshold
      ? 'rgb(255, 99, 133)'
      : 'rgb(76, 188, 122)';
  });

  const data = {
    labels: ['2 Players', '3 Players', '4 Players'],
    datasets: [
      {
        data: winningPercentages,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper sx={{ maxWidth: '600px', marginTop: '10px', background: '#171f1f', paddingBlock: '20px' }}>
      <Typography
        sx={{
          color: 'white',
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: {
            xs: '80%',
            sm: '90%',
            md: '100%',
            lg: '120%',
          },
        }}
      >
        Win Percentages By Game Size
      </Typography>
      <Bar options={options} data={data} />
    </Paper>
  );
};

export default WinBarchart;
