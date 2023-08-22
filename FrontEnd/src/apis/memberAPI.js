import axios from 'axios';

const BASE_URL = 'http://localhost:4000/members'; // Replace with your backend endpoint

const memberAPI = {
    getAllMembers: async () => {
        try {
          const response = await axios.get(BASE_URL);
          return response.data;
        } catch (error) {
          console.error("Error fetching all members:", error);
          throw error;
        }
      },
    
      getMemberById: async (id) => {
        try {
          const response = await axios.get(`${BASE_URL}/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching member with ID ${id}:`, error);
          throw error;
        }
      },
    
      registerMember: async (memberData) => {
        try {
          const response = await axios.post(BASE_URL+'/register', memberData);
          return response.data;
        } catch (error) {
          console.error("Error creating member:", error);
          throw error;
        }
      },
      loginMember: async (memberData) => {
        try {
          const response = await axios.post(BASE_URL+'/login', memberData);
          return response.data;
        } catch (error) {
          console.error("Error creating member:", error);
          throw error;
        }
      },
    
      updateMember: async (id, memberData) => {
        try {
          const response = await axios.put(`${BASE_URL}/${id}`, memberData);
          return response.data;
        } catch (error) {
          console.error(`Error updating member with ID ${id}:`, error);
          throw error;
        }
      },
    
      deleteMember: async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error deleting member with ID ${id}:`, error);
          throw error;
        }
      }
};

export default memberAPI;
