import React, { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap"; // Import Row and Col
import { useParams, useNavigate } from "react-router-dom";
import AthleteService from "../../services/CommunicationInterne/AthleteService";
import { Typography } from "@mui/material";
import { message } from "antd";
import FederationService from "../../services/CommunicationInterne/FederationService";

const AthleteDetails = () => {
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [federations, setFederations] = useState([]);
  const [selectedFederationId, setSelectedFederationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        setLoading(true);
        const data = await AthleteService.getAthleteById(athleteId);
        setAthlete(data);
      } catch (err) {
        setError("Failed to fetch athlete details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchFederations = async () => {
      try {
        const data = await FederationService.getAllFederations();
        setFederations(data);
      } catch (err) {
        setError("Failed to fetch federations");
        console.error(err);
      }
    };

    fetchAthlete();
    fetchFederations();
  }, [athleteId]);

  const handleDelete = async () => {
    try {
      await AthleteService.deleteAthlete(athleteId);
      message.success("Athlete deleted successfully");
      navigate("/athlete-list");
    } catch (err) {
      message.error("Failed to delete athlete");
      console.error(err);
    }
  };

  const handleAssociate = async () => {
    try {
      await AthleteService.associateAthleteWithFederation(
        athleteId,
        selectedFederationId
      );
      message.success("Athlete associated with federation successfully");
      setSelectedFederationId(""); // Reset the selection
    } catch (err) {
      message.error("Failed to associate athlete with federation");
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!athlete) return <p>No athlete found.</p>;

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Athlete Details
      </Typography>
      <Row>
        {/* Athlete Information Card */}
        <Col md={8} className="mb-3">
          {" "}
          {/* Adjust width as needed */}
          <Card style={{ borderColor: "#000520" }}>
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h5 className="mb-0">Athlete Information</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Athlete ID:</strong> {athlete.athleteId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Photo:</strong>{" "}
                  {athlete.photo ? (
                    <img
                      src={athlete.photo}
                      alt="Athlete"
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    "No photo available"
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>First Name:</strong> {athlete.firstName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Last Name:</strong> {athlete.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(athlete.dateOfBirth).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {athlete.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Blocked:</strong> {athlete.bloque ? "Yes" : "No"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Age:</strong>{" "}
                  {athlete.age !== null ? athlete.age : "Not provided"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Gender:</strong> {athlete.gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Username:</strong> {athlete.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {athlete.phnum}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>CIN:</strong> {athlete.cin}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Sport:</strong> {athlete.sport}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>City:</strong> {athlete.city}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Association Section */}
        <Col md={4} className="mb-3">
          {" "}
          {/* Adjust width as needed */}
          <Card style={{ borderColor: "#000520" }}>
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h5 className="mb-0">Associate Athlete with Federation</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="federationSelect">
                <Form.Label>Select Federation</Form.Label>
                <Form.Select
                  value={selectedFederationId}
                  onChange={(e) => setSelectedFederationId(e.target.value)}
                >
                  <option value="">Choose a federation...</option>
                  {federations.map((federation) => (
                    <option
                      key={federation.federationId}
                      value={federation.federationId}
                    >
                      {federation.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                onClick={handleAssociate}
                variant="primary"
                disabled={!selectedFederationId}
                className="mt-3"
              >
                Associate
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4"></div>
    </div>
  );
};

export default AthleteDetails;
