import React from 'react';
import NumAnimation from './NumAnimation';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Grow } from '@mui/material';
import { Line } from 'react-chartjs-2';
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

const Playercard = ({ photoId, name, games }) => {
    const firstName = name.split(' ')[0];
    const playerGames = games.filter((game) => game.participants.includes(firstName));

    const calculateMarketValueDevelopment = () => {
        let marketValue = 10;
        const marketValues = [];

        playerGames.forEach((game) => {
            const weight = game.participants.length * 0.1;
            const lossWeight = (10 / game.participants.length * 3);

            if (game.winner === firstName) {
                marketValue += 3 * weight;
            } else {
                marketValue -= lossWeight;
            }
            marketValues.push(marketValue.toFixed(1));
        });

        return marketValues;
    };

    const marketValueDevelopment = calculateMarketValueDevelopment();

    const chartData = {
        labels: playerGames,
        datasets: [
            {
                data: marketValueDevelopment,
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: (tooltipItems) => {
                        const gameIndex = tooltipItems[0].dataIndex;
                        const game = playerGames[gameIndex];
                        return `Game ${gameIndex + 1}: ${game.date}`;
                    },
                    label: (tooltipItem) => {
                        const marketValue = tooltipItem.raw;
                        return `Market Value: €${marketValue}M`;
                    },
                    footer: (tooltipItems) => {
                        const gameIndex = tooltipItems[0].dataIndex;
                        const game = playerGames[gameIndex];
                        return `Winner: ${game.winner}`;
                    },
                },
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `€${value}M`,
                },
            },
            x: {
                display: false
            },

        },
    };

    return (
        <Grow in={true} timeout={500}>
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
                <Stack spacing={2}>
                    <Stack direction="row">
                        <img
                            src={`https://drive.google.com/thumbnail?id=${photoId}`}
                            alt="Player Thumbnail"
                            style={{
                                borderRadius: '6%',
                                width: '60px',
                                height: '60px',
                            }}
                        />
                        <Stack paddingLeft={1} spacing={0.5}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {name}
                            </Typography>
                            <Typography variant="body2">
                                Current Market Value: €
                                <NumAnimation targetNumber={marketValueDevelopment[marketValueDevelopment.length - 1]} fixedNum={1}/>M
                            </Typography>
                        </Stack>
                    </Stack>
                    <div style={{ height: '150px', width: '100%' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </Stack>
            </Paper>
        </Grow>
    );
};

export default Playercard;