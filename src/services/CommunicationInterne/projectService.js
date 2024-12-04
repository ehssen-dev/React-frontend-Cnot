import apiClient from "../apiClient";

class ProjectService {
  static async getAllProjects() {
    return await apiClient.get("/projects/all");
  }

  static async getProjectById(projectId) {
    return await apiClient.get(`/projects/${projectId}`);
  }

  static async createProject(project) {
    return await apiClient.post("/projects/add", project);
  }

  static async updateProject(projectId, project) {
    return await apiClient.put(`/projects/update/${projectId}`, project);
  }

  static async deleteProject(projectId) {
    return await apiClient.delete(`/projects/delete/${projectId}`);
  }

  static async getProjectsByStatus(status) {
    return await apiClient.get(`/projects/status/${status}`);
  }

  static async getProjectsInDateRange(startDate, endDate) {
    return await apiClient.get("/projects/date-range", {
      params: { startDate, endDate },
    });
  }

  static async associateProjectWithSolidarityOlympic(
    projectId,
    solidarityOlympicId
  ) {
    return await apiClient.post(
      `/projects/${projectId}/associate/${solidarityOlympicId}`
    );
  }

  // New Methods for Statistics

  // Fetches the count of projects by status
  static async getProjectCountByStatus() {
    return await apiClient.get("/projects/stats/project-count-by-status");
  }

  // Fetches the total budget allocation for each project
  static async getTotalBudgetAllocationByProject() {
    return await apiClient.get("/projects/stats/total-budget-allocation");
  }

  // Fetches the total expenditure by department
  static async getTotalExpenditureByDepartment() {
    return await apiClient.get(
      "/projects/stats/total-expenditure-by-department"
    );
  }

  // Fetches the projects within a specified date range
  static async getProjectsByDateRange(startDate, endDate) {
    return await apiClient.get("/projects/stats/projects-by-date-range", {
      params: { startDate, endDate },
    });
  }
}

export default ProjectService;
