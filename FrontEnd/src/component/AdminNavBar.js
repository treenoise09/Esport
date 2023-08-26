import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function AdminNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit">
          <Link to="/admin/Match" style={{ textDecoration: 'none', color: 'white' }}>
            Match
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin/Tournament" style={{ textDecoration: 'none', color: 'white' }}>
            Tournament
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin/Team/create" style={{ textDecoration: 'none', color: 'white' }}>
            Create Team
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin/Member" style={{ textDecoration: 'none', color: 'white' }}>
            Member
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/admin/Shedule" style={{ textDecoration: 'none', color: 'white' }}>
            Schedule
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavBar;
