import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signin from "../photo/signin.jpg";
import memberAPI from "./../apis/memberAPI";
import Breadcrumbs from "../component/CustomBreadcrumbs";
import Footer from "../component/Footer";
import Appbar from "../component/Appbar";

import { useNavigate } from "react-router-dom";
import { useUser } from "../component/UserContext";
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

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const memberData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      const result = await memberAPI.loginMember(memberData);
      setUser({
        memberId: result.data.member_id,
        memberName: result.data.name,
        member: result.data.aka,
        memberCreated_at: result.data.created_at,

        memberEmail: result.data.email,

        memberPassword: result.data.password,

        memberRole: result.data.role,

        memberTeam_id: result.data.team_id,

        memberUpdated_at: result.data.updated_at,

        memberUsername: result.data.username,
      });
      console.log("Login successful:", result);
      if (result.data.role === "ADMIN") {
        navigate("/admin/Tournament");
      } else {
        navigate("/member/Tournament");
      }
      // Navigate to another page or show success message
    } catch (error) {
      console.error("Login failed:", error);
      // Show error message
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
                src={signin}
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
                padding: "120px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="left"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  Sign in
                </Typography>
              </div>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{
                    backgroundColor: "#636574",
                    borderRadius: "10px",
                  }}
                  InputLabelProps={{
                    style: { color: "#999aa3" },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    backgroundColor: "#636574",
                    borderRadius: "10px",
                  }}
                  InputLabelProps={{
                    style: { color: "#999aa3" },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  fontWeight="100%"
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
                  Sign In
                </Button>
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      sx={{ color: "#fff", textDecoration: "none" }}
                    >
                      {"Don't have an account? "}
                      <span
                        style={{
                          textDecoration: "underline",
                          color: "#FF8C00",
                        }}
                      >
                        Sign Up
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
    </ThemeProvider>
  );
}
