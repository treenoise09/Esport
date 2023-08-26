import "./App.css";
import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//view
import Home from "./view/Home";
import SignUp from "./view/signup";
import SignIn from "./view/signin";
import Tournament from "./view/member/Tournament";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TournamentAdmin from "./view/admin/TournamentAdmin";
import CreateTeam from "./view/admin/CreateTeam";
import Match from "./view/admin/Match";
import MemberAdmin from "./view/admin/MemberAdmin";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import ScheduleMainPage from "./view/admin/ScheduleMainPage";
import Footer from "./component/Footer";
import { UserProvider,useUser } from "./component/UserContext";
import TournamentDetails from "./view/member/TournamentDetails";
import Profile from "./view/member/Profile";
import AdminNavBar from "./component/AdminNavBar";
import MemberNavBar from "./component/MemberNavBar";

const useStyles = makeStyles({
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",

  },
  formContainer: {
    margin:"20px",
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
      <AdminNavBar/>
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
  const classes = useStyles();
  return (
    <div className={classes.screenContainer}>
      <MemberNavBar/>
    <Container className={classes.formContainer}>
    <Routes>
      <Route path="/Tournament" element={<Tournament />} />
      <Route path="/Tournament/:id" element={<TournamentDetails />} />
      <Route path="/Profile/:id" element={<Profile />} />
    </Routes>
    </Container>
    </div>
  );
}
const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user || user.memberRole !== 'ADMIN') {
      // Redirect to home or login page if the user is not an admin
      navigate('/');
    }
  }, [user, navigate]);

  return user && user.memberRole === 'ADMIN' ? children : null;
};
const MemberGuard = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {

    if (!user) {
      navigate('/');
    }
    console.log(user)
  }, [user, navigate]);

  return user && user.memberRole === 'USER' ? children : null;
};

function App() {
  return (
    <UserProvider>
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <BrowserRouter>
          <Routes>
            //view
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            // Admin routes nested under /admin
            <Route path="/admin/*" element={<AdminGuard>
              <AdminRoutes/>
            </AdminGuard>} />
            <Route path="/member/*" element={<MemberGuard>
              <MemberRoute />
            </MemberGuard>} />
          </Routes>
        </BrowserRouter>
        <div style={{ flexGrow: 1 }}></div>
        <Footer />
      </div>
    </ThemeProvider>
    </UserProvider>
  );
}

export default App;
