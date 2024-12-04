import apiClient from "../apiClient";

class MailService {
  // Fetch all mails
  static async fetchAllMails() {
    try {
      const response = await apiClient.get("/mails/all-em");
      return response.data;
    } catch (error) {
      console.error("Error fetching all emails:", error);
      throw error;
    }
  }

  // Fetch mail by ID
  static async fetchMailById(mailId) {
    try {
      const response = await apiClient.get(`/mails/${mailId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mail with ID ${mailId}:`, error);
      throw error;
    }
  }

  // Fetch mails by athlete ID
  static async fetchMailsByAthleteId(athleteId) {
    try {
      const response = await apiClient.get(`/mails/athlete/${athleteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mails for athlete ID ${athleteId}:`, error);
      throw error;
    }
  }

  // Fetch attachment data by ID
  static async fetchAttachmentDataById(id) {
    try {
      // Make the request to the backend API
      const response = await fetch(`/api/attachments/${id}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache", // To handle cache
          Pragma: "no-cache",
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(
          `Failed to fetch attachment data: ${response.statusText}`
        );
      }

      // Convert the response to a Blob
      return await response.blob();
    } catch (error) {
      console.error(`Error fetching attachment with ID ${id}:`, error);
      throw error;
    }
  }

  // Send a mail
  static async sendMail(formData) {
    try {
      const response = await apiClient.post("/mails/sendMail", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for sending FormData
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error sending mail:", error.response.data);
        throw new Error(error.response.data.message || "Failed to send mail.");
      } else {
        console.error("Error sending mail:", error.message);
        throw new Error("Failed to send mail due to a network error.");
      }
    }
  }

  // Track an email
  static async trackEmail(mailId) {
    try {
      const response = await apiClient.get(`/mails/track-email`, {
        params: { mailId },
      });
      return response.data;
    } catch (error) {
      console.error("Error tracking email:", error);
      throw error;
    }
  }

  // Send mail to all entities
  static async sendMailToAllEntities(mailRequest) {
    try {
      const response = await apiClient.post(
        "/mails/send-to-all-entities",
        mailRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error sending mail to all entities:", error);
      throw error;
    }
  }

  // Send mail to all athletes
  static async sendMailToAllAthletes(mailRequest) {
    try {
      const response = await apiClient.post(
        "/mails/send-to-athletes",
        mailRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error sending mail to all athletes:", error);
      throw error;
    }
  }

  // Send mail to all delegations
  static async sendMailToAllDelegations(mailRequest) {
    try {
      const response = await apiClient.post(
        "/mails/send-to-delegations",
        mailRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error sending mail to all delegations:", error);
      throw error;
    }
  }

  // Send mail to all users
  static async sendMailToAllUsers(mailRequest) {
    try {
      const response = await apiClient.post(
        "/mails/send-to-users",
        mailRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error sending mail to all users:", error);
      throw error;
    }
  }

  // Search mails
  static async searchMails(queryParams) {
    try {
      const response = await apiClient.get("/mails/search", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching mails:", error);
      throw error;
    }
  }
}

export default MailService;
