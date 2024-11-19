import React from 'react';
import { Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const Form = () => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Paper elevation={1} sx={{ padding: '10px', textAlign: 'center' }}>
        <Typography variant="p">A</Typography>
      </Paper>
      <Paper elevation={1} sx={{ padding: '10px', textAlign: 'center' }}>
        <Typography variant="p">B</Typography>
      </Paper>
      <Paper elevation={1} sx={{ padding: '10px', textAlign: 'center' }}>
        <Typography variant="p">C</Typography>
      </Paper>
    </Stack>
  );
};

export default Form;
