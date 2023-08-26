import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import teamAPI from "../../apis/teamAPI";

const CreateTeam = () => {


  const [team, setTeam] = useState({
    team_name: "",
    members: [""],
  });

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
        console.log("Team created:", response);
      })
      .catch((error) => {
        console.error("Error creating team:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{padding:'10px'}}>
      <Typography variant="h4" gutterBottom>
        Create Team
      </Typography>
      <Grid container spacing={3}>
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
          <IconButton onClick={addMemberField} style={{ color: "#999aa3" }}>
            <AddCircleOutlineIcon />
          </IconButton>
          Add Member
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
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
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateTeam;
