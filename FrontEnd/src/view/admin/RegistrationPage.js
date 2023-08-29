import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  getAllRegistrationsByTournamentId,
  updateRegistration,
  bulkUpdateRegistrations,
} from "../../apis/registerAPI";
import { useParams } from "react-router-dom";
import tournamentAPI from "../../apis/tournamentAPI";
import NotificationModal from "../../component/NotificationModal";
const RegistrationPage = () => {
  // Dummy data for demonstration
  const [registrations, setRegistrations] = useState([]);
  const [tournament,setTournament] = useState({});
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });

  const fetchData = async () => {
    try {
      const data = await getAllRegistrationsByTournamentId(id);
      const tourData = await tournamentAPI.getTournamentById(id);
      setTournament(tourData.data)
      setRegistrations(data.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onChange = (index, field, value) => {
    console.log(registrations[index])

    const updatedRegistrations = [...registrations];
    updatedRegistrations[index] = {
      ...updatedRegistrations[index],
      [field]: value,
    };
    setRegistrations(updatedRegistrations);
  };
  const handleUpdate = async (index) => {
    console.log(registrations[index])
    try {
      const updatedRegistration = await updateRegistration(
        registrations[index].register_id,
        registrations[index]
      );
      fetchData();
      setNotification({
        title: 'Success',
        description: 'Successfully update Registration for the tournament.',
      });
    } catch (error) {
      setNotification({
        title: 'Failure',
        description: 'failed to update Registration for this tournament.',
      });
    } finally {
      setIsModalOpen(true);
    }
  };
  const startTournament = async () => {
    console.log("Start")
    const positions = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7]
    const regis_index = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]

    try {
      const updatedRegistrations = registrations.map((registration,index) => ({
        ...registration,
        status: "Competing",
        position: positions[index],
        index:regis_index[index]
      }));

      // Assuming you have an API function to bulk update registrations
      await bulkUpdateRegistrations(updatedRegistrations);
      await tournamentAPI.startTournament(id,{status:'Ongoing'})

      // Refresh the data
      fetchData();
    } catch (error) {
      console.error("Error starting the tournament:", error);
    }
  };

  return (
    <Container sx={{padding:'10px'}}>
      <h1>Registration Management</h1>
{tournament?.status ==="Pending" ?     <Button variant="contained" disabled={registrations.length !== 16} color="primary" sx={{margin:'5px'}} onClick={() => startTournament()}>
        Start Tournament
      </Button> : <></>}
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Register ID</TableCell>
              <TableCell>Team ID</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Tournament ID</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Fee Paid</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Round</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((row, index) => (
              <TableRow key={row.register_id}>
                <TableCell>{row.register_id}</TableCell>
                <TableCell>{row.team_id}</TableCell>
                <TableCell>{row.team_name}</TableCell>
                <TableCell>{row.tour_id}</TableCell>
                <TableCell>{row.registration_date}</TableCell>
                <TableCell>{row.fee_paid ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Select
                    value={row.status}
                    onChange={(e) => onChange(index, "status", e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Competing">Competing</MenuItem>
                    <MenuItem value="Eliminated">Eliminated</MenuItem>
                    <MenuItem value="Winner">Winner</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>
                  <Select
                    value={row.round}
                    onChange={(e) => onChange(index, "round", e.target.value)}
                  >
                    <MenuItem value="Pre-Quarterfinals">
                      Pre-Quarterfinals
                    </MenuItem>
                    <MenuItem value="Quarter-finals">Quarter-finals</MenuItem>
                    <MenuItem value="Semi-finals">Semi-finals</MenuItem>
                    <MenuItem value="Final">Final</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUpdate(index)}
                    variant="contained"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </Container>
  );
};

export default RegistrationPage;
