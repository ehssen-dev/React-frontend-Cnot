import apiClient from "../apiClient";

// Retrieve all documents
export const getAllDocuments = async () => {
  try {
    const response = await apiClient.get("/documents");
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Retrieve a document by ID
export const getDocumentById = async (documentId) => {
  try {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document with ID ${documentId}:`, error);
    throw error;
  }
};

// Add a new document
export const addDocument = async (document) => {
  try {
    const response = await apiClient.post("/documents/add", document);
    return response.data;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async (documentId, document) => {
  try {
    const response = await apiClient.put(`/documents/${documentId}`, document);
    return response.data;
  } catch (error) {
    console.error(`Error updating document with ID ${documentId}:`, error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (documentId) => {
  try {
    await apiClient.delete(`/documents/${documentId}`);
  } catch (error) {
    console.error(`Error deleting document with ID ${documentId}:`, error);
    throw error;
  }
};
