import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const createSupportRequestFromAthlete = (athleteId, subject, description) => {
  return api.post(`/support-requests/create-from-athlete/${athleteId}`, { subject, description });
};

export const createSupportRequestFromFederation = (federationId, subject, description) => {
  return api.post(`/support-requests/create-from-federation/${federationId}`, {
    subject,
    description,
  });
};

export const getSupportRequests = () => {
  return api.get("/support-requests/all");
};

export const deleteSupportRequest = (requestId) => {
  return api.delete(`/support-requests/delete/${requestId}`);
};
