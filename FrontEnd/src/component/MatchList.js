import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';

const MatchList = ({ matches, onDelete, onEdit }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Match ID</TableCell>
                        <TableCell align="right">Result</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Schedule ID</TableCell>
                        <TableCell align="right">Team 1 ID</TableCell>
                        <TableCell align="right">Team 1 Score</TableCell>
                        <TableCell align="right">Team 2 ID</TableCell>
                        <TableCell align="right">Team 2 Score</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((match) => (
                        <TableRow key={match.match_id}>
                            <TableCell component="th" scope="row">
                                {match.match_id}
                            </TableCell>
                            <TableCell align="right">{match.result}</TableCell>
                            <TableCell align="right">{match.score}</TableCell>
                            <TableCell align="right">{match.schedule_id}</TableCell>
                            <TableCell align="right">{match.team1_id}</TableCell>
                            <TableCell align="right">{match.team1_score}</TableCell>
                            <TableCell align="right">{match.team2_id}</TableCell>
                            <TableCell align="right">{match.team2_score}</TableCell>
                            <TableCell align="right">
                                <Button color="primary" onClick={() => onEdit(match)}>Edit</Button>
                                <Button color="secondary" onClick={() => onDelete(match.match_id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MatchList;
