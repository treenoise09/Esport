import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import TournamentBracket from './TournamentBracket';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '../component/CustomBreadcrumbs';
function TournamentSchedule() {
    const teams = [
        "Team 1", "Team 2", "Team 3", "Team 4",
        "Team 5", "Team 6", "Team 7", "Team 8",
        "Team 9", "Team 10", "Team 11", "Team 12",
        "Team 13", "Team 14", "Team 15", "Team 16"
    ];
    const defaultTheme = createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              body {
                background-image: linear-gradient(to right, #24252b, #2c334f), url(PATH_TO_YOUR_PHOTO);
              }
            `,
          },
        },
      });
    return (
        <ThemeProvider theme={defaultTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="xxl">
            <CssBaseline />
            <h1 style={{color:'white'}}>Tournament Schedule</h1>
            <TournamentBracket teams={teams} />
        </Container>
        </div>
        </ThemeProvider>
    );
}

export default TournamentSchedule;
