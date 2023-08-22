import axios from 'axios';

const BASE_URL = 'http://localhost:4000/schedule'; // Assuming your backend server is running on the same domain

export const createSchedule = async (scheduleData) => {
    try {
        const response = await axios.post(BASE_URL, scheduleData);
        return response.data;
    } catch (error) {
        console.error("Error creating schedule:", error);
        throw error;
    }
}

export const getAllSchedules = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching schedules:", error);
        throw error;
    }
}

export const getScheduleById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching schedule:", error);
        throw error;
    }
}

export const updateSchedule = async (id, scheduleData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, scheduleData);
        return response.data;
    } catch (error) {
        console.error("Error updating schedule:", error);
        throw error;
    }
}

export const deleteSchedule = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting schedule:", error);
        throw error;
    }
}
