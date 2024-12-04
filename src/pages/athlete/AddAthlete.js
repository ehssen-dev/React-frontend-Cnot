import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AthleteService from "../../services/CommunicationInterne/AthleteService";
import { message } from "antd";

const AddAthlete = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AthleteService.addAthlete({
        firstName,
        lastName,
        dateOfBirth,
        email,
        sport,
      });
      message.success("Athlete added successfully");
      navigate("/admin/athlete-list"); // Redirect to the athletes list or any other page
    } catch (err) {
      setError("Failed to add athlete");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Athlete</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSport">
          <Form.Label>Sport</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Athlete
        </Button>
      </Form>
    </div>
  );
};

export default AddAthlete;
