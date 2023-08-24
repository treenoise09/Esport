import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberForm from "../../component/MemberForm";
import MemberAPI from "../../apis/memberAPI";
import { useParams } from "react-router-dom";
export default function Profile() {
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchMember();
  }, []);
  function extractDateForInput(dateString) {
    return dateString.split("T")[0]; // This will give you the YYYY-MM-DD format
  }
  const fetchMember = async () => {
    try {
      const response = await MemberAPI.getMemberById(id);
      setMembers(response);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await MemberAPI.updateMember(members.member_id, formData);
      fetchMember();
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };
  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        sx={{
          color: "#ffffff",
        }}
      >
       Profile
      </Typography>
      <MemberForm
        key={members ? members.member_id : "create"}
        onSubmit={handleFormSubmit}
        initialData={members}
      />
    </Container>
  );
}
