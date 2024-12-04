import apiClient from "../apiClient";

const SUPPORT_RESPONSE_API_URL = "/support-responses";

const getAllSupportResponses = async () => {
  const response = await apiClient.get(`${SUPPORT_RESPONSE_API_URL}/all`);
  return response.data;
};

const getSupportResponseById = async (supportResponseId) => {
  const response = await apiClient.get(
    `${SUPPORT_RESPONSE_API_URL}/${supportResponseId}`
  );
  return response.data;
};

const deleteSupportResponse = async (supportResponseId) => {
  await apiClient.delete(
    `${SUPPORT_RESPONSE_API_URL}/delete/${supportResponseId}`
  );
};

const createSupportResponse = async (supportResponseData) => {
  const response = await apiClient.post(
    `${SUPPORT_RESPONSE_API_URL}/add`,
    supportResponseData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export default {
  getAllSupportResponses,
  getSupportResponseById,
  deleteSupportResponse,
  createSupportResponse,
};
