import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Achievement = ({ achievement, unlocked, stars }) => {
    return (
        <TableContainer>
            <Table sx={{ borderCollapse: 'collapse' }}>
                <TableBody>
                    <TableRow sx={{ border: 'none' }}>
                        <TableCell
                            sx={{
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                width: 220,
                            }}
                        >
                            {achievement}
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>
                            {Array.from({ length: stars }).map((_, index) => (
                                <StarIcon
                                    key={index}
                                    sx={{
                                        color: index < unlocked ? 'gold' : '#3a3a3a',
                                        transition: 'color 0.2s ease-in-out',
                                        filter: index < unlocked
                                            ? 'drop-shadow(0 0 1.5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))'
                                            : 'none',
                                    }}
                                />
                            ))}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Achievement;
