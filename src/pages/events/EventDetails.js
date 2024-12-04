import React, { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Alert, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteEvent,
  getEventById,
} from "../../services/CommunicationInterne/EventService"; // Adjust the import path
import { Typography } from "@mui/material";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (err) {
        setError("Failed to fetch event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!event) return <p>No event found.</p>;

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Event Details
      </Typography>
      <Card className="mb-3" style={{ borderColor: "#000520" }}>
        <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
          <h5 className="mb-0">Event Information</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Event ID:</strong> {event.eventId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Name:</strong> {event.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Start Date:</strong>{" "}
              {new Date(event.startEvent).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>End Date:</strong>{" "}
              {new Date(event.endEvent).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {event.description}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-3" style={{ borderColor: "#000520" }}>
        <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
          <h5 className="mb-0">Games</h5>
        </Card.Header>
        <Card.Body>
          {event.games && event.games.length > 0 ? (
            <ListGroup variant="flush">
              {event.games.map((game, index) => (
                <ListGroup.Item key={index}>
                  <strong>Game {index + 1}:</strong> {game.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No games associated with this event.</p>
          )}
        </Card.Body>
      </Card>

      <div className="mt-4"></div>
    </div>
  );
};

export default EventDetails;
