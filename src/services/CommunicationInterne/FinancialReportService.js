import apiClient from "../apiClient";

const API_URL = "/financial-reports";

/**
 * Function to generate a financial report for a given project between the specified start and end dates.
 * @param {string} startDate
 * @param {string} endDate
 * @param {number} projectId
 * @returns {Promise<Object>} - A Promise that resolves to the generated financial report data.
 */
export const generateFinancialReport = async (
  startDate,
  endDate,
  projectId
) => {
  try {
    // Make a POST request to generate the financial report.
    const response = await apiClient.post(`${API_URL}/generate`, null, {
      params: {
        startDate,
        endDate,
        projectId,
      },
    });

    // Ensure the response is in JSON format before returning the data.
    if (response.headers["content-type"].includes("application/json")) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error generating financial report:", error);
    throw error;
  }
};
// Get all financial reports
export const getAllFinancialReports = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching financial reports:", error);
    throw error;
  }
};

// Get a financial report by ID
export const getFinancialReportById = async (reportId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${reportId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching financial report by ID:", error);
    throw error;
  }
};

// Get financial reports by project ID
export const getFinancialReportsByProjectId = async (projectId) => {
  try {
    const response = await apiClient.get(`${API_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching financial reports by project ID:", error);
    throw error;
  }
};

export const getFinancialReportChartData = async (
  startDate,
  endDate,
  projectId
) => {
  try {
    const response = await apiClient.get(`${API_URL}/chart-data`, {
      params: {
        startDate,
        endDate,
        projectId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching financial report chart data:", error);
    throw error;
  }
};
