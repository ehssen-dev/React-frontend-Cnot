import apiClient from "../apiClient";

class BudgetAllocationService {
  static async getAllBudgetAllocations() {
    return await apiClient.get("/budgetAllocations/all");
  }

  static async getBudgetAllocationById(budgetId) {
    return await apiClient.get(`/budgetAllocations/${budgetId}`);
  }

  static async createBudgetAllocation(budgetAllocation) {
    return await apiClient.post("/budgetAllocations/add", budgetAllocation);
  }

  static async updateBudgetAllocation(budgetId, updatedBudgetAllocation) {
    return await apiClient.put(
      `/budgetAllocations/${budgetId}`,
      updatedBudgetAllocation
    );
  }

  static async updateBudgetStatus(budgetId, newStatus) {
    return await apiClient.put(`/budgetAllocations/${budgetId}/status`, {
      newStatus,
    });
  }

  static async deleteBudgetAllocation(budgetId) {
    return await apiClient.delete(`/budgetAllocations/${budgetId}`);
  }

  static async calculateTotalBudgetForProject(projectId) {
    return await apiClient.get(`/budgetAllocations/project/${projectId}/total`);
  }

  static async allocateBudget(procurementRequest) {
    return await apiClient.post(
      "/budgetAllocations/allocate",
      procurementRequest
    );
  }
}

export default BudgetAllocationService;
