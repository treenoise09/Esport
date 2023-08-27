import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import TournamentBracket from './TournamentBracket';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '../component/CustomBreadcrumbs';
import { getAllRegistrationsByTournamentId } from '../apis/registerAPI';
import { useLocation, useParams } from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function TournamentSchedule() {
    const [teams,setTeams] = useState([])
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
    const {id} = useParams()
    const query = useQuery()
    const tour_name = query.get('name')
    const fetchTeams = async() => {
      try {
        const data = await getAllRegistrationsByTournamentId(id)
        setTeams(data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    useEffect(() => {
      fetchTeams()
    },[])
    return (
        <ThemeProvider theme={defaultTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="xxl">
            <CssBaseline />
            <h1 style={{color:'white'}}>{tour_name||'Tournament Schedule'}</h1>
            <TournamentBracket teams={teams} />
        </Container>
        </div>
        </ThemeProvider>
    );
}

export default TournamentSchedule;
