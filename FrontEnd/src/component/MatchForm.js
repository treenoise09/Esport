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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="winner_id"
        label="Winner ID"
        name="winner_id"
        value={formData.winner_id || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="winner_score"
        label="Winner Score"
        name="winner_score"
        type="number"
        value={formData.winner_score || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="loser_id"
        label="Loser ID"
        name="loser_id"
        value={formData.loser_id || ""}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="loser_score"
        label="Loser Score"
        name="loser_score"
        type="number"
        value={formData.loser_score || ""}
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
