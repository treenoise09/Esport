import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signup from "../../photo/signup.jpg";
import Breadcrumbs from "../../component/CustomBreadcrumbs";
import Footer from "../../component/Footer";
import memberAPI from "../../apis/memberAPI";
import { useParams } from "react-router-dom";
import { createRegistration } from "../../apis/registerAPI";
import TournamentDetail from "../../component/TournamentDetail";

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

export default function TournamentDetails() {
  const [hasTeam, setHasTeam] = React.useState(0); // Set to true if the user has a team
  const { id } = useParams();
  const isUserRegistered = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    createRegistration(hasTeam, id);
  };
  const fecthHasTeam = async () => {
    const res = await memberAPI.getMemberById(1);
    setHasTeam(res.team_id);
    console.log(hasTeam);
  };
  const fetchRegister = async () => {};

  React.useEffect(() => {
    fecthHasTeam();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Breadcrumbs
          pages={[
            { title: "Home", path: "/" },
            { title: "Tournament", path: "/Tournament" },
          ]}
        />

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
                  Tournament Details
                </Typography>
              </div>
              <Box>
              <TournamentDetail />
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                style={{ width: "70%" }}
              >
                {!hasTeam && (
                  <>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ marginTop: "10px" }}
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          href="/create-team"
                          sx={{
                            mt: 1,
                            mb: 2,
                            fontWeight: 600,
                          }}
                        >
                          Create a Team
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" color="error">
                      You can't register for the tournament without a team.
                      Please create a team first.
                    </Typography>
                  </>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!hasTeam} // Disable the button if the user doesn't have a team
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
              </Box>
            </div>
          </Box>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
