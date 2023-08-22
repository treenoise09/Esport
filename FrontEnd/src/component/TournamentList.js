import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TournamentList({ tournaments, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Team Number</TableCell>
          <TableCell>Win Condition</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Game Name</TableCell>
          <TableCell> Status </TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tournaments.map((tournament) => (
          <TableRow key={tournament.tour_id}>
            <TableCell>{tournament.tour_id}</TableCell>
            <TableCell>{tournament.tour_name}</TableCell>
            <TableCell>{tournament.tour_detail}</TableCell>
            <TableCell>{tournament.start_date}</TableCell>
            <TableCell>{tournament.end_date}</TableCell>
            <TableCell>{tournament.team_number}</TableCell>
            <TableCell>{tournament.win_condition}</TableCell>
            <TableCell>{tournament.location}</TableCell>
            <TableCell>{tournament.type}</TableCell>
            <TableCell>{tournament.game_name}</TableCell>
            <TableCell>{tournament.status}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(tournament)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(tournament.tour_id)}>
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

export default TournamentList;
