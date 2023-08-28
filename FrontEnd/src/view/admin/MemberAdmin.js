import React, { useState, useEffect } from "react";
import MemberAPI from "../../apis/memberAPI";
import MemberForm from "../../component/MemberForm";
import MemberList from "../../component/MemberList";
import { Container } from "@mui/material";
import NotificationModal from "../../component/NotificationModal";
function MemberAdmin() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });
  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    try {
      const response = await MemberAPI.getAllMembers();
      setMembers(response.data);
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleFormSubmit = async (formData) => {
      try {
        await MemberAPI.updateMember(selectedMember.member_id, formData);
        fetchMembers();
        setSelectedMember(null);
        setNotification({
          title: 'Success',
          description: 'Successfully updateMember.',
        });
      } catch (error) {
        setNotification({
          title: 'Failure',
          description: 'Failed to updateMember.',
        });
      } finally {
        setIsModalOpen(true);
      }
    };

  const handleDelete = async (memberId) => {
    try {
      await MemberAPI.deleteMember(memberId);
      fetchMembers();setNotification({
        title: 'Success',
        description: 'Successfully deleteMember.',
      });
    } catch (error) {
      setNotification({
        title: 'Failure',
        description: 'Failed to deleteMember.',
      });
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <Container sx={{padding:'10px'}}>
      <h1>Member Management</h1>
      <MemberForm key={selectedMember ? selectedMember.member_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedMember} isAdmin={true} />
      <MemberList
        members={members}
        onEdit={setSelectedMember}
        onDelete={handleDelete}
      />
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </Container>
  );
}

export default MemberAdmin;
