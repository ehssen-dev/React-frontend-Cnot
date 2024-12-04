import React, { useState } from "react";
import axios from "axios";

function EvaluateGames() {
  const [status, setStatus] = useState("");

  const handleEvaluate = async () => {
    try {
      // Send a request to the backend to trigger the evaluation
      const response = await axios.get(
        "http://localhost:8080/api/monitoring/evaluate"
      );
      setStatus(response.data); // Show success message
    } catch (error) {
      setStatus("Error during evaluation: " + error.message); // Show error message
    }
  };

  return (
    <div>
      <button onClick={handleEvaluate}>Evaluate Games and Events</button>
      <div>{status}</div> {/* Display success or error message */}
    </div>
  );
}

export default EvaluateGames;
