import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../component/Appbar';


const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Appbar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 15,
            pb: 10,
            width: '100%',
            height: '100%',
          }}
        >
          
          <Container fixed>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '50vh',
          marginTop: '5rem', // กำหนดระยะห่างด้านบน
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          color="#fff"
          gutterBottom
        >
          ยินดีต้อนรับสู่
        </Typography>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="#fff"
          gutterBottom
        >
          ระบบจัดการการแข่งขันกีฬาอีสปอร์ต
        </Typography>
      </Box>
    </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
