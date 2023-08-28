import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MemberList({ members, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell>Username</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>AKA</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Team ID</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.member_id}>
            <TableCell>{member.username}</TableCell>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.aka}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.team_id}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(member)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(member.member_id)}>
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

export default MemberList;
