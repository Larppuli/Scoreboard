import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Achievement = ({ achievement, unlocked }) => {
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
                            <StarIcon
                                sx={{
                                    color: unlocked ? 'gold' : '#3a3a3a',
                                    transition: 'color 0.4s ease-in-out',
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Achievement;
