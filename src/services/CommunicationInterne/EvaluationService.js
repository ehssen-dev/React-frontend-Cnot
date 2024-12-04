import apiClient from "../apiClient";

// Base URL for evaluation
const API_URL = "/monitoring";

// Function to evaluate games and events
export const evaluateGamesAndEvents = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/evaluate`);
    return response.data;
  } catch (error) {
    console.error("Error evaluating games and events:", error);
    throw error;
  }
};
