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
import { useUser } from "./UserContext";

import photo from "../photo/tk1.png";
function MemberNavBar() {
  const { signOut, user } = useUser();
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: 1,
            }}
          >
            Esports Management system
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
              to="/member/Tournament"
              style={{ textDecoration: "none", color: "white" }}
            >
              Tournament
            </Link>
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            href={`/member/Profile/${user.memberId}`}
            sx={{
              bgcolor: "#FF8C00",
              color: "#000000",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
          >
            <Link
              to={"/member/Profile/" + user.memberId}
              style={{ textDecoration: "none", color: "white" }}
            >
              Profile
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
              onClick={signOut}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Out
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MemberNavBar;
