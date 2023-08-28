import React, { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
<FormControl fullWidth variant="outlined" required margin="normal">
  <InputLabel>Round</InputLabel>
  <Select
    labelId="round-label"
    id="round"
    name="round"
    value={formData.round}
    onChange={handleChange}
    label="Round"
  >
    <MenuItem value={"Pre-Quarterfinals"}>Pre-Quarterfinals</MenuItem>
    <MenuItem value={"Quarter-finals"}>Quarter-finals</MenuItem>
    <MenuItem value={"Semi-finals"}>Semi-finals</MenuItem>
    <MenuItem value={"Final"}>Final</MenuItem>
  </Select>
</FormControl>
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
            setFormData({
              schedule_name: "",
              round: "",
              date_time: "",
              location: "",
              register_id: "",
            });
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}

export default ScheduleForm;
