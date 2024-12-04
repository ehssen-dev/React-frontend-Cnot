import apiClient from "../apiClient";

const ResultService = {
  // Create a new result
  createResult: async (resultData) => {
    try {
      const response = await apiClient.post("/results/add", resultData);
      return response.data;
    } catch (error) {
      console.error("Error creating result:", error);
      throw error;
    }
  },

  // Get a result by ID
  getResultById: async (resultId) => {
    try {
      const response = await apiClient.get(`/results/${resultId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching result with ID ${resultId}:`, error);
      throw error;
    }
  },

  // Get all results
  getAllResults: async () => {
    try {
      const response = await apiClient.get("/results/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all results:", error);
      throw error;
    }
  },

  // Delete a result by ID
  deleteResult: async (resultId) => {
    try {
      await apiClient.delete(`/results/${resultId}`);
    } catch (error) {
      console.error(`Error deleting result with ID ${resultId}:`, error);
      throw error;
    }
  },
};

export default ResultService;
