import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Line } from 'react-chartjs-2';
import { Checkbox, FormControlLabel } from '@mui/material';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Playercard = ({ scoreDevelopments, games }) => {
    const uniqueParticipants = [...new Set(games.flatMap(game => game.participants))];

    const colorBlindFriendlyPalette = [
        '#4a90e2',
        '#f0f0f0',
        '#50e3c2',
        '#e94e77',
    ];
    const gameLabels = scoreDevelopments[0].scores.map((_, index) => `Game ${index + 1}`);

    const datasets = scoreDevelopments.map((playerScore, index) => ({
        label: playerScore.player,
        data: playerScore.scores,
        borderColor: colorBlindFriendlyPalette[index % colorBlindFriendlyPalette.length],
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
    }));

    const chartData = {
        labels: gameLabels,
        datasets: datasets,
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    boxWidth: 10,
                    padding: 20,
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                        weight: 'bold',
                    },
                    color: '#ffffff',
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Score: ${tooltipItem.raw}`,
                },
                displayColors: true,
            },
        },
        scales: {
            y: {
                min: Math.min(...scoreDevelopments.map(player => Math.min(...player.scores))) - 0.5,
                max: Math.max(...scoreDevelopments.map(player => Math.max(...player.scores))) + 5,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        return Math.round(value);
                    },
                    color: '#ffffff',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#555555',
                },
                border: {
                    width: 0,
                },
            },
            x: {
                display: false,
            },
        },
        animation: {
            duration: 800,
            easing: 'easeInOutQuad',
        },
    };
    
    

    const [activeCharts, setActiveCharts] = useState(
        uniqueParticipants.reduce((acc, player) => {
            acc[player] = true;
            return acc;
        }, {})
    );

    const toggleChart = (player) => {
        setActiveCharts(prevState => ({
            ...prevState,
            [player]: !prevState[player],
        }));
    };

    const filteredDatasets = datasets.filter((_, index) =>
        activeCharts[scoreDevelopments[index].player]
    );

    return (
        <Paper
            sx={{
                background: '#080c0c',
                color: 'white',
                padding: '10px',
                marginTop: '10px',
                maxWidth: '1000px',
            }}
            elevation={2}
            align="left"
        >
            <Stack spacing={2} sx={{alignItems: 'center'}}>
            <Typography sx={{ fontFamily: '"Audiowide", sans-serif', paddingLeft: '10px', fontSize: '20px' }} color='white'>
                    Point Development
                </Typography>
                <Stack direction="row" spacing={'1%'}>
                    {uniqueParticipants.map((player, index) => (
                       <FormControlLabel
                       key={player}
                       control={
                           <Checkbox
                               checked={activeCharts[player]}
                               onChange={() => toggleChart(player)}
                               sx={{
                                   color: colorBlindFriendlyPalette[index % colorBlindFriendlyPalette.length],
                                   '&.Mui-checked': {
                                       color: colorBlindFriendlyPalette[index % colorBlindFriendlyPalette.length],
                                   },
                               }}
                           />
                       }
                       label={player}
                   />
                   
                    ))}
                </Stack>
                <div style={{ height: '400px', width: '100%' }}>
                    <Line data={{ ...chartData, datasets: filteredDatasets }} options={chartOptions} />
                </div>
            </Stack>
        </Paper>
    );
};

export default Playercard;