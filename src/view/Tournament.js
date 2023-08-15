import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import photo from '../photo/aov2.png';

import Breadcrumbs from '../component/CustomBreadcrumbs';




const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Breadcrumbs
        pages={[

          { title: "Home", path: "/" },
          { title: "Tournament", path: "/Tournament" },
        ]}
      />




      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 15,
            pb: 25,
            width: '100%',
            height: '100%',
          }}
        >

          <Container fixed>
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                marginTop: '5rem', // กำหนดระยะห่างด้านบน
              }}
            >


              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '1280px' }}>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '15%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '15%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '1%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '1280px' }}>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '15%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '15%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
                <Button
                  component={Link}
                  to="/other-page"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '100%',
                    paddingTop: '1%',
                    position: 'relative',
                    borderRadius: '20px',
                  }}
                >
                  <img
                    src={photo}
                    alt="icon"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                    }}
                  />
                </Button>
              </div>






            </Box>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
