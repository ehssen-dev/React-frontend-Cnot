import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../../services/CommunicationInterne/GameService";
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

const AddGame = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const handleFinish = async (values) => {
    try {
      const game = {
        ...values,
        startGame: values.startGame.format("YYYY-MM-DD"),
        endGame: values.endGame.format("YYYY-MM-DD"),
        event: { eventId: values.eventId },
        location: location ? `${location.latitude}, ${location.longitude}` : "", // Format location for request
      };
      await createGame(game);
      message.success("Game added successfully!");
      navigate("/admin/game-list");
    } catch (error) {
      message.error("Failed to add game");
      console.error("Failed to add game:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Game</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          startGame: null,
          endGame: null,
        }}
      >
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
            center={[36.8065, 10.1815]} // Coordinates for Tunis, Tunisia
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
          <DatePicker placeholder="Select end date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Game
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddGame;
