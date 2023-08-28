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
import memberAPI from "../../apis/memberAPI";
import { useParams } from "react-router-dom";
import { createRegistration } from "../../apis/registerAPI";
import TournamentDetail from "../../component/TournamentDetail";
import tournamentAPI from "../../apis/tournamentAPI";
import { useUser } from "../../component/UserContext";
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
  const [tournamentData, setTournamentData] = React.useState({
    data: {
      tour_name: "",
    },
  });

  const [hasTeam, setHasTeam] = React.useState(0); // Set to true if the user has a team
  const { id } = useParams();
  const { user } = useUser();
  const handleSubmit = (event) => {
    event.preventDefault();
    createRegistration(hasTeam, id);
  };
  const fecthHasTeam = async () => {
    const res = await memberAPI.getMemberById(user.memberId);
    setHasTeam(res.team_id);
    console.log(hasTeam);
  };

  React.useEffect(() => {
    fecthHasTeam();
    fetchTournamentById(id); // Function that updates tournamentData
  }, []);

  const fetchTournamentById = async (id) => {
    const data = await tournamentAPI.getTournamentById(id);
    setTournamentData(data);
    console.log("Received Data:", data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Container component="main" maxWidth="xl" style={{ flex: 1 }}>
          <CssBaseline />
          <div>
            <h1 style={{ color: "white" }}>{tournamentData.data.tour_name}</h1>
          </div>
          <Box
            sx={{
              display: "flex",
              marginTop: 8,
              backgroundImage: "linear-gradient(to right, #2f3137, #373d58)",
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
              <Box>
                <TournamentDetail setTournamentData={setTournamentData} />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  href={`/member/Schedule/${id}?name=${tournamentData.data.tour_name}`}
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: 600,
                    backgroundImage:
                      "linear-gradient(to right, #224db0, #3f3732)",
                    "&:hover": {
                      // Adjust the hover gradient or other styles if needed
                      backgroundImage:
                        "linear-gradient(to right, #1e439a, #332d29)",
                    },
                  }}
                >
                  Schedule
                </Button>
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
                          href="/member/create-team"
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!hasTeam} // Disable the button if the user doesn't have a team
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontWeight: 600,
                      backgroundImage:
                        "linear-gradient(to right, #224db0, #3f3732)",
                      "&:hover": {
                        // Adjust the hover gradient or other styles if needed
                        backgroundImage:
                          "linear-gradient(to right, #1e439a, #332d29)",
                      },
                    }}
                  >
                    Register
                  </Button>
                </div>
              </Box>
            </div>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
