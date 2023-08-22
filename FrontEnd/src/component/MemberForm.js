import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function MemberForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      username: "",
      name: "",
      date_of_birth: "",
      aka: "",
      role: "",
      email: "",
      team_id: 0,
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
      <TextField
        name="username"
        label="Username"
        margin="normal"
        value={formData.username}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        name="name"
        label="Name"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="date_of_birth"
        label="Date of Birth"
        margin="normal"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="AKA"
        name="aka"
        margin="normal"
        value={formData.aka}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth variant="outlined" required margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="USER">USER</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="email"
        label="Email"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Team ID"
        name="team_id"
        margin="normal"
        fullWidth
        value={formData.team_id}
        onChange={handleChange}
        required
      />
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
    </form>
  );
}

export default MemberForm;
