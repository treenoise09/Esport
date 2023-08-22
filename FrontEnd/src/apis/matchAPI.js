import axios from 'axios';

const BASE_URL = 'http://localhost:4000/matches'; // Replace with your backend URL

const matchAPI = {
    // Create a new match
    createMatch: async (matchData) => {
        try {
            const response = await axios.post(BASE_URL, matchData);
            return response.data;
        } catch (error) {
            console.error("Error creating match:", error);
            throw error;
        }
    },

    // Get all matches
    getAllMatches: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching matches:", error);
            throw error;
        }
    },

    // Get a specific match by ID
    getMatchById: async (matchId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${matchId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching match with ID ${matchId}:`, error);
            throw error;
        }
    },

    // Update a specific match by ID
    updateMatch: async (matchId, matchData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${matchId}`, matchData);
            return response.data;
        } catch (error) {
            console.error(`Error updating match with ID ${matchId}:`, error);
            throw error;
        }
    },

    // Delete a specific match by ID
    deleteMatch: async (matchId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${matchId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting match with ID ${matchId}:`, error);
            throw error;
        }
    }
};

export default matchAPI;
