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
import Footer from "./component/Footer";
import { AppBar } from "@mui/material";
import CustomBreadcrumbs from "./component/CustomBreadcrumbs";
import TournamentDetails from "./view/TournamentDetails";
import TournamentSchedule from "./view/TournamentSchedule";

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
function AdminRoutes() {
  const classes = useStyles();
  return (
    <div className={classes.screenContainer}>
      <Container className={classes.formContainer}>
        <Routes>
          <Route path="Match" element={<Match />} />
          <Route path="Tournament" element={<TournamentAdmin />} />
          <Route path="Team/create" element={<CreateTeam />} />
          <Route path="Member" element={<MemberAdmin />} />
          <Route path="Shedule" element={<ScheduleMainPage />} />
        </Routes>
      </Container>
    </div>
  );
}
function MemberRoute() {
  return (
        <Routes>
          <Route path="/Tournament" element={<Tournament />} />
        </Routes>
  );
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          //view
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/Tournament" element={<Tournament />} />
          <Route path="/TournamentDetails" element={<TournamentDetails />} />
        <Route path="/TournamentSchedule" element={<TournamentSchedule />}/>
          // Admin routes nested under /admin
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/member/*" element={<MemberRoute />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
