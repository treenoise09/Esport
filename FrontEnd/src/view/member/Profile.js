import { Container } from "@mui/system";
import { Typography,Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberForm from "../../component/MemberForm";
import MemberAPI from "../../apis/memberAPI";
import { useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function Profile() {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false); // for modal state
  const [file, setFile] = useState(null); // for storing file

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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // Call your API to upload the blob here
    // Convert the file to blob and send it
    const formData = new FormData();
    formData.append('profilePicture', file);

    // Assuming uploadProfilePic is a method in your API to handle file upload
    // await MemberAPI.uploadProfilePic(formData);
    
    handleClose(); // Close modal
  };
  return (
    <Container component="main" maxWidth="sm" style={{ flex: 1 }}>

<Box
  sx={{
    display: "flex",
    flexDirection:"column",
    marginTop: 8,
    backgroundImage: "linear-gradient(45deg, #4a1a1c,#0f1849)",
    borderRadius: "10px",
  }}
>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        sx={{
          color: "#ffffff",
          padding:'5px'
        }}
      >
       Profile
      </Typography>
      <div style={{
  padding: '25px', 
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <div style={{
        padding: '25px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Add a button and image here to show and update the profile picture */}
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Update Profile Picture
        </Button>
        <img src={""} alt="Profile" width={100} />
      </div>
  <MemberForm
    key={members ? members.member_id : "create"}
    onSubmit={handleFormSubmit}
    initialData={members}
  />
</div>

      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your profile picture, please select an image file.
          </DialogContentText>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
