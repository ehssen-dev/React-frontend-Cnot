import apiClient from "./apiClient";

// Upload a file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Download a file
export const downloadFile = async (fileName) => {
  try {
    const response = await apiClient.get(`/files/download/${fileName}`, {
      responseType: "arraybuffer",
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a link element and trigger a download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Error downloading file with name ${fileName}:`, error);
    throw error;
  }
};

// List all files
export const listFiles = async () => {
  try {
    const response = await apiClient.get(`/files/list`);
    return {
      files: response.data || [],
    };
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};
