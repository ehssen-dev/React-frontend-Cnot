import apiClient from "../apiClient";

// Function to create a new event
export const createEvent = async (event) => {
  try {
    const response = await apiClient.post("/events/add", event);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create event: " + error.message);
  }
};

export const updateEvent = async (eventId, event) => {
  try {
    const response = await apiClient.put(`/events/${eventId}`, event);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update event: " + error.message);
  }
};

// Function to get an event by ID
export const getEventById = async (eventId) => {
  try {
    const response = await apiClient.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch event: " + error.message);
  }
};

// Function to get all events
export const getAllEvents = async () => {
  try {
    const response = await apiClient.get("/events/all");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch events: " + error.message);
  }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    await apiClient.delete(`/events/${eventId}`);
  } catch (error) {
    throw new Error("Failed to delete event: " + error.message);
  }
};

// Function to check if an event has ended
export const eventHasEnded = async (eventId) => {
  try {
    const response = await apiClient.get(`/events/hasEnded/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to check if event has ended: " + error.message);
  }
};
export const evaluateEventProgress = async () => {
  try {
    const response = await apiClient.get("/events/evaluate");
    return response.data; // This will return the success or error message
  } catch (error) {
    throw new Error("Failed to evaluate event progress: " + error.message);
  }
};
