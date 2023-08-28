import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signup from "../photo/signup.jpg";
import Breadcrumbs from "../component/CustomBreadcrumbs";
import Footer from "../component/Footer";
import Appbar from "../component/Appbar";
import memberAPI from './../apis/memberAPI';
import { Route } from "react-router-dom";
import { useState } from "react";
import NotificationModal from '../component/NotificationModal'; // Import the NotificationModal
import { useNavigate } from 'react-router-dom';  // For navigation

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



export default function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ title: '', description: '' });
  const navigate = useNavigate(); // For navigation
  const handleClose = () => {
    setIsModalOpen(false);
    if (notification.title === "Success") {
      navigate('/signin'); // Navigate to /signin when modal closes
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const memberData = {
      name: data.get("firstName"),
      lastName: data.get("lastName"),
      aka: data.get("aka"),
      age: data.get("age"),
      username: data.get("username"),
      password: data.get("password"),
      role:("USER"),
      team_id:(null)
    };
  
    console.log("Member Data:", memberData);
  
    try {
      const result = await memberAPI.registerMember(memberData);
      console.log("Member registered successfully:", result);
      setNotification({ title: 'Success', description: 'Member registered successfully.' });
      setIsModalOpen(true);
      // Rest of your code
    } catch (error) {
      console.error("Registration failed:", error);
      setNotification({ title: 'Error', description: 'Registration failed. Please try again.' });
      setIsModalOpen(true);
      // Rest of your code
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Appbar />
        <Container component="main" maxWidth="xl" style={{ flex: 1 }}>
          <CssBaseline />

          <Box
            sx={{
              display: "flex",
              marginTop: 8,
              backgroundImage: "linear-gradient(45deg, #4a1a1c,#0f1849)",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={signup}
                alt="description"
                style={{
                  flex: "1",
                  height: "100%",
                  maxWidth: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="left"
                  paddingLeft="15%"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  Sign up
                </Typography>
              </div>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                style={{ width: "70%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="aka"
                      label="AKA"
                      name="aka"
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      type="number" // กำหนดให้เป็นช่องกรอกตัวเลข
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                      autoComplete="new-password"
                      sx={{
                        backgroundColor: "#636574",
                        borderRadius: "10px",
                      }}
                      InputLabelProps={{
                        style: { color: "#999aa3" },
                      }}
                    />
                  </Grid>
                </Grid>
                <div style={{ color: "#fff" }}>
                  **รหัสผ่านจะต้องมีความยาว 8-16 ตัวอักษร คือ a-z, A-Z, 0-9
                  ผสมกัน**
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: 600,
                    backgroundColor: "#FF8C00",
                    "&:hover": {
                      bgcolor: "#B22222",
                    },
                  }}
                >
                  Register
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      href="/signin"
                      variant="body2"
                      sx={{ color: "#fff", textDecoration: "none" }}
                    >
                      {"Already have an account? "}
                      <span
                        style={{
                          textDecoration: "underline",
                          color: "#FF8C00",
                        }}
                      >
                        Sign in
                      </span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Box>
        </Container>
        <Footer />
      </div>
      <NotificationModal
        open={isModalOpen}
        onClose={handleClose}
        title={notification.title}
        description={notification.description}
      />
    </ThemeProvider>
  );
}
