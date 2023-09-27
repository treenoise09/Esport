// teamAPI.js

import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Replace with your backend API URL

const teamAPI = {
  // Create a new team
  createTeam: async (teamData) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams`, teamData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all teams
  getAllTeams: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teams`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific team by ID
  getTeamById: async (teamId) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a team by ID
  updateTeam: async (teamId, updatedData,query='') => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/${teamId}${query}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a team by ID
  deleteTeam: async (teamId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/teams/${teamId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default teamAPI;
