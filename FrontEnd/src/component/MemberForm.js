import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useUser } from "./UserContext";

function MemberForm({ onSubmit, initialData, isAdmin }) {
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
  const user = useUser();
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    user.user ? (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        margin="normal"
        value={formData.username}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
    style: {
      color: "white",
    },
  }}
  InputLabelProps={{
    style: { color: "white" },
  }}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
    style: {
      color: "white",
    },
  }}
  InputLabelProps={{
    style: { color: "white" },
  }}
      />
      <TextField
        name="name"
        label="name"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
    style: {
      color: "white",
    },
  }}
  InputLabelProps={{
    style: { color: "white" },
  }}
      />
      <TextField
        label="AKA"
        name="aka"
        margin="normal"
        value={formData.aka}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
    style: {
      color: "white",
    },
  }}
  InputLabelProps={{
    style: { color: "white" },
  }}
      />
      {isAdmin ? (
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
      ) : null}
      {isAdmin ? (
        <TextField
          label="Team ID"
          name="team_id"
          margin="normal"
          fullWidth
          value={formData.team_id}
          onChange={handleChange}
          inputProps={{ style: { color: "white" } }}
          required
        />
      ) : null}
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
    ) : (
      <div>Loading...</div>  // or any other placeholder or spinner
    )
  );
}

export default MemberForm;
