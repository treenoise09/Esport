import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Replace with your backend API URL

export const createRegistration = async (teamId, tourId) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      team_id: teamId,
      tour_id: tourId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
};

export const getAllRegistrationsByTournamentId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/register?tour_id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all registrations:', error);
    throw error;
  }
};
export const getAllRegistrations = async () => {
  try {
    const response = await axios.get(`${API_URL}/register`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all registrations:', error);
    throw error;
  }
};


export const getRegistrationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/register/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching registration by ID ${id}:`, error);
    throw error;
  }
};

export const updateRegistration = async (id, register) => {
  try {
    const response = await axios.put(`${API_URL}/register/${id}`, register);
    return response.data;
  } catch (error) {
    console.error(`Error updating registration ${id}:`, error);
    throw error;
  }
};

export const bulkUpdateRegistrations = async (register) => {
  try {
    const response = await axios.put(`${API_URL}/register/bulk`, register);
    return response.data;
  } catch (error) {
    console.error(`Error updating registration:`, error);
    throw error;
  }
};

export const deleteRegistration = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/register/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting registration ${id}:`, error);
    throw error;
  }
};
