import React from 'react';
import { Box, Typography } from '@mui/material';

const Photography = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3">My Photos</Typography>
      <Typography variant="body1" mt={2}>
        This is the photography page.
      </Typography>
    </Box>
  );
};

export default Photography;