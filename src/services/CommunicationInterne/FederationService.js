import apiClient from "../apiClient";

const FederationService = {
  // Fetch all federations
  getAllFederations: async () => {
    try {
      const response = await apiClient.get("/federations/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching federations:", error);
      throw error;
    }
  },

  // Fetch a federation by ID
  getFederationById: async (federationId) => {
    try {
      const response = await apiClient.get(`/federations/${federationId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching federation details for ID ${federationId}:`,
        error
      );
      throw error;
    }
  },

  // Add a new federation
  addFederation: async (federationDTO) => {
    try {
      const response = await apiClient.post("/federations/add", federationDTO);
      return response.data;
    } catch (error) {
      console.error("Error adding federation:", error);
      throw error;
    }
  },

  // Update an existing federation
  updateFederation: async (federationId, federationDTO) => {
    try {
      const response = await apiClient.put(
        `/federations/${federationId}`,
        federationDTO
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating federation with ID ${federationId}:`,
        error
      );
      throw error;
    }
  },

  // Delete a federation
  deleteFederation: async (federationId) => {
    try {
      await apiClient.delete(`/federations/${federationId}`);
    } catch (error) {
      console.error(
        `Error deleting federation with ID ${federationId}:`,
        error
      );
      throw error;
    }
  },

  // Find a federation by email (if applicable)
  findByEmail: async (email) => {
    try {
      const response = await apiClient.get("/federations/email", {
        params: { email },
      });
      return response.data;
    } catch (error) {
      console.error(`Error finding federation with email ${email}:`, error);
      throw error;
    }
  },
};

export default FederationService;
