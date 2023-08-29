import React, { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";

function TeamForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      team_id: "",
      team_name: "",
      created_at: "",
      updated_at: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add your form fields here */}
      <TextField
        name="team_name"
        label="Team Name"
        margin="normal"
        value={formData.team_name}
        onChange={handleChange}
        required
        fullWidth
      />
      {/* Add more fields if needed */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
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
    </form>
  );
}

export default TeamForm;
