import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  Box,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationModal from "./NotificationModal";
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
const styles = {
  helper: {
    color: "rgb(138, 39, 39)", // Darker color for the error text
    letterSpacing: "none",
  },
};
function TournamentForm({ onSubmit, initialData }) {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    description: '',
  });
  const [tournament, setTournament] = useState(
    initialData || {
      tour_name: "",
      tour_detail: "",
      start_date: "",
      end_date: "",
      team_number: "",
      win_condition: "",
      location: "",
      type: "Online",
      game_name: "",
    }
  );
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded image file
  const [isNewImg, setIsNewImg] = useState(false);
  const validateForm = () => {
    let tempErrors = {};

    if (tournament.tour_name.length < 3) {
      tempErrors.tour_name =
        "Tournament name must be at least 3 characters long";
        setNotification({
          title: 'Failure',
          description: 'Tournament name must be at least 3 characters long.',
        });
        setIsModalOpen(true);
    }
    if (!imageFile) {
      tempErrors["image"] = "Please upload a valid Image";
      setNotification({
      title: 'Failure',
      description: 'Please upload a valid Image.',
    });
    setIsModalOpen(true);
    }

    if (tournament.tour_detail.length < 10) {
      tempErrors.tour_detail =
        "Tournament detail must be at least 10 characters long";
        setNotification({
      title: 'Failure',
      description: 'Tournament detail must be at least 10 characters long.',
    });
    setIsModalOpen(true);
    }

    if (!tournament.start_date) {
      tempErrors.start_date = "Start date is required";
      setNotification({
      title: 'Failure',
      description: 'Start date is required.',
    });
    setIsModalOpen(true);
    }

    if (!tournament.end_date) {
      tempErrors.end_date = "End date is required";
      setNotification({
      title: 'Failure',
      description: 'End date is required.',
    });
    setIsModalOpen(true);
    }
    if (!tournament.win_condition) {
      tempErrors.win_condition = "Please select a win condition";
      setNotification({
      title: 'Failure',
      description: 'Please select a win condition.',
    });
    setIsModalOpen(true);
    }

    if (!tournament.location || tournament.location.length < 3) {
      tempErrors.location = "Location should be at least 3 characters long";
      setNotification({
      title: 'Failure',
      description: 'Location should be at least 3 characters long.',
    });
    setIsModalOpen(true);
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };
  const handleChange = (e) => {
    setTournament({
      ...tournament,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(tournament, imageFile);  // Make sure this returns a Promise
        // Handle other success actions, like redirecting
      } catch (error) {
        console.error("Error creating tournament:", error);
      }
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setIsNewImg(true);
  };
  const displayImage = () => {
    if (isNewImg && imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (tournament.image) {
      return tournament.image;
    }
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return ""; // or return a placeholder image URL
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#636574",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <InputLabel style={{ color: "#999aa3" }}>
              Tournament Logo
            </InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "10px" }}
            />
            <img src={displayImage()} alt="Preview" width={100} height={100} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tournament Name"
            variant="outlined"
            name="tour_name"
            error={Boolean(errors.tour_name)}
            helperText={errors.tour_name}
            value={tournament.tour_name}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
            }}
            required
            FormHelperTextProps={{ style: styles.helper }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="game-name-label" style={{ color: "#999aa3" }}>
              Game Name
            </InputLabel>
            <Select
              labelId="game-name-label"
              label="Game Name"
              name="game_name"
              value={tournament.game_name}
              onChange={handleChange}
              sx={{
                backgroundColor: "#636574",
                borderRadius: "10px",
              }}
            >
              <MenuItem value={"dota2"}>Dota 2</MenuItem>
              <MenuItem value={"rov"}>RoV</MenuItem>
              <MenuItem value={"valo"}>Valorant</MenuItem>
              {/* Add more games as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tournament Detail"
            variant="outlined"
            name="tour_detail"
            error={Boolean(errors.tour_detail)}
            helperText={errors.tour_detail}
            value={tournament.tour_detail}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
            }}
            required
            FormHelperTextProps={{ style: styles.helper }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            name="start_date"
            error={Boolean(errors.start_date)}
            helperText={errors.start_date}
            value={tournament.start_date}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
              shrink: true,
            }}
            required
            FormHelperTextProps={{ style: styles.helper }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            variant="outlined"
            name="end_date"
            error={Boolean(errors.end_date)}
            helperText={errors.end_date}
            value={tournament.end_date}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
              shrink: true,
            }}
            required
            FormHelperTextProps={{ style: styles.helper }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Register end date"
            type="date"
            variant="outlined"
            name="regis_end"
            error={Boolean(errors.regis_end)}
            helperText={errors.regis_end}
            value={tournament.regis_end}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
              shrink: true,
            }}
            required
            FormHelperTextProps={{ style: styles.helper }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            error={!!errors.win_condition}
            fullWidth
            variant="outlined"
          >
            <InputLabel style={{ color: "#999aa3" }}>Win Condition</InputLabel>
            <Select
              name="win_condition"
              value={tournament.win_condition}
              onChange={handleChange}
              sx={{
                backgroundColor: "#636574",
                borderRadius: "10px",
              }}
              InputLabelProps={{
                style: { color: "#999aa3" },
              }}
              label="Win Condition"
              required
            >
              <MenuItem value="Single Elimination">Single Elimination</MenuItem>
              {/* Add other conditions as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            name="location"
            value={tournament.location}
            onChange={handleChange}
            sx={{
              backgroundColor: "#636574",
              borderRadius: "10px",
            }}
            InputLabelProps={{
              style: { color: "#999aa3" },
            }}
            error={!!errors.location}
            helperText={errors.location}
            required
          />
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="game-name-label" style={{ color: "#999aa3" }}>
                Status
              </InputLabel>
              <Select
                labelId="status"
                label="Status"
                name="status"
                value={tournament.status}
                defaultValue={"Pending"}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#636574",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Ongoing"}>On-going</MenuItem>
                <MenuItem value={"End"}>End</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="type"
              name="type"
              value={tournament.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Online"
                control={
                  <Radio
                    sx={{
                      color: "#999aa3",
                      "&.Mui-checked": {
                        color: "#999aa3",
                      },
                    }}
                  />
                }
                label="Online"
                style={{ color: "#999aa3" }}
              />
              <FormControlLabel
                value="LAN"
                control={
                  <Radio
                    sx={{
                      color: "#999aa3",
                      "&.Mui-checked": {
                        color: "#999aa3",
                      },
                    }}
                  />
                }
                label="LAN"
                style={{ color: "#999aa3" }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end" gap={"10px"}>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 600,
              backgroundColor: "#FF8C00",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 600,
              backgroundColor: "#551A1A",
              "&:hover": {
                bgcolor: "#B22222",
              },
            }}
            onClick={() => {
              setTournament({
                tour_name: "",
                tour_detail: "",
                start_date: "",
                end_date: "",
                team_number: "",
                win_condition: "",
                location: "",
                type: "Online",
                game_name: "",
              });
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
      <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
    </form>
  );
}

export default TournamentForm;
