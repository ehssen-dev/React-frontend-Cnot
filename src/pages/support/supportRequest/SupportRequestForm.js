import React, { useState } from "react";
import {
  createSupportRequestFromAthlete,
  createSupportRequestFromFederation,
} from "../../../services/CommunicationInterne/SupportRequestService";

const SupportRequestForm = ({ isAthlete, athleteId, federationId }) => {
  const [formData, setFormData] = useState({
    subject: "",
    montant: "",
    justification: "",
    description: "",
    priority: "1", // Default to High priority
    attachments: null, // For file uploads
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files[0], // Assuming single file upload
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file uploads
    const data = new FormData();
    data.append("subject", formData.subject);
    data.append("montant", formData.montant);
    data.append("justification", formData.justification);
    data.append("description", formData.description);
    data.append("priority", formData.priority);
    if (formData.attachments) {
      data.append("attachments", formData.attachments);
    }

    try {
      if (isAthlete) {
        // Create support request for athlete
        await createSupportRequestFromAthlete(athleteId, data);
      } else {
        // Create support request for federation
        await createSupportRequestFromFederation(federationId, data);
      }
      alert("Support request created successfully!");
    } catch (error) {
      alert("Failed to create support request. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Montant:</label>
        <input
          type="number"
          name="montant"
          value={formData.montant}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Justification:</label>
        <textarea
          name="justification"
          value={formData.justification}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          required
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
      </div>

      <div>
        <label>Attachments:</label>
        <input
          type="file"
          name="attachments"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.png" // Acceptable file types
        />
      </div>

      <button type="submit">Submit Support Request</button>
    </form>
  );
};

export default SupportRequestForm;
