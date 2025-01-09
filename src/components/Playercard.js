import React from 'react';
import NumAnimation from './NumAnimation';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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

const Playercard = ({ name, games }) => {
    const firstName = name.split(' ')[0];
    const playerGames = games.filter((game) => game.participants.includes(firstName));

    const calculateMarketValueDevelopment = () => {
        let marketValue = 10;
        const marketValues = [];

        playerGames.forEach((game) => {
            const weight = game.participants.length * 1.5;
            const lossWeight = (marketValue * 0.1 / game.participants.length);

            if (game.winner === firstName) {
                marketValue += weight;
            } else {
                marketValue -= lossWeight;
            }
            marketValues.push(marketValue.toFixed(1));
        });

        return marketValues;
    };

    const marketValueDevelopment = calculateMarketValueDevelopment();

    const chartLabels = playerGames.map((game) => game.date);

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                data: marketValueDevelopment,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.4,
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
                grid: {
                    display: true,
                    color: 'rgba(100, 100, 100, 0.1)',
                },
            },
            x: {
                display: false
            },
        },
        animation: {
            duration: 800,
            easing: 'easeInOutQuad',
        },
    };

    return (
        <Paper
            sx={{
                background: '#080c0c',
                color: 'white',
                padding: '10px',
                marginTop: '10px',
                maxWidth: '1000px',
                position: 'relative',
            }}
            elevation={2}
            align="left"
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'opacity 0.5s ease-out',
                    zIndex: 10,
                }}
            ></div>

            <Stack spacing={2}>
                <Stack direction="row">
                    <img
                        src={`/images/${name.split(' ')[0]}.jpg`}
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
                            Current Market Value:{' '}
                            <NumAnimation
                                targetNumber={marketValueDevelopment[marketValueDevelopment.length - 1]}
                                fixedNum={1}
                                colorChange={true}
                                fontWeight={'bold'}
                            />{' '}
                            M€
                        </Typography>
                    </Stack>
                </Stack>
                <div style={{ height: '150px', width: '100%' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </Stack>
        </Paper>
    );
};

export default Playercard;