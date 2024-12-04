import apiClient from "../apiClient";

const API_URL = "/support-requests";

const API_URL_S = "/support-requests/all";

// Get all support requests with optional status filter
export const getAllSupportRequests = async (status = "") => {
  try {
    const response = await apiClient.get(API_URL_S, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching support requests:", error);
    throw error;
  }
};
export const getAllSupportRequestsF = async () => {
  try {
    // Send a GET request to fetch all support requests by appending "/all" to the base endpoint
    const response = await apiClient.get(`${API_URL}/alls`);
    return response.data;
  } catch (error) {
    console.error("Error fetching support requests:", error);
    throw error;
  }
};
// Get support request by ID
export const getSupportRequestById = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching support request with ID ${id}:`, error);
    throw error;
  }
};

export const createSupportRequestFromAthlete = async (
  athleteId,
  requestData
) => {
  try {
    const response = await apiClient.post(
      `${API_URL}/from-athlete/${athleteId}`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating support request from athlete:", error);
    throw error;
  }
};

// Create a new support request from a federation
export const createSupportRequestFromFederation = async (
  federationId,
  requestData
) => {
  try {
    const response = await apiClient.post(
      `${API_URL}/from-federation/${federationId}`,
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating support request from federation:", error);
    throw error;
  }
};

// Update an existing support request
export const updateSupportRequest = async (request) => {
  try {
    const response = await apiClient.put(`${API_URL}/update`, request);
    return response.data;
  } catch (error) {
    console.error("Error updating support request:", error);
    throw error;
  }
};

// Delete a support request by ID
export const deleteSupportRequest = async (id) => {
  try {
    await apiClient.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting support request with ID ${id}:`, error);
    throw error;
  }
};

// Change the status of a support request
export const changeRequestStatus = async (supportRequestId, newStatus) => {
  try {
    await apiClient.patch(
      `${API_URL}/${supportRequestId}/change-status`,
      null,
      {
        params: { newStatus },
      }
    );
  } catch (error) {
    console.error(
      `Error changing status for support request with ID ${supportRequestId}:`,
      error
    );
    throw error;
  }
};
