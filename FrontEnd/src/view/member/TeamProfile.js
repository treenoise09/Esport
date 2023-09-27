import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import teamAPI from "../../apis/teamAPI";
import NotificationModal from "../../component/NotificationModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
  Container,
  Checkbox,
  Grid,
  TextField,
  Button
} from "@mui/material";
import { useUser } from "../../component/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function TeamMember({
  members,
  onDelete,
  onTeamLeadChange,
  currentTeamLeadId,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>AKA</TableCell>
            <TableCell>Team Lead</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.member_id}>
              <TableCell>{member.username}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.aka}</TableCell>
              <TableCell>
                <Checkbox
                  checked={member.member_id === currentTeamLeadId}
                  onChange={() => onTeamLeadChange(member.member_id)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(member.member_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function TeamProfile() {
  const [team, setTeam] = useState({});
  const [teamLeadId, setTeamLeadId] = useState(null); // Assume the team lead ID is available.
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [isLeader, setIsLeader] = useState(false);
  const [memberFields, setMemberFields] = useState([]);
  const [notification, setNotification] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    featchTeam();
  }, []);
  const featchTeam = async () => {
    try {
      const res = await teamAPI.getTeamById(id);
      setTeam(res.data.result);
      setMembers(res.data.members);
      setTeamLeadId(res.data.result.team_lead);
      setIsLeader(user.memberId === res.data.result.team_lead);
      console.log(user.memberId)
      console.log(res.data.result.team_lead)
      console.log(isLeader)
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };
  const addMemberField = () => {
    setMemberFields((prevFields) => [...prevFields, ""]);
  };
  const handleMemberNameChange = (index, value) => {
    const members = memberFields;
    members[index] = value;
    setMemberFields(members);
  };
  const checkLeader = () => {
    if (isLeader) return true;
    setNotification({
      title: "Failure",
      description: "Only team lead can modify team.",
    });
    setIsModalOpen(true);
    return false;
  };
  const handleTeamLeadChange = async (newTeamLeadId) => {
    if (!checkLeader()) return;
    var res;
    try {
        res = await teamAPI.updateTeam(
        id,
        { team_lead: newTeamLeadId },
        "?type=updateTeamLead"
      );
      setTeamLeadId(newTeamLeadId);
      setIsLeader(user.memberId === res.data.result.team_lead);
      setNotification({
        title: "Success",
        description: "Successfully updated team lead.",
      });
    } catch (error) {
      setNotification({
        title: "Failure",
        description: "Failed to update team lead.\n Error: "+res.message
      });
    } finally {
      setIsModalOpen(true);
    }
  };
  const handleDelete = async (memeberId) => {
    if (!checkLeader()) return;
    if (memeberId === user.memberId){
      setNotification({
        title: "Forbidden",
        description: "Remove Team lead from the team is forbidden",
      });
      setIsModalOpen(true);
      return
    }
    var res;
    try {
      res = await teamAPI.updateTeam(
        id,
        { memeber_id: memeberId },
        "?type=removeMember"
      );
      featchTeam();
      setNotification({
        title: "Success",
        description: "Successfully removed member from the team."
      });
    } catch (error) {
      setNotification({
        title: "Failure",
        description: "Failed to remove member from the team.\n Error: "+res.message
      });
    } finally {
      setIsModalOpen(true);
    }
  };
  const handleAddMembers = async () => {
    if (!checkLeader()) return; 
    var res;
    try {
       
      res = await teamAPI.updateTeam(id, { members: memberFields },'?type=addTeamMember');
        setNotification({
            title: "Success",
            description: "Members added successfully.",
        });
        featchTeam(); 
        setMemberFields([]); 
    } catch (error) {
        setNotification({
            title: "Failure",
            description: "Failed to add members.\n Error: "+res.message
        });
    } finally {
        setIsModalOpen(true);
    }
};
  return (
    <Container>
      <h1>{team.team_name}</h1>
      <TeamMember
        members={members}
        onDelete={handleDelete}
        currentTeamLeadId={teamLeadId}
        onTeamLeadChange={handleTeamLeadChange}
      />
      {memberFields.map((field, index) => (
        <Grid container spacing={3} key={field.id} marginTop={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Member Username"
              variant="outlined"
              value={field.username}
              onChange={(e) => handleMemberNameChange(index, e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12} style={{ color: "#999aa3", marginTop: "20px" }}>
        <IconButton
          onClick={addMemberField}
          style={{ color: "#999aa3", fontSize: "20px" }}
        >
          <AddCircleOutlineIcon />
          Add Member
        </IconButton>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMembers}
        style={{ marginTop: "20px" }}
        type="button"
      >
        Submit
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
