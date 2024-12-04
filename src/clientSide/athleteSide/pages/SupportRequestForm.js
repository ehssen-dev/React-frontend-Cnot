import React, { useState, useEffect } from "react";
import { createSupportRequestFromAthlete } from "../../../services/CommunicationInterne/SupportRequestService";
import AuthService from "../../../services/AuthService"; // Adjust the import path as needed

const SupportRequestForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    montant: "",
    justification: "",
    description: "",
    priority: "1", // Default to High priority
    attachments: null, // For file uploads
  });

  const [athleteId, setAthleteId] = useState(null); // State to hold athlete ID
  const [loading, setLoading] = useState(true); // Loading state for user fetching

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AuthService.getUser(); // Fetch user data
        setAthleteId(userData.athleteId); // Set athlete ID
        setLoading(false); // Loading completed
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUser(); // Call the function on component mount
  }, []);

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

    // Ensure athlete ID is available before proceeding
    if (!athleteId) {
      alert("Athlete ID is missing. Unable to submit the request.");
      return;
    }

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
      // Create support request for athlete using the fetched athlete ID
      const response = await createSupportRequestFromAthlete(athleteId, data);
      alert("Support request created successfully!");
      console.log("Response data:", response); // Optional: log response for debugging
    } catch (error) {
      console.error(
        "Error creating support request:",
        error.response || error.message
      ); // More detailed error logging
      alert("Failed to create support request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Send Support Request
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="subject"
              placeholder="Subject*"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              name="montant"
              placeholder="Amount*"
              value={formData.montant}
              onChange={handleInputChange}
              required
            />
            <textarea
              className="w-full h-32 bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="justification"
              placeholder="Justification*"
              value={formData.justification}
              onChange={handleInputChange}
              required
            />
            <textarea
              className="w-full h-32 bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="description"
              placeholder="Description*"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-4">
            <label className="block mb-2 text-gray-600">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            >
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-2 text-gray-600">Attachments:</label>
            <input
              type="file"
              name="attachments"
              onChange={handleFileChange}
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              accept=".pdf,.doc,.docx,.jpg,.png" // Acceptable file types
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-gray-100 p-3 rounded-lg font-bold uppercase text-sm tracking-wide focus:outline-none focus:shadow-outline"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportRequestForm;
