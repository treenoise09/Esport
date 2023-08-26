import React, { useState, useEffect } from "react";
import MatchAPI from "../../apis/matchAPI";
import MatchForm from "../../component/MatchForm";
import MatchList from "../../component/MatchList";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
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
      } catch (error) {
        console.error("Failed to update match:", error);
      }
    } else {
      // Create new match
      try {
        await MatchAPI.createMatch(formData);
        fetchMatches();
      } catch (error) {
        console.error("Failed to create match:", error);
      }
    }
  };

  const handleDelete = async (matchId) => {
    try {
      await MatchAPI.deleteMatch(matchId);
      fetchMatches();
    } catch (error) {
      console.error("Failed to delete match:", error);
    }
  };

  return (
      <div>
        <h1>Match CRUD</h1>
        <MatchForm key={selectedMatch ? selectedMatch.match_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedMatch} />
        <MatchList
          matches={matches}
          onDelete={handleDelete}
          onEdit={setSelectedMatch}
        />
      </div>
  );
}

export default Match;
