import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography, Box } from "@mui/material";
const useStyles = makeStyles({
  teamItem: {
    backgroundColor: "#fff",
    padding: ".5rem",
    display: "block",
    margin: ".5rem 10px",
    position: "relative",
    verticalAlign: "middle",
    lineHeight: 2,
    textAlign: "center",
  },
  horizontalBracket: {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      borderTop: "2px solid #fff",
      width: "40px", // Adjust based on the desired width of the horizontal line
      right: "-40px",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  matchConnectLine: {
    "&:after": {
      content: '""',
      position: "absolute",
      borderRight: "2px solid #fff",
      height: "calc(100% + 17px)", // Adjust the height to span between matches.
      right: "-40px",
      zIndex: "-1",
      top: "50%",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      borderTop: "2px solid #fff",
      width: "40px", // Adjust based on the desired width of the horizontal line
      right: "-40px", // Move 40px to the left of the existing line, making the total 80px to the right
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  QuaterLine: {
    "&:after": {
      content: '""',
      position: "absolute",
      borderRight: "2px solid #fff",

      right: "-40px",
      zIndex: "-1",
      top: "50%",
    },
  },
  SemiLine: {
    "&:after": {
      content: '""',
      position: "absolute",
      borderRight: "2px solid #fff",
      height: "calc(100% + 335px)", // Adjust the height to span between matches.
      right: "-40px",
      zIndex: "-1",
      top: "50%",
    },
  }, // Add this to your useStyles
  finalHorizontalBracket: {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      borderTop: "2px solid #fff",
      width: "30px", // Adjust based on the desired width of the horizontal line
      left: "-20px", // Place the line to the left of the element to make it at the start
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  startHorizontalBracket: {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      borderTop: "2px solid #fff",
      width: "30px", // Adjust based on the desired width of the horizontal line
      left: "-20px", // Place the line to the left of the element to make it at the start
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
});
// Modify your Match component like this
function Match({
  team1,
  team2,
  showHorizontalBracket = false,
  showConnectLine = false,
  showQuaterLine = false,
  showSemiLine = false,
  finalHorizontalBracket = false,
  startHorizontalBracket = false, // Add this new prop
  winner,
}) {
  const classes = useStyles();
  return (
    <Box my={2} position="relative">
      {showConnectLine && (
        <Box position="absolute" className="someClassForVerticalLines" />
      )}
      {showQuaterLine && (
        <Box
          position="absolute"
          style={{
            content: '""',
            position: "absolute",
            borderRight: "2px solid #fff",
            height: "calc(100% + 108px)", // Adjust the height to span between matches.
            right: "-40px",
            zIndex: "-1",
            top: "50%",
          }}
        />
      )}
      {startHorizontalBracket && <Box position="absolute" style={{}} />}
      {finalHorizontalBracket && (
        <Box
          position="absolute"
          style={{
            height: "442px",
            borderLeft: "2px solid #fff",
            top: "-169px",
            left: "-20px",
          }}
        />
      )}

      <Box
        className={`
            ${showHorizontalBracket ? classes.horizontalBracket : ""}
            ${showConnectLine ? classes.matchConnectLine : ""}
            ${showQuaterLine ? classes.QuaterLine : ""}
            ${showSemiLine ? classes.SemiLine : ""}
            ${finalHorizontalBracket ? classes.finalHorizontalBracket : ""}
            ${startHorizontalBracket ? classes.startHorizontalBracket : ""}  
          `}
      >
        <Paper
          elevation={3}
          className={classes.teamItem}
          style={{
            backgroundColor: team1 === winner ? "#4CAF50" : "#515257",
            color: "#fff",
          }}
        >
          <Typography>{team1}</Typography>
        </Paper>
        <Paper
          elevation={3}
          className={classes.teamItem}
          style={{
            backgroundColor: team2 === winner ? "#4CAF50" : "#515257",
            color: "#fff",
          }}
        >
          <Typography>{team2}</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

function BlankSpace() {
  const classes = useStyles();

  return (
    <Box my={2} className={classes.blankSpace}>
      <Paper elevation={0} style={{ opacity: 0, padding: "10px" }}>
        <Typography>&nbsp;</Typography>
      </Paper>
    </Box>
  );
}

function TournamentBracket({ teams }) {
  if (teams.length !== 16) {
    return <Typography>Exactly 16 teams are required!</Typography>;
  }
  const teamToRound = {};
  teams.forEach((team) => {
    teamToRound[team.team_name] = team.round;
  });
  // Filter teams based on their furthest round
  const preQuarterTeams = teams.filter(
    (team) =>
      teamToRound[team.team_name] === "Pre-Quarterfinals" ||
      teamToRound[team.team_name] === "Quarter-finals" ||
      teamToRound[team.team_name] === "Semi-finals" ||
      teamToRound[team.team_name] === "Final"
  );
  const quarterTeams = teams.filter(
    (team) =>
      teamToRound[team.team_name] === "Quarter-finals" ||
      teamToRound[team.team_name] === "Semi-finals" ||
      teamToRound[team.team_name] === "Final"
  );
  const semiTeams = teams.filter(
    (team) =>
      teamToRound[team.team_name] === "Semi-finals" ||
      teamToRound[team.team_name] === "Final"
  );
  const finalTeams = teams.filter(
    (team) => teamToRound[team.team_name] === "Final"
  );
  return (
    <Grid container spacing={4}>
      {/* Round of 16 */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        {Array(8)
          .fill()
          .map((_, idx) => (
            <Match
              key={idx}
              team1={
                preQuarterTeams[idx] ? preQuarterTeams[idx].team_name : "TBD"
              }
              team2={
                preQuarterTeams[15 - idx]
                  ? preQuarterTeams[15 - idx].team_name
                  : "TBD"
              }
              showConnectLine={idx % 2 === 0 && idx !== 8}
              showHorizontalBracket
              winner={
                preQuarterTeams[idx] &&
                (preQuarterTeams[idx].round === "Quarter-finals" ||
                  preQuarterTeams[idx].round === "Semi-finals" ||
                  preQuarterTeams[idx].round === "Final")
                  ? preQuarterTeams[idx].team_name
                  : preQuarterTeams[15 - idx] &&
                    (preQuarterTeams[15 - idx].round === "Quarter-finals" ||
                      preQuarterTeams[15 - idx].round === "Semi-finals" ||
                      preQuarterTeams[15 - idx].round === "Final")
                  ? preQuarterTeams[15 - idx].team_name
                  : "N/A"
              }
            />
          ))}
      </Grid>

      {/* Quarter-finals */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
        >
          <Match
            key={0}
            team1={quarterTeams[0] ? quarterTeams[0].team_name : "TBD"}
            team2={quarterTeams[7] ? quarterTeams[7].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            showQuaterLine
            winner={
              quarterTeams[0] &&
              (quarterTeams[0].round === "Semi-finals" ||
                quarterTeams[0].round === "Final")
                ? quarterTeams[0].team_name
                : quarterTeams[7] &&
                  (quarterTeams[7].round === "Semi-finals" ||
                    quarterTeams[7].round === "Final")
                ? quarterTeams[7].team_name
                : "N/A"
            }
          />
          <BlankSpace />
          <Match
            key={1}
            team1={quarterTeams[1] ? quarterTeams[1].team_name : "TBD"}
            team2={quarterTeams[6] ? quarterTeams[6].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            winner={
              quarterTeams[1] &&
              (quarterTeams[1].round === "Semi-finals" ||
                quarterTeams[1].round === "Final")
                ? quarterTeams[1].team_name
                : quarterTeams[6] &&
                  (quarterTeams[6].round === "Semi-finals" ||
                    quarterTeams[6].round === "Final")
                ? quarterTeams[6].team_name
                : "N/A"
            }
          />
          <BlankSpace />
          <Match
            key={2}
            team1={quarterTeams[2] ? quarterTeams[2].team_name : "TBD"}
            team2={quarterTeams[4] ? quarterTeams[4].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            showQuaterLine
            winner={
              quarterTeams[2] &&
              (quarterTeams[2].round === "Semi-finals" ||
                quarterTeams[2].round === "Final")
                ? quarterTeams[2].team_name
                : quarterTeams[4] &&
                  (quarterTeams[4].round === "Semi-finals" ||
                    quarterTeams[4].round === "Final")
                ? quarterTeams[4].team_name
                : "N/A"
            }
          />
          <BlankSpace />
          <Match
            key={3}
            team1={quarterTeams[3] ? quarterTeams[3].team_name : "TBD"}
            team2={quarterTeams[5] ? quarterTeams[5].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            winner={
              quarterTeams[3] &&
              (quarterTeams[3].round === "Semi-finals" ||
                quarterTeams[3].round === "Final")
                ? quarterTeams[3].team_name
                : quarterTeams[5] &&
                  (quarterTeams[5].round === "Semi-finals" ||
                    quarterTeams[5].round === "Final")
                ? quarterTeams[5].team_name
                : "N/A"
            }
          />
        </Box>
      </Grid>

      {/* Semi-finals */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
        >
          <Match
            team1={semiTeams[0] ? semiTeams[0].team_name : "TBD"}
            team2={semiTeams[3] ? semiTeams[3].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            winner={
              semiTeams[0] && semiTeams[0].round === "Final"
                ? semiTeams[0].team_name
                : semiTeams[3] && semiTeams[3].round === "Final"
                ? semiTeams[3].team_name
                : "N/A"
            }
          />
          <BlankSpace />
          <BlankSpace />
          <BlankSpace />
          <BlankSpace />
          <Match
            team1={semiTeams[1] ? semiTeams[1].team_name : "TBD"}
            team2={semiTeams[2] ? semiTeams[2].team_name : "TBD"}
            showHorizontalBracket
            startHorizontalBracket
            winner={
              semiTeams[1] && semiTeams[1].round === "Final"
                ? semiTeams[1].team_name
                : semiTeams[2] && semiTeams[2].round === "Final"
                ? semiTeams[2].team_name
                : "N/A"
            }
            
          />
        </Box>
      </Grid>

      {/* Final */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
        >
          <Match
            team1={finalTeams[0] ? finalTeams[0].team_name : "TBD"}
            team2={finalTeams[1] ? finalTeams[1].team_name : "TBD"}
            winner={
              finalTeams[0] && finalTeams[0].status === "Winner"
                ? finalTeams[0].team_name
                : finalTeams[1] && finalTeams[1].status === "Winner"
                ? finalTeams[1].team_name
                : "N/A"
            }
            finalHorizontalBracket
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default TournamentBracket;
