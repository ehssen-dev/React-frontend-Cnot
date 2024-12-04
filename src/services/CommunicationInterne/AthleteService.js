import apiClient from "../apiClient";

const AthleteService = {
  // Fetch all athletes
  getAllAthletes: async () => {
    try {
      const response = await apiClient.get("/athletes/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching athletes:", error);
      throw error;
    }
  },

  // Fetch an athlete by ID
  getAthleteById: async (athleteId) => {
    try {
      const response = await apiClient.get(`/athletes/${athleteId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching athlete details for ID ${athleteId}:`,
        error
      );
      throw error;
    }
  },

  getAthleteGame: async (athleteId) => {
    try {
      const response = await apiClient.get(`/athletes/${athleteId}/game`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching game for athlete with ID ${athleteId}:`,
        error
      );
      throw error;
    }
  },

  // Add a new athlete
  addAthlete: async (athleteDTO) => {
    try {
      const response = await apiClient.post("/athletes/add", athleteDTO);
      return response.data;
    } catch (error) {
      console.error("Error adding athlete:", error);
      throw error;
    }
  },

  // Update an existing athlete
  updateAthlete: async (athleteId, athleteDTO) => {
    try {
      const response = await apiClient.put(
        `/athletes/${athleteId}`,
        athleteDTO
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating athlete with ID ${athleteId}:`, error);
      throw error;
    }
  },

  // Delete an athlete
  deleteAthlete: async (athleteId) => {
    try {
      await apiClient.delete(`/athletes/${athleteId}`);
    } catch (error) {
      console.error(`Error deleting athlete with ID ${athleteId}:`, error);
      throw error;
    }
  },

  // Create performance metrics for an athlete
  createPerformanceMetrics: async (athleteId, metrics) => {
    try {
      const response = await apiClient.post(
        `/athletes/${athleteId}/performanceMetrics`,
        metrics
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error creating performance metrics for athlete with ID ${athleteId}:`,
        error
      );
      throw error;
    }
  },

  // Find an athlete by email
  findByEmail: async (email) => {
    try {
      const response = await apiClient.get("/athletes/email", {
        params: { email },
      });
      return response.data;
    } catch (error) {
      console.error(`Error finding athlete with email ${email}:`, error);
      throw error;
    }
  },

  associateAthleteWithFederation: async (athleteId, federationId) => {
    try {
      const response = await apiClient.post(
        `/athletes/${athleteId}/associate/${federationId}`
      );
      return response.data; // Assuming the response has a success message
    } catch (error) {
      console.error(
        `Error associating athlete with ID ${athleteId} to federation with ID ${federationId}:`,
        error
      );
      throw error;
    }
  },
};

export default AthleteService;
