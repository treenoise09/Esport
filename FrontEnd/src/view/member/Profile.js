import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import MemberForm from "../../component/MemberForm";
import MemberAPI from "../../apis/memberAPI";
import uploadImage from "../../apis/commonAPI";
import defaultAvatar from "../../photo/User-avatar.svg.png";

export default function Profile() {
  const [members, setMembers] = useState({});
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchMember();
  }, []);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    await uploadImage(id, file,'member');
    handleClose();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, borderRadius: "10px", backgroundColor: "#4a1a1c" }}>
        <Typography component="h1" variant="h4" align="left" sx={{ color: "#ffffff" }}>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center",backgroundColor:"transparent" }}>
              <img src={members.image || defaultAvatar} alt="Profile" width={100} />
              <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
                Update Profile Picture
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} style={{ padding: "20px",backgroundColor:"transparent"  }}>
              <MemberForm key={members ? members.member_id : "create"} onSubmit={handleFormSubmit} initialData={members} />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>To update your profile picture, please select an image file.</DialogContentText>
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
