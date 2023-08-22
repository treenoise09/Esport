import React, { useState, useEffect } from "react";
import TournamentAPI from "../../apis/tournamentAPI";
import TournamentForm from "../../component/TournamentForm";
import TournamentList from "../../component/TournamentList";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    formContainer: {
      padding: "20px",
      borderRadius: "10px",
      backgroundImage: "linear-gradient(45deg, #4a1a1c, #0f1849)",
    },
    screenContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      color: "white",
    },
});
function extractDateForInput(dateString) {
  return dateString.split('T')[0]; // This will give you the YYYY-MM-DD format
}

function TournamentAdmin() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const classes = useStyles();
  
  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const data = await TournamentAPI.getAllTournaments();
      

      setTournaments(data.data.map(data => {
        data.start_date = extractDateForInput(data.start_date)
        data.end_date = extractDateForInput(data.end_date)
        return data
      }));
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (selectedTournament) {
      try {
        await TournamentAPI.updateTournament(selectedTournament.tour_id, formData);
        fetchTournaments();
        setSelectedTournament(null);
      } catch (error) {
        console.error("Failed to update tournament:", error);
      }
    } else {
      try {
        await TournamentAPI.createTournament(formData);
        fetchTournaments();
      } catch (error) {
        console.error("Failed to create tournament:", error);
      }
    }
  };

  const handleDelete = async (tournamentId) => {
    try {
      await TournamentAPI.deleteTournament(tournamentId);
      fetchTournaments();
    } catch (error) {
      console.error("Failed to delete tournament:", error);
    }
  };

  return (
    <div className={classes.screenContainer}>
      <Container className={classes.formContainer}>
        <h1>Tournament CRUD</h1>
        <TournamentForm key={selectedTournament ? selectedTournament.tour_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedTournament} />
        <TournamentList
          tournaments={tournaments}
          onDelete={handleDelete}
          onEdit={setSelectedTournament}
        />
      </Container>
    </div>
  );
}

export default TournamentAdmin;
