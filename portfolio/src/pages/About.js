import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3">About Me</Typography>
      <Typography variant="body1" mt={2}>
        This is the about page.
      </Typography>
    </Box>
  );
};

export default About;
