import React from 'react';
import { Box, Typography } from '@mui/material';

const Projects = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3">My Projects</Typography>
      <Typography variant="body1" mt={2}>
        This is the projects page.
      </Typography>
    </Box>
  );
};

export default Projects;
