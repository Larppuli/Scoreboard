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
import { Paper, Stack, Typography } from '@mui/material';

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
      const winPercentageSkill =
        winPercentage > 0 ? (Math.log(1 + winPercentage) / Math.log(2.5)) * 20 : 0;

      const winAmountSkill = (wins / 10) * 30;

      const totalSkill = winPercentageSkill * 0.7 + winAmountSkill * 0.3;

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
          backdropColor: '#080c0c',
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
    <Paper
      sx={{
        background: '#080c0c',
        color: 'black',
        padding: '10px',
        marginTop: '10px',
        width: '95%',
        height: '87%',
      }}
      elevation={2}
      align="center"
    >
      <Stack direction="row" alignItems="center" spacing={3} sx={{ marginBottom: '-20px' }}>
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
          {player}'s Skill Radar
        </Typography>
      </Stack>
      <Radar data={data} options={options} />
    </Paper>
  );
};

export default SkillRadar;
