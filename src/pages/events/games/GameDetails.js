import React, { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGameById,
  deleteGame,
} from "../../../services/CommunicationInterne/GameService";
import { Typography } from "@mui/material";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const data = await getGameById(gameId);
        setGame(data);
      } catch (err) {
        setError("Failed to fetch game details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleEdit = () => {
    navigate(`/games/edit/${gameId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteGame(gameId);
      message.success("Game deleted successfully!");
      navigate("/games"); // Redirect to games list after deletion
    } catch (err) {
      setError("Failed to delete game");
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!game) return <p>No game found.</p>;

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <Typography variant="h4" gutterBottom>
        Game Details
      </Typography>
      {/* Row to display multiple cards side by side */}
      <Row className="mb-3">
        {/* Game ID and Name */}
        <Col md={4}>
          <Card style={{ borderColor: "#000520", marginBottom: "1rem" }}>
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h5 className="mb-0">Game ID and Name</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Game ID:</strong> {game.gameId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Name:</strong> {game.name}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Dates (Start and End) */}
        <Col md={4}>
          <Card style={{ borderColor: "#000520", marginBottom: "1rem" }}>
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h5 className="mb-0">Game Dates</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Date:</strong>{" "}
                  {new Date(game.date).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Start Date:</strong>{" "}
                  {new Date(game.startGame).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>End Date:</strong>{" "}
                  {new Date(game.endGame).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Location and Description */}
        <Col md={4}>
          <Card style={{ borderColor: "#000520", marginBottom: "1rem" }}>
            <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
              <h5 className="mb-0">Location and Description</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Location:</strong> {game.location}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {game.description}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Event Details */}
      {game.event && (
        <Card className="mb-3" style={{ borderColor: "#000520" }}>
          <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
            <h5 className="mb-0">Event Details</h5>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Event ID:</strong> {game.event.eventId}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Event Name:</strong> {game.event.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Start Date:</strong>{" "}
                {new Date(game.event.startEvent).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>End Date:</strong>{" "}
                {new Date(game.event.endEvent).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {game.event.description}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {/* Athletes */}
      <Card className="mb-3" style={{ borderColor: "#000520" }}>
        <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
          <h5 className="mb-0">Athletes</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {game.athletes.length > 0 ? (
              game.athletes.map((athlete) => (
                <ListGroup.Item key={athlete.athleteId}>
                  {athlete.firstName} {athlete.lastName} - {athlete.sport}
                </ListGroup.Item>
              ))
            ) : (
              <p>No athletes assigned to this game.</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      {/* Result */}

      <Card className="mb-3" style={{ borderColor: "#000520" }}>
        <Card.Header style={{ backgroundColor: "#000520", color: "#fff" }}>
          <h5 className="mb-0">Result</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {game.result ? (
              <>
                <ListGroup.Item>
                  <strong>Result Number:</strong> {game.result.resultNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Winner:</strong> {game.result.winner}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Runner-Up:</strong> {game.result.runnerUp}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Third Place:</strong> {game.result.thirdPlace}
                </ListGroup.Item>
              </>
            ) : (
              <p>No result available for this game.</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      <div className="mt-4"></div>
    </div>
  );
};

export default GameDetails;
