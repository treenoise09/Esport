import React, { useState, useEffect } from "react";
import { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } from "../../apis/scheduleAPI";
import ScheduleForm from "../../component/ScheduleForm";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Paper } from "@mui/material";
import NotificationModal from "../../component/NotificationModal";
function ScheduleMainPage() {
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [notification, setNotification] = React.useState({
      title: '',
      description: '',
    });
    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const data = await getAllSchedules();
            setSchedules(data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const handleFormSubmit = async (formData) => {
        if (selectedSchedule) {
            await updateSchedule(selectedSchedule.schedule_id, formData);
            setNotification({
                title: 'Success',
                description: 'Successfully updateSchedule.',
              });
              setIsModalOpen(true)
            } else {
            await createSchedule(formData);
            setNotification({
                title: 'Success',
                description: 'Successfully createSchedule.',
              });
              setIsModalOpen(true)
        }
        fetchSchedules();
        setSelectedSchedule(null);
    };

    const handleEdit = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleDelete = async (id) => {
        await deleteSchedule(id);
        setNotification({
            title: 'Success',
            description: 'Successfully deleteSchedule.',
          });
          setIsModalOpen(true)
        fetchSchedules();
    };

    return (
        <div style={{padding:'10px'}}>
            <h1>Schedule</h1>
            <ScheduleForm onSubmit={handleFormSubmit} initialData={selectedSchedule} />
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Schedule Name</TableCell>
                        <TableCell>Round</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Register ID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedules.map(schedule => (
                        <TableRow key={schedule.schedule_id}>
                            <TableCell>{schedule.schedule_name}</TableCell>
                            <TableCell>{schedule.round}</TableCell>
                            <TableCell>{schedule.date_time}</TableCell>
                            <TableCell>{schedule.location}</TableCell>
                            <TableCell>{schedule.register_id}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(schedule)}>Edit</Button>
                                <Button onClick={() => handleDelete(schedule.schedule_id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <NotificationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={notification.title}
        description={notification.description}
      />
        </div>
    );
}

export default ScheduleMainPage;
