import React, { useState, useEffect } from "react";
import MatchAPI from "../../apis/matchAPI";
import MatchForm from "../../component/MatchForm";
import MatchList from "../../component/MatchList";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import NotificationModal from "../../component/NotificationModal";
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
      color: "white",
    },
  });

function Match() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const classes = useStyles();
  
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await MatchAPI.getAllMatches();
      setMatches(data.data);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (selectedMatch) {
      // Update existing match
      try {
        await MatchAPI.updateMatch(selectedMatch.match_id, formData);
        fetchMatches();
        setSelectedMatch(null);
        setNotification({
          title: 'Success',
          description: 'Successfully update Match for the tournament.',
        });
      } catch (error) {
        setNotification({
          title: 'Failure',
          description: 'failed to update Match for this tournament.',
        });
      } finally {
        setIsModalOpen(true);
      }
    } else {
      // Create new match
      try {
        await MatchAPI.createMatch(formData);
        fetchMatches();
        setNotification({
          title: 'Success',
          description: 'Successfully create Match for the tournament.',
        });
      } catch (error) {
        setNotification({
          title: 'Failure',
          description: 'failed to create Match for this tournament.',
        });
      } finally {
        setIsModalOpen(true);
      }
    };
  };

  const handleDelete = async (matchId) => {
    try {
      await MatchAPI.deleteMatch(matchId);
      fetchMatches();setNotification({
        title: 'Success',
        description: 'Successfully deleteMatch for the tournament.',
      });
    } catch (error) {
      setNotification({
        title: 'Failure',
        description: 'failed to deleteMatch for this tournament.',
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
      <div style={{padding:'10px'}}>
        <h1>Match Manager</h1>
        <MatchForm key={selectedMatch ? selectedMatch.match_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedMatch} />
        <MatchList
          matches={matches}
          onDelete={handleDelete}
          onEdit={setSelectedMatch}
        />
        <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
      </div>
  );
}

export default Match;
