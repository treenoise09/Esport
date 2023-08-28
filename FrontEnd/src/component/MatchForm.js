import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const MatchForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant="outlined" required margin="normal">
        <InputLabel>Match Result</InputLabel>
        <Select
          labelId="result-label"
          id="result"
          name="result"
          value={formData.result}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"Win"}>Win</MenuItem>
          <MenuItem value={"Loss"}>Loss</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="schedule_id"
        label="Schedule ID"
        name="schedule_id"
        type="number"
        value={formData.schedule_id || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="team1_id"
        label="Team 1 ID"
        name="team1_id"
        value={formData.team1_id || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="team1_score"
        label="Team 1 Score"
        name="team1_score"
        type="number"
        value={formData.team1_score || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="team2_id"
        label="Team 2 ID"
        name="team2_id"
        value={formData.team2_id || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="team2_score"
        label="Team 2 Score"
        name="team2_score"
        type="number"
        value={formData.team2_score || ""}
        onChange={handleChange}
      />
      <div
        style={{
          padding: "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: 600,
            backgroundColor: "#FF8C00",
            "&:hover": {
              bgcolor: "#B22222",
            },
          }}
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
            setFormData({});
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default MatchForm;
