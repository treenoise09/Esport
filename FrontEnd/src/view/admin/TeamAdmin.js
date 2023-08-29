import React, { useState, useEffect } from "react";
import TeamForm from "../../component/TeamForm";
import TeamList from "../../component/TeanList";
import { Button, Container } from "@mui/material";
import NotificationModal from "../../component/NotificationModal";
import teamAPI from "../../apis/teamAPI";

function TeamAdmin() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamAPI.getAllTeams();
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedTeam) {
        await teamAPI.updateTeam(selectedTeam.team_id, formData);
        setNotification({
          title: "Success",
          description: "Successfully updated team.",
        });
      } else {
        await teamAPI.createTeam(formData);
        setNotification({
          title: "Success",
          description: "Successfully created team.",
        });
      }
      fetchTeams();
      setSelectedTeam(null);
    } catch (error) {
      setNotification({
        title: "Failure",
        description: "Failed to save team.",
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (teamId) => {
    try {
      await teamAPI.deleteTeam(teamId);
      fetchTeams();
      setNotification({
        title: "Success",
        description: "Successfully deleted team.",
      });
    } catch (error) {
      setNotification({
        title: "Failure",
        description: "Failed to delete team.",
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <Container>
      <h1>Team Management</h1>
      <TeamForm key={selectedTeam ? selectedTeam.team_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedTeam} />
      <TeamList
        teams={teams}
        onEdit={setSelectedTeam}
        onDelete={handleDelete}
      />
      <Button
        href="team/create"
        type="button"
        variant="contained"
        color="secondary"
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
        Creat Team
      </Button>
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </Container>
  );
}

export default TeamAdmin;
