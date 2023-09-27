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
import memberAPI from "../../apis/memberAPI";
import { useParams } from "react-router-dom";
import { createRegistration } from "../../apis/registerAPI";
import TournamentDetail from "../../component/TournamentDetail";
import tournamentAPI from "../../apis/tournamentAPI";
import { useUser } from "../../component/UserContext";
import NotificationModal from "../../component/NotificationModal";
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: "",
    description: "",
  });
  const [tournamentData, setTournamentData] = React.useState({
    data: {
      tour_name: "",
    },
  });

  const [hasTeam, setHasTeam] = React.useState(0); // Set to true if the user has a team
  const { id } = useParams();
  const { user } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createRegistration(hasTeam, id); // Assuming this returns a promise
      setNotification({
        title: "Success",
        description: "Successfully registered for the tournament.",
      });
    } catch (error) {
      setNotification({
        title: "Failure",
        description: "You are already registered for this tournament.",
      });
    } finally {
      setIsModalOpen(true);
    }
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
                src={tournamentData.data.image || signup}
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
                    <Typography variant="body2" color="error">
                      You can't register for the tournament without a team.
                      Please create a team first.
                    </Typography>
                  </>
                )}
                {tournamentData.data.status === "End" && (
                  <>
                    <Box
                      sx={{
                        background: "#ff8f8f", // A soft red background
                        color: "#800000", // Dark red font color
                        borderRadius: "5px",
                        padding: "1rem",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        margin: "1rem 0",
                      }}
                    >
                      <Typography variant="body2">
                        This tournament is completed
                      </Typography>
                    </Box>
                  </>
                )}
                <div
                  style={{
                    display:
                      tournamentData.data.status === "End" ? "none" : "flex",
                    justifyContent: "flex-end",
                  }}
                >
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
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </ThemeProvider>
  );
}
