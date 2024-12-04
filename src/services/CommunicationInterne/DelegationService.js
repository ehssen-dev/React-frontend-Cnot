import apiClient from "../apiClient";

// Base URL for delegations
const API_URL = "/delegations";

// Get all delegations
export const getAllDelegations = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delegations:", error);
    throw error;
  }
};

// Get a delegation by ID
export const getDelegationById = async (delegationId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${delegationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delegation:", error);
    throw error;
  }
};

// Create a new delegation
export const createDelegation = async (delegationDTO) => {
  try {
    const response = await apiClient.post(`${API_URL}/add`, delegationDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating delegation:", error);
    throw error;
  }
};

// Update an existing delegation
export const updateDelegation = async (delegationId, delegationDTO) => {
  try {
    const response = await apiClient.put(
      `${API_URL}/${delegationId}`,
      delegationDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error updating delegation:", error);
    throw error;
  }
};

// Delete a delegation by ID
export const deleteDelegation = async (delegationId) => {
  try {
    await apiClient.delete(`${API_URL}/${delegationId}`);
  } catch (error) {
    console.error("Error deleting delegation:", error);
    throw error;
  }
};
