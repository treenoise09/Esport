import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signup from '../photo/signup.jpg';

import Breadcrumbs from '../component/CustomBreadcrumbs';
import Footer from '../component/Footer';


// TODO remove, this demo shouldn't need to reset the theme.

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



export default function TournamentDetails() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (


<ThemeProvider theme={defaultTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Breadcrumbs
                    pages={[
                        { title: "Home", path: "/" },
                        { title: "Tournament", path: "/Tournament" },
                    ]}
                />
                
                <Container component="main" maxWidth="xl" style={{ flex: 1 }}>
                    <CssBaseline />
        

        <Box
  sx={{
    display: 'flex',
    marginTop: 8,
    backgroundImage: 'linear-gradient(45deg, #4a1a1c,#0f1849)', 
    borderRadius: '10px', 
  }}
>
          <div style={{flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={signup} alt="description" style={{flex: '1', height: '100%', maxWidth: '100%',borderRadius:'10px'}} />
</div>
<div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding:'20px'}}>

<div style={{ width: '100%'}}>
              <Typography
                component="h1"
                variant="h4"
                align="left"
                paddingLeft="15%"
                sx={{
                  color: '#ffffff'
                }}>
            Details
          </Typography>
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} style={{width:'70%'}}>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                fontWeight: 600,
                backgroundColor: '#FF8C00',
                '&:hover': {
                  bgcolor: '#B22222',
                },
              }}

            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2" sx={{ color: '#fff', textDecoration: 'none' }}>
                {"Already have an account? "}
                <span style={{ textDecoration: 'underline',color:'#FF8C00' }}>
                   Sign in
                   </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
          </div>
        </Box>

      </Container>
      <Footer/>
      </div>
    </ThemeProvider>
  );
}