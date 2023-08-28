import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography, Box, Tooltip } from "@mui/material";
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
  matchInfo,
}) {
  const classes = useStyles();
  return (
    <Tooltip
      title={`Start Time: ${matchInfo.startTime || "N/A"}, Location: ${
        matchInfo.location || "N/A"
      }`}
      arrow
    >
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
    </Tooltip>
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
  ).map((team => JSON.parse(JSON.stringify(team))));
  const quarterTeams = teams.filter(
    (team) =>
      teamToRound[team.team_name] === "Quarter-finals" ||
      teamToRound[team.team_name] === "Semi-finals" ||
      teamToRound[team.team_name] === "Final"
  ).map((team => JSON.parse(JSON.stringify(team)))).map((val) => {
    console.log(val)
    val.oldPosition = val.position
    if (val.position === 7 || val.position === 6) {val.position = 3}
    else if (val.position === 5 || val.position === 4) {val.position = 2}
    else if  (val.position === 3 || val.position === 2) {val.position = 1}
    else if  (val.position === 1 || val.position === 0) {val.position = 0}
    return val
  });
  const semiTeams = teams.filter(
    (team) =>
      teamToRound[team.team_name] === "Semi-finals" ||
      teamToRound[team.team_name] === "Final"
  ).map((team => JSON.parse(JSON.stringify(team)))).map((val) => {
    console.log(val)
    val.oldPosition = val.position
     if  (val.position === 4 || val.position === 5 || val.position === 6 || val.position === 7) {val.position = 1}
    else if  (val.position === 1 || val.position === 0 || val.position === 3 || val.position === 2) {val.position = 0}
    return val
  });;
  const finalTeams = teams.filter(
    (team) => teamToRound[team.team_name] === "Final"
  ).map((team => JSON.parse(JSON.stringify(team))));
  const firstRoundGroups = [0, 1, 2, 3, 4, 5, 6, 7];
  const secondRoundGroups = [0, 1, 2, 3];
  const thirdRoundGroups = [0, 1];
  const customSort = (a, b) => {
    // Check if both oldPosition and position are 0 for a and b
    const aIsTop = a.oldPosition === 0 && a.position === 0;
    const bIsTop = b.oldPosition === 0 && b.position === 0;
  
    // If a should be at the top and b shouldn't, return -1
    if (aIsTop && !bIsTop) return -1;
  
    // If b should be at the top and a shouldn't, return 1
    if (bIsTop && !aIsTop) return 1;
  
    // Otherwise, sort by oldPosition
    return a.oldPosition - b.oldPosition;
  };
  return (
    <Grid container spacing={4}>
      {/* Round of 16 */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        {firstRoundGroups.map((group, idx) => {
          const team = preQuarterTeams.filter((val) => {
            return val.position === group;
          });
          const team1 = team.find(val => val.index === 0)
          const team2 = team.find(val => val.index === 1)
          return (
            <Match
              key={idx}
              matchInfo={{
                startTime: team1?.date_time,
                location: team1?.location,
              }}
              team1={team1 ? team1.team_name : "TBD"}
              team2={team2 ? team2.team_name : "TBD"}
              showConnectLine={idx % 2 === 0 && idx !== 8}
              showHorizontalBracket
              winner={
                team1 &&
                (team1.round === "Quarter-finals" ||
                  team1.round === "Semi-finals" ||
                  team1.round === "Final")
                  ? team1.team_name
                  : team2 &&
                    (team2.round === "Quarter-finals" ||
                      team2.round === "Semi-finals" ||
                      team2.round === "Final")
                  ? team2.team_name
                  : "N/A"
              }
            />
          );
        })}
      </Grid>

      {/* Quarter-finals */}
      <Grid item xs={3} style={{ paddingLeft: "60px" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100%"
        >
          {secondRoundGroups.map((group, idx) => {
          console.log("preQteam",quarterTeams)
            const team = quarterTeams.filter((val) => {
              return val.position === group;
            });
            
            var teamArray1 = team.filter(val => val.index === 0).sort(customSort)
            var teamArray2 = team.filter(val => val.index === 1).sort(customSort)
            console.log("Array1",teamArray1)
            console.log("Array1",teamArray2)
            var team1
            var team2 
            if(teamArray1.length > 1) {
              team1 = teamArray1[0]
              team2 = teamArray1[1]
            }else{
              team1 = team.sort(customSort)[0]
            }
            if(teamArray2.length > 1) {
              team1 = teamArray2[0]
              team2 = teamArray2[1]
            }else{
              team2 = team.sort(customSort)[1]
            }
            console.log(team)
            return (
              <>
                {idx !== 0 && <BlankSpace />}
                <Match
                  key={idx}
                  matchInfo={{
                    startTime: team1?.date_time,
                    location: team1?.location,
                  }}
                  team1={team1 ? team1.team_name : "TBD"}
                  team2={team2 ? team2.team_name : "TBD"}
                  showHorizontalBracket
                  startHorizontalBracket
                  showQuaterLine={group === 0 || group === 2}
                  winner={
                    team1 &&
                    (team1.round === "Semi-finals" ||
                      team1.round === "Final")
                      ? team1.team_name
                      : team2 &&
                        (team2.round === "Semi-finals" ||
                          team2.round === "Final")
                      ? team2.team_name
                      : "N/A"
                  }
                />
              </>
            );
          })}
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
          {thirdRoundGroups.map((group, idx) => {
            const team = semiTeams.filter((val) => {
              if (val.position >= 2) val.position = 2
              return val.position === group;
            });
            var teamArray1 = team.filter(val => val.index === 0).sort(customSort)
            var teamArray2 = team.filter(val => val.index === 1).sort(customSort)
            console.log("Array1",teamArray1)
            console.log("Array1",teamArray2)
            var team1
            var team2 
            if(teamArray1.length > 1) {
              team1 = teamArray1[0]
              team2 = teamArray1[1]
            }else{
              team1 = team.sort(customSort)[0]
            }
            if(teamArray2.length > 1) {
              team1 = teamArray2[0]
              team2 = teamArray2[1]
            }else{
              team2 = team.sort(customSort)[1]
            }
            return (
              <>
                {idx === 1 && (
                  <>
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                  </>
                )}
                <Match
                  matchInfo={{
                    startTime: team[0]?.date_time,
                    location: team[0]?.location,
                  }}
                  team1={team[0] ? team[0].team_name : "TBD"}
                  team2={team[1] ? team[1].team_name : "TBD"}
                  showHorizontalBracket
                  startHorizontalBracket
                  winner={
                    team[0] && team[0].round === "Final"
                      ? team[0].team_name
                      : team[1] && team[1].round === "Final"
                      ? team[1].team_name
                      : "N/A"
                  }
                />
              </>
            );
          })}
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
            matchInfo={{
              startTime: finalTeams[1]?.date_time,
              location: finalTeams[1]?.location,
            }}
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
