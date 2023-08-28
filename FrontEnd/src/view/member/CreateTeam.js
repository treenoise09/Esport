import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import teamAPI from "../../apis/teamAPI";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const [team, setTeam] = useState({
    team_name: "",
    members: [""],
  });
  const navigate = useNavigate()
  const isTeamValid = team.members.length >= 6;
  const handleChange = (e, index) => {
    if (e.target.name.startsWith("member")) {
      const updatedMembers = [...team.members];
      updatedMembers[index] = e.target.value;
      setTeam((prevState) => ({ ...prevState, members: updatedMembers }));
    } else {
      setTeam({
        ...team,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addMemberField = () => {
    setTeam((prevState) => ({
      ...prevState,
      members: [...prevState.members, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    teamAPI
      .createTeam(team)
      .then((response) => {
        navigate("/member/tournament")
        console.log("Team created:", response);
      })
      .catch((error) => {
        console.error("Error creating team:", error);
      });
  };

  return (
    <Container component="main" maxWidth="md" style={{ flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 8,
          backgroundImage: "linear-gradient(45deg, #4a1a1c,#0f1849)",
          borderRadius: "10px",
          padding: "25px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Create Team
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Team Name"
                variant="outlined"
                name="team_name"
                value={team.team_name}
                onChange={handleChange}
                required
              />
            </Grid>
            {team.members.map((member, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label={`Member ${index + 1}`}
                  variant="outlined"
                  name={`member${index}`}
                  value={member}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Grid>
            ))}
            <Grid item xs={12} style={{ color: "#999aa3" }}>
              <IconButton
                onClick={addMemberField}
                style={{ color: "#999aa3", fontSize: "20px" }}
              >
                <AddCircleOutlineIcon />
                Add Member
              </IconButton>
            </Grid>
            <Grid item xs={12}>
            {!isTeamValid && (
            <Typography color="error">
              Need at least six members to create a team.
            </Typography>
          )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end", // Align items to the end (right)
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isTeamValid}
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
                  Create Team
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Team;
