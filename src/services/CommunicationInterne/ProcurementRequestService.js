import apiClient from "../apiClient";

class ProcurementRequestService {
  // Create a new procurement request
  static async createProcurementRequest(data) {
    try {
      const response = await apiClient.post("/procurement-requests/add", data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          `Request failed with status code ${error.response.status}`
        );
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
        throw new Error(
          `Request failed: ${error.response.data.message || "Unknown error"}`
        );
      } else if (error.request) {
        console.error("No response received from server");
        throw new Error("No response received from server");
      } else {
        console.error(`Error: ${error.message}`);
        throw new Error(`Error: ${error.message}`);
      }
    }
  }

  // Get procurement request by ID
  static async getProcurementRequestById(requestId) {
    return await apiClient.get(`/procurement-requests/${requestId}`);
  }

  // Get all procurement requests
  static async getAllProcurementRequests() {
    return await apiClient.get("/procurement-requests/all");
  }

  // Update a procurement request by ID
  static async updateProcurementRequest(requestId, data) {
    return await apiClient.put(`/procurement-requests/${requestId}`, data);
  }

  // Delete a procurement request by ID
  static async deleteProcurementRequest(requestId) {
    return await apiClient.delete(`/procurement-requests/${requestId}`);
  }

  // Get all pending procurement requests
  static async getPendingRequests() {
    return await apiClient.get("/procurement-requests/pending");
  }

  // Update the status of a procurement request by ID
  static async updateRequestStatus(requestId, status) {
    return await apiClient.put(
      `/procurement-requests/${requestId}/update-status`,
      null,
      {
        params: { status },
      }
    );
  }

  // Process a procurement request (approve/reject)
  static async processRequest(requestId, approved, comments) {
    const data = { approved, comments };
    return await apiClient.post(
      `/procurement-requests/${requestId}/process`,
      data
    );
  }

  // Submit a procurement request for approval
  static async submitRequestForApproval(requestId) {
    return await apiClient.post(`/procurement-requests/${requestId}/submit`);
  }

  // Approve or reject a procurement request
  static async approveRequest(requestId, approved, comments) {
    return await apiClient.post(
      `/procurement-requests/${requestId}/approve`,
      null,
      {
        params: { approved, comments },
      }
    );
  }

  // Reset the status of a procurement request to PENDING
  static async resetRequest(requestId) {
    return await apiClient.post(`/procurement-requests/${requestId}/reset`);
  }
}

export default ProcurementRequestService;
