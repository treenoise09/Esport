import React, { useState } from "react";
import { Button, TextField, Container, Typography, Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import teamAPI from "../../apis/teamAPI";

const useStyles = makeStyles({
  formContainer: {
    padding: "20px",
    borderRadius: "10px",
    backgroundImage: "linear-gradient(45deg, #4a1a1c,#0f1849)",
  },
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // This will make the container take up the full screen height
    flexDirection: "column", // This will ensure the content remains in a column layout
    color:'white'
  },
});

const CreateTeam = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [team, setTeam] = useState({
    team_name: "",
    members: [""]
  });

  const handleChange = (e, index) => {
    if (e.target.name.startsWith("member")) {
      const updatedMembers = [...team.members];
      updatedMembers[index] = e.target.value;
      setTeam(prevState => ({ ...prevState, members: updatedMembers }));
    } else {
      setTeam({
        ...team,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addMemberField = () => {
    setTeam(prevState => ({ ...prevState, members: [...prevState.members, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    teamAPI.createTeam(team)
    .then(response => {
      console.log("Team created:", response);
    })
    .catch(error => {
      console.error("Error creating team:", error);
    });
  };

  return (
    <div className={classes.screenContainer}>
    <Container className={classes.formContainer}>
      <Typography variant="h4" gutterBottom>
        Create Team
      </Typography>
      <form onSubmit={handleSubmit}>
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
          <Grid item xs={12} style={{color:'#999aa3'}}>
            <IconButton onClick={addMemberField} style={{color:'#999aa3'}}>
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
    </Container>
    </div>
  );
};

export default CreateTeam;
