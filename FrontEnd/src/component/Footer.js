import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#50556b',
        color:'#fff',
        padding: '20px 0',
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" spacing={3} px={3}>
        
        {/* Left Side */}
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            MANAGEMENT SYSTEMS FOR ESPORT TOURNAMENT
          </Typography>
          <Typography variant="body2" display="flex" alignItems="center">
          ระบบจัดการแข่งขันกีฬาอีสปอร์ต
          </Typography>
        </Grid>

        {/* Right Side */}
        <Grid item xs={6} textAlign="right">
          <Typography variant="subtitle1" gutterBottom>
          About us:
          </Typography>
          <Typography variant="body2">
          <IconButton size="small">
              <EmailIcon />
            </IconButton>
            esportsth@psu.ac.th
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
