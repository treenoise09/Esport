import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/material'
import { useUser } from './UserContext';

import photo from '../photo/tk1.png';



export default function Appbar() {
    const user = useUser();
    console.log("User object:", user);
    return (
        <AppBar position="static"
            sx={{
                background: 'linear-gradient(45deg, #4a1a1c,#0f1849)',
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={photo}
                        width="50"
                        height="50"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: 1,
                        }}
                    >
                        Esports Management system
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        </IconButton>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginRight: 3,
                        }}
                    >

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Stack direction="row" spacing={1}>
                                {user.user != null ? (
                                    <Button
                                        color="inherit"
                                        variant="outlined"
                                        href={`/Profile/${user.user.memberId}`}  // Assuming the dashboard route for logged-in users
                                        sx={{
                                            bgcolor: '#FF8C00',
                                            color: '#000000',
                                            '&:hover': {
                                                bgcolor: '#B22222',
                                            },
                                        }}
                                    >
                                        {user.user.memberName}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            color="inherit"
                                            variant="outlined"
                                            href="/signin"
                                            sx={{
                                                bgcolor: '#FF8C00',
                                                color: '#000000',
                                                '&:hover': {
                                                    bgcolor: '#B22222',
                                                },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            color="inherit"
                                            variant="outlined"
                                            href="/signup"
                                            sx={{
                                                bgcolor: '#FF8C00',
                                                color: '#000000',
                                                '&:hover': {
                                                    bgcolor: '#B22222',
                                                },
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

