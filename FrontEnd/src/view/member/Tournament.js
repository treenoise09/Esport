import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';

import { Link } from "react-router-dom";

import photo from "../../photo/aov2.png";
import Breadcrumbs from "../../component/CustomBreadcrumbs";
import tournamentAPI from "../../apis/tournamentAPI";

const theme = createTheme();

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  function extractDateForInput(dateString) {
    const date = new Date(dateString.split('T')[0])
    const result = date.toLocaleDateString('th-TH',{
      year:'2-digit',
      month:"short",
      day:'2-digit'
    })
    return result;
  }
  
  useEffect(() => {
    // Replace with your actual API endpoint
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const data = await tournamentAPI.getAllTournaments();
      setTournaments(data.data.map(data => {
        data.start_date = extractDateForInput(data.start_date)
        data.regis_end = extractDateForInput(data.regis_end)
        data.end_date = extractDateForInput(data.end_date)
        return data
        
      }
      ));
    } catch (error) {
      console.error("Failed to fetch tournaments", error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
     <main style={{padding:'10%'}}>
        <Container fixed>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: 1600 }}>
            {tournaments?.map((tournament) => (
              <Card key={tournament.tour_id} sx={{ width: 300, position: 'relative' }}>

                <CardMedia
                  component="img"
                  height="140"
                  // image={tournament.game_name || photo}
                  image={photo}
                  alt={tournament.tour_name}
                />
                <CardContent sx={{opacity:'1.0'}}>
                  <Typography variant="h5" component="div">
                    {tournament.tour_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ระยะเวลาการแข่ง: {tournament.regis_end} - {tournament.end_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ระยะเวลาสมัคร: {`${tournament.start_date} - ${tournament.regis_end}`}
                  </Typography>
                </CardContent>
                <Box
                  component={Link}
                  to={`/member/Tournament/${tournament.tour_id}`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                ></Box>
              </Card>
            ))}
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
