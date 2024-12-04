import apiClient from "../apiClient";

// Base URL for games
const API_URL = "/games";

// Create a new game
export const createGame = async (game) => {
  try {
    const response = await apiClient.post(`${API_URL}/add`, game);
    return response.data;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

export const updateGame = async (gameId, game) => {
  try {
    const response = await apiClient.put(`${API_URL}/${gameId}`, game);
    return response.data;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
};
// Get a game by ID
export const getGameById = async (gameId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

// Get all games
export const getAllGames = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

// Delete a game by ID
export const deleteGame = async (gameId) => {
  try {
    await apiClient.delete(`${API_URL}/${gameId}`);
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};

// Check if a game has ended
export const gameHasEnded = async (gameId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${gameId}/hasEnded`);
    return response.data;
  } catch (error) {
    console.error("Error checking if game has ended:", error);
    throw error;
  }
};
export const addAthleteToGame = async (gameId, athleteId) => {
  try {
    const response = await apiClient.post(
      `${API_URL}/${gameId}/athletes/${athleteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding athlete to game:", error);
    throw error;
  }
};

// Remove an athlete from a game
export const removeAthleteFromGame = async (gameId, athleteId) => {
  try {
    const response = await apiClient.delete(
      `${API_URL}/${gameId}/athletes/${athleteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing athlete from game:", error);
    throw error;
  }
};
