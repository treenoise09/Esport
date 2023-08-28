import React, { useState, useEffect } from "react";
import TournamentAPI from "../../apis/tournamentAPI";
import TournamentForm from "../../component/TournamentForm";
import TournamentList from "../../component/TournamentList";
import uploadImage from "../../apis/commonAPI";
import NotificationModal from "../../component/NotificationModal";
function extractDateForInput(dateString) {
  return dateString.split("T")[0]; // This will give you the YYYY-MM-DD format
}

function TournamentAdmin() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const data = await TournamentAPI.getAllTournaments();

      setTournaments(
        data.data.map((data) => {
          data.start_date = extractDateForInput(data.start_date);
          data.end_date = extractDateForInput(data.end_date);
          data.regis_end = extractDateForInput(data.regis_end);
          return data;
        })
      );
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
    }
  };

  const handleFormSubmit = async (formData, image) => {
    if (selectedTournament) {
      try {
        await TournamentAPI.updateTournament(
          selectedTournament.tour_id,
          formData
        );
        fetchTournaments();
        setSelectedTournament(null);
        await uploadImage(selectedTournament.tour_id, image, "tournament");
        setNotification({
          title: 'Success',
          description: 'Successfully updateTournament.',
        });
      } catch (error) {
        setNotification({
          title: 'Failure',
          description: 'failed to updateTournament.',
        });
      } finally {
        setIsModalOpen(true);
      }
    } else {
      try {
        await TournamentAPI.createTournament(formData).then(async(res) => {
          console.log(res)
          await uploadImage(res.data.insertId, image, "tournament");
        });
        fetchTournaments();
        setNotification({
          title: 'Success',
          description: 'Successfully createTournament.',
        });
      } catch (error) {
        setNotification({
          title: 'Failure',
          description: 'failed to createTournament.',
        });
        console.log(error)
      } finally {
        setIsModalOpen(true);
      }
    };
  };

  const handleDelete = async (tournamentId) => {
    try {
      await TournamentAPI.deleteTournament(tournamentId);
      fetchTournaments();
      setNotification({
        title: 'Success',
        description: 'Successfully deleteTournament.',
      });
    } catch (error) {
      setNotification({
        title: 'Failure',
        description: 'failed to deleteTournament.',
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Tournament CRUD</h1>
      <TournamentForm
        key={selectedTournament ? selectedTournament.tour_id : "create"}
        onSubmit={handleFormSubmit}
        initialData={selectedTournament}
      />
      <TournamentList
        tournaments={tournaments}
        onDelete={handleDelete}
        onEdit={setSelectedTournament}
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

export default TournamentAdmin;
