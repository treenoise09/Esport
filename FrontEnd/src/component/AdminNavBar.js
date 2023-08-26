import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import photo from "../photo/tk1.png";
function AdminNavBar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #4a1a1c,#0f1849)",
      }}
    >
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          <img
            src={photo}
            width="50"
            height="50"
            sx={{ display: { xs: "none", md: "flex" } }}
          />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginRight: 3,
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Button
            color="inherit"
            variant="outlined"
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to="/admin/Match"
              style={{ textDecoration: "none", color: "white" }}
            >
              Match
            </Link>
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to="/admin/Tournament"
              style={{ textDecoration: "none", color: "white" }}
            >
              Tournament
            </Link>
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to="/admin/Team/create"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Team
            </Link>
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to="/admin/Member"
              style={{ textDecoration: "none", color: "white" }}
            >
              Member
            </Link>
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to="/admin/Shedule"
              style={{ textDecoration: "none", color: "white" }}
            >
              Schedule
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNavBar;
