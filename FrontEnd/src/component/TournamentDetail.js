import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tour from "../photo/Tournament.png";
import tournamentAPI from "../apis/tournamentAPI";
import { useParams } from "react-router-dom";
//Icon
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import sword from "../photo/sword.png";
import LanguageIcon from "@mui/icons-material/Language";

import Breadcrumbs from "../component/CustomBreadcrumbs";
import Footer from "../component/Footer";
import { height } from "@mui/system";

const defaultTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-image: linear-gradient(to right, #24252b, #2c334f);
        }
      `,
    },
  },
});

export default function TournamentDetail({ setTournamentData }) {
  const [tournamentDetails, setTournamentDetails] = useState({
    data: {
      win_condition: "",
      type: "",
      start_date: "",
      regis_end: "",
      end_date: "",
    },
  });
  function extractDateForInput(dateString) {
    const date = new Date(dateString.split('T')[0])
    const result = date.toLocaleDateString('th-TH',{
      year:'2-digit',
      month:"short",
      day:'2-digit'
    })
    return result;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const { id } = useParams(); // Extracting ID from the URL

  useEffect(() => {
    // Assuming `getTournamentById` is a function that fetches tournament by ID
    getTournamentById(id);
  }, [id]);

  const getTournamentById = async (id) => {
    try {
      const data = await tournamentAPI.getTournamentById(id);
      setTournamentDetails(data);
      console.log("Received Data:", data);
    } catch (error) {
      console.log("Fetching data...");
      console.error("Failed to fetch tournament: ", error);
      setTournamentDetails("error");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Container component="main" maxWidth="xl" style={{ flex: 1 }}>
          <CssBaseline />

          
            <div style={{ 
              flex: '1', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '20px' ,
            borderRadius: '10px'
            }}>

              <div style={{ width: '100%' }}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="left"
                  sx={{
                    color: '#ffffff'
                  }}>
                  Details
                </Typography>
              </div>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <div style={{ backgroundColor: '#000', borderRadius: '20px', height: '100%', width: '100%', padding:'5px'}}>
                  <Grid container spacing={2}>

                    <Grid item xs={2}>
                      <GroupsIcon fontSize="inherit" style={{ color: '#fff', fontSize: '24px' }} />
                    </Grid>
                    <Grid item xs={10}>
                      {/* Details for GroupsIcon */}
                      <div style={{ color: '#FF8C00' }}>- รับสมัครจำนวน 16 ทีม</div>
                    </Grid>
                    <Grid item xs={2}>
                      <svg
                        width="24px"
                        height="24px"
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <metadata>
                          Created by potrace 1.16, written by Peter Selinger 2001-2019
                        </metadata>
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="#fff" stroke="none">
                          <path d="M29 5091 l-29 -29 0 -389 0 -388 862 -862 863 -863 -250 -250 -250
-250 -195 195 -196 195 -54 0 -55 0 -252 -253 -253 -252 0 -46 c0 -63 16 -82
279 -344 l221 -220 -360 -360 -360 -361 0 -54 0 -55 253 -252 252 -253 55 0
54 0 361 360 360 360 220 -221 c262 -263 281 -279 344 -279 l46 0 252 253 253
252 0 54 0 54 -195 196 -195 197 250 249 250 250 250 -250 250 -250 -195 -195
-195 -196 0 -54 0 -55 253 -252 252 -253 46 0 c63 0 82 16 344 279 l220 221
360 -360 361 -360 54 0 55 0 252 253 253 252 0 55 0 54 -360 361 -360 360 221
220 c263 262 279 281 279 344 l0 46 -253 252 -252 253 -55 0 -54 0 -196 -195
-195 -195 -250 250 -250 250 863 863 862 862 0 388 0 389 -29 29 -29 29 -389
0 -388 0 -862 -862 -863 -863 -863 863 -862 862 -388 0 -389 0 -29 -29z m1543
-1028 l838 -838 -257 -257 -258 -258 -837 837 -838 838 0 251 c0 138 3 254 7
257 3 4 119 7 257 7 l251 0 837 -837z m3326 577 l2 -255 -1505 -1505 -1505
-1505 -257 258 -258 257 1505 1505 1505 1505 255 -2 255 -3 3 -255z m-1411
-3007 l-257 -258 -260 260 -260 260 257 257 258 258 260 -260 260 -260 -258
-257z m-2002 -153 l700 -700 -148 -147 -147 -148 -702 702 -703 703 145 145
c80 80 147 145 150 145 3 0 320 -315 705 -700z m3005 555 l145 -145 -703 -703
-702 -702 -147 148 -148 147 700 700 c385 385 702 700 705 700 3 0 70 -65 150
-145z m-3450 -1000 l145 -145 -310 -310 c-170 -171 -314 -310 -320 -310 -13 0
-285 272 -285 285 0 10 610 625 620 625 3 0 70 -65 150 -145z m3502 -162 c170
-170 308 -312 308 -318 0 -6 -64 -74 -143 -153 l-142 -142 -315 315 -315 315
145 145 c80 80 147 145 150 145 3 0 143 -138 312 -307z"
                        />
                      </g>
                    </svg>
                  </Grid>
                  <Grid item xs={10}>
                    {/* Details for the SVG Icon */}
                    <div style={{ color: "#FF8C00" }}>
                      - แข่งขันแบบ {tournamentDetails.data.win_condition} 5
                      ผู้เล่น / ทีม + ตัวสำรองมากที่สุด 1 คน
                    </div>
                  </Grid>

                  <Grid item xs={2}>
                    <LanguageIcon
                      fontSize="inherit"
                      style={{ color: "#fff", fontSize: "24px" }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {/* Details for LanguageIcon */}
                    <div style={{ color: "#FF8C00" }}>
                      - ทำการแข่งขันแบบ {tournamentDetails.data.type}
                    </div>
                  </Grid>

                  <Grid item xs={2}>
                    <CalendarMonthIcon
                      fontSize="inherit"
                      style={{ color: "#fff", fontSize: "24px" }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    {/* Details for CalendarMonthIcon */}

                    <div style={{ color: "#FF8C00" }}>
                      - รับสมัคร : {extractDateForInput(tournamentDetails.data.start_date)} -{" "}
                      {extractDateForInput(tournamentDetails.data.regis_end)}
                    </div>
                  </Grid>

                    <Grid item xs={2}>
                      <CalendarMonthIcon fontSize="inherit" style={{ color: '#fff', fontSize: '24px' }} />
                    </Grid>
                    <Grid item xs={10}>
                      {/* Details for CalendarMonthIcon */}
                      <div style={{ color: '#FF8C00' }}>- เริ่มทำการแข่งขัน : {extractDateForInput(tournamentDetails.data.end_date)}</div>
                    </Grid>

                  </Grid>
                </div>
              </Box>
            </div>

        </Container>
      </div>
    </ThemeProvider>
  );
}
