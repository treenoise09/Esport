import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@mui/material";

function ScheduleForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      schedule_name: "",
      round: "",
      date_time: "",
      location: "",
      register_id: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        label="Schedule Name"
        name="schedule_name"
        value={formData.schedule_name}
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="Round"
        name="round"
        value={formData.round}
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="Date and Time"
        name="date_time"
        type="datetime-local"
        value={formData.date_time}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="Register ID"
        name="register_id"
        type="number"
        value={formData.register_id}
        onChange={handleChange}
        required
      />
      <Button
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
    </form>
  );
}

export default ScheduleForm;
