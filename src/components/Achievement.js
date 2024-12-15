import React from 'react';
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Achievement = ({ achievement, unlocked, stars, expanded, name }) => {
    return (
        <TableContainer>
            <Table sx={{ borderCollapse: 'collapse' }}>
                <TableBody >
                    <TableRow sx={{ border: 'none', width: '100%' }}>
                        <TableCell
                            sx={{
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                width: '69%',
                            }}
                        >
                            <Stack>
                                <Typography fontWeight={"bold"} fontSize={'clamp(17px, 2vw, 21px)'}>
                                    {name}
                                </Typography>
                                <Typography fontSize={'clamp(13px, 2vw, 21px)'}>
                                    {achievement}
                                </Typography>
                            </Stack>
                        </TableCell>
                            {Array.from({ length: stars }).map((_, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        border: 'none',
                                        padding: 0,
                                        maxWidth: '100px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <StarIcon
                                        sx={{
                                            fontSize: 'clamp(12px, 6vw, 29px)',
                                            color: (index < unlocked) && expanded ? 'gold' : '#3a3a3a',
                                            transition: expanded
                                                ? `color 0.5s ${1 + index * 0.7}s linear, transform 0.5s linear, filter 0.5s ${1 + index * 0.7}s linear`
                                                : 'color 0.3s linear, transform 0.3s linear, filter 0.3s linear',
                                            filter: expanded && (index < unlocked)
                                                ? 'drop-shadow(0 0 1.5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))'
                                                : 'none',
                                        }}
                                    />
                                </TableCell>
                            ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Achievement;
