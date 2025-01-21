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
import { Radar } from 'react-chartjs-2';
import { Typography, Paper } from '@mui/material';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillRadar = ({ player, games }) => {
  const calculateStats = (player) => {
    const playerGames = games.filter((game) => game.participants.includes(player));
    const gamesWon = playerGames.filter((game) => game.winner === player).length;
    const gamesPlayed = playerGames.length;
    const gamesLost = gamesPlayed - gamesWon;
    const winPercentage = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

    const sports = Array.from(
      new Set(games.map((game) => game.sport))
    );

    const statsBySport = sports.map((sport) => {
      const sportGames = playerGames.filter((game) => game.sport === sport);
      const sportWins = sportGames.filter((game) => game.winner === player).length;
      const sportWinPercentage = sportGames.length > 0 ? (sportWins / sportGames.length) * 100 : 0;

      return {
        sport,
        winPercentage: sportWinPercentage,
        wins: sportWins,
      };
    });

    return { playerGames, gamesPlayed, gamesWon, gamesLost, winPercentage, statsBySport };
  };

  const calculatePlayerSkills = () => {
    const { statsBySport } = calculateStats(player);
  
    const skillData = {};
    statsBySport.forEach(({ sport, winPercentage, wins }) => {
      const winPercentageSkill = winPercentage > 0 
        ? 100 * (1 - Math.exp(-winPercentage * 5)) 
        : 0;
  
      const winAmountSkill = 100 * (1 - Math.exp(-wins / 15));
  
      const totalSkill = winPercentageSkill * 0.3 + winAmountSkill * 0.7;
  
      skillData[sport] = Math.min(totalSkill, 100);
    });
  
    return skillData;
  };
  
  const playerSkillsData = calculatePlayerSkills();
  const labels = Object.keys(playerSkillsData);
  const playerSkills = Object.values(playerSkillsData);

  const data = {
    labels,
    datasets: [
      {
        label: `${player}'s Skills`,
        data: playerSkills,
        backgroundColor: 'rgba(0, 238, 255, 0.18)',
        borderColor: 'rgb(0, 238, 255)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#818181',
          backdropColor: '#171f1f',
        },
        grid: {
          color: '#818181',
        },
        angleLines: {
          color: '#b7b7b7',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Paper sx={{ maxWidth: '600px', marginTop: '10px', background: '#171f1f', paddingTop: '20px' }}>
        <Typography 
            sx={{
                color: 'White',
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: {
                    xs: '80%',
                    sm: '90%',
                    md: '100%',
                    lg: '120%',
                  },
                }}>
            Skill Radar
        </Typography>
        <div style={{ marginLeft: '20px' }}>
            <Radar data={data} options={options} />
        </div>
    </Paper>
  );
};

export default SkillRadar;
