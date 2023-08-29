import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, TableContainer } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TeamList({ teams, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: 400, overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team ID</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.team_id}>
              <TableCell>{team.team_id}</TableCell>
              <TableCell>{team.team_name}</TableCell>
              <TableCell>{team.created_at}</TableCell>
              <TableCell>{team.updated_at}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(team)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(team.team_id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TeamList;
