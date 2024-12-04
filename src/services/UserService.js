import apiClient from "./apiClient";

// Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Function to get a user by ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/user/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};
export const getUserByIds = async (id) => {
  try {
    const response = await apiClient.get(`/user/s/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};
// Function to delete a user by ID
export const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`/user/${userId}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};
