import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Replace with your backend URL

const tournamentAPI = {
  // Create a new tournament
  createTournament: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/tournaments`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  },

  // Get all tournaments
  getAllTournaments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tournaments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  },

  // Get a specific tournament by ID
  getTournamentById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tournaments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tournament:', error);
      throw error;
    }
  },

  // Update a tournament by ID
  updateTournament: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/tournaments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  },
  startTournament: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/tournaments/start/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  },

  // Delete a tournament by ID
  deleteTournament: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tournaments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tournament:', error);
      throw error;
    }
  },
};

export default tournamentAPI;
