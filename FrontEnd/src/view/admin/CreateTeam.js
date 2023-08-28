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
import NotificationModal from "../../component/NotificationModal";

const CreateTeam = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });


  const [team, setTeam] = useState({
    team_name: "",
    members: [""],
  });

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
        console.log("Team created:", response);
        setNotification({
          title: 'Success',
          description: 'Successfully created the team.',
        });
      })
      .catch((error) => {
        setNotification({
          title: 'Failure',
          description: 'Could not create the team.',
        });
      })
      .finally(() => {
        setIsModalOpen(true);
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
              label={`Member ${index + 1} Username`}
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
          {!isTeamValid && (
            <Typography color="error">
              Need at least six members to create a team.
            </Typography>
          )}
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
        </Grid>
      </Grid>
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </form>
  );
};

export default CreateTeam;
