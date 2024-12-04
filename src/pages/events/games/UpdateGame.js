import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGameById,
  updateGame,
} from "../../../services/CommunicationInterne/GameService";
import moment from "moment";
import "leaflet/dist/leaflet.css";

const LocationSelector = ({ setLocation }) => {
  const [marker, setMarker] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);
      setLocation({ latitude: lat, longitude: lng });
    },
  });

  return marker ? <Marker position={marker} /> : null;
};

const UpdateGame = () => {
  const [form] = Form.useForm();
  const { gameId } = useParams(); // Assuming you pass gameId in the route
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    // Fetch the game details to populate the form
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGameById(gameId);
        setGameDetails(gameData);

        // Parse the location string into latitude and longitude
        const [latitude, longitude] = gameData.location.split(", ").map(Number);
        setLocation({ latitude, longitude });

        // Set form fields
        form.setFieldsValue({
          eventId: gameData.event.eventId,
          name: gameData.name,
          startGame: gameData.startGame ? moment(gameData.startGame) : null,
          endGame: gameData.endGame ? moment(gameData.endGame) : null,
          description: gameData.description,
        });
      } catch (error) {
        message.error("Failed to load game details");
        console.error("Failed to load game:", error);
      }
    };

    fetchGameDetails();
  }, [gameId, form]);

  const handleFinish = async (values) => {
    try {
      const updatedGame = {
        ...values,
        startGame: values.startGame.format("YYYY-MM-DD"),
        endGame: values.endGame.format("YYYY-MM-DD"),
        event: { eventId: values.eventId },
        location: location ? `${location.latitude}, ${location.longitude}` : "",
      };
      await updateGame(gameId, updatedGame);
      message.success("Game updated successfully!");
      navigate("/admin/game-list");
    } catch (error) {
      message.error("Failed to update game");
      console.error("Failed to update game:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Update Game</h2>
      {gameDetails ? (
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="eventId"
            label="Event ID"
            rules={[{ required: true, message: "Please enter the event ID" }]}
          >
            <Input placeholder="Enter event ID" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the game name" }]}
          >
            <Input placeholder="Enter game name" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please enter the game date" }]}
          >
            <DatePicker
              placeholder="Select game date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Map for Selecting Location */}
          <Form.Item label="Location" required>
            <MapContainer
              style={{ height: "300px", width: "100%" }}
              center={[
                location ? location.latitude : 36.8065, // Default to Tunis if location is null
                location ? location.longitude : 10.1815,
              ]}
              zoom={13}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationSelector setLocation={setLocation} />
            </MapContainer>
            {location && (
              <p>
                Selected Location: Latitude: {location.latitude}, Longitude:{" "}
                {location.longitude}
              </p>
            )}
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the game description" },
            ]}
          >
            <Input.TextArea placeholder="Enter game description" rows={4} />
          </Form.Item>

          <Form.Item
            name="startGame"
            label="Start Game"
            rules={[
              { required: true, message: "Please select the game start date" },
            ]}
          >
            <DatePicker
              placeholder="Select start date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="endGame"
            label="End Game"
            rules={[
              { required: true, message: "Please select the game end date" },
            ]}
          >
            <DatePicker
              placeholder="Select end date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Game
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Loading game details...</p>
      )}
    </div>
  );
};

export default UpdateGame;
