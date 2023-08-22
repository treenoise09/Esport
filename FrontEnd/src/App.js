import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//view
import Home from "./view/Home";
import SignUp from "./view/signup";
import SignIn from "./view/signin";
import Tournament from "./view/Tournament";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TournamentAdmin from "./view/admin/TournamentAdmin";
import CreateTeam from "./view/admin/CreateTeam";
import Match from "./view/admin/Match";
import MemberAdmin from "./view/admin/MemberAdmin";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import ScheduleMainPage from "./view/admin/ScheduleMainPage";

const useStyles = makeStyles({
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    color: "white",
  },
  formContainer: {
    padding: "20px",
    borderRadius: "10px",
    backgroundImage: "linear-gradient(45deg, #4a1a1c, #0f1849)",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Prompt",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#636574",
          borderRadius: "10px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#999aa3",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#636574",
          borderRadius: "10px",
        },
      },
    },
  },
});

//component

//admin

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.screenContainer}>
        <Container className={classes.formContainer}>


        <BrowserRouter>
          <Routes>
            //view
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/Tournament" element={<Tournament />} />
            // Admin routes nested under /admin
            <Route path="/admin">
              <Route path="Match" element={<Match />} />
              <Route path="Tournament" element={<TournamentAdmin />} />
              <Route path="Team/create" element={<CreateTeam />} />
              <Route path="Member" element={<MemberAdmin />} />
              <Route path="Shedule" element={<ScheduleMainPage/>}/>
            </Route>
          </Routes>
          
        </BrowserRouter>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
