import apiClient from "../apiClient";

class DepartmentService {
  // Fetch all departments
  static async getAllDepartments() {
    try {
      const response = await apiClient.get("/departments/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a department by its ID
  static async getDepartmentById(departmentId) {
    try {
      const response = await apiClient.get(`/departments/${departmentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new department
  static async createDepartment(department) {
    try {
      const response = await apiClient.post("/departments/add", department);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update a department by its ID
  static async updateDepartment(departmentId, department) {
    try {
      const response = await apiClient.put(
        `/departments/update/${departmentId}`,
        department
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete a department by its ID
  static async deleteDepartment(departmentId) {
    try {
      const response = await apiClient.delete(`/departments/${departmentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default DepartmentService;
