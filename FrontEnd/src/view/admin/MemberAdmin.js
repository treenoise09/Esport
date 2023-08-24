import React, { useState, useEffect } from "react";
import MemberAPI from "../../apis/memberAPI";
import MemberForm from "../../component/MemberForm";
import MemberList from "../../component/MemberList";
import { Container } from "@mui/material";

function MemberAdmin() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);
  function extractDateForInput(dateString) {
    return dateString.split('T')[0]; // This will give you the YYYY-MM-DD format
  }
  const fetchMembers = async () => {
    try {
      const response = await MemberAPI.getAllMembers();
      setMembers(response.data.map(data => {
        data.date_of_birth = extractDateForInput(data.date_of_birth)
        return data
      }));
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
      try {
        await MemberAPI.updateMember(selectedMember.member_id, formData);
        fetchMembers();
        setSelectedMember(null);
      } catch (error) {
        console.error("Failed to update member:", error);
      }
  };

  const handleDelete = async (memberId) => {
    try {
      await MemberAPI.deleteMember(memberId);
      fetchMembers();
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  return (
    <Container>
      <h1>Member Admin</h1>
      <MemberForm key={selectedMember ? selectedMember.member_id : 'create'} onSubmit={handleFormSubmit} initialData={selectedMember} isAdmin={true} />
      <MemberList
        members={members}
        onEdit={setSelectedMember}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default MemberAdmin;
