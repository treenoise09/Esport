import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function MemberNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Home
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
            Sign Up
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
            Sign In
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/Tournament" style={{ textDecoration: 'none', color: 'white' }}>
            Tournament
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/member" style={{ textDecoration: 'none', color: 'white' }}>
            Member
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MemberNavBar;
