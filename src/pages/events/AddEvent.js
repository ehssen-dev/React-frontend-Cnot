import React from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/CommunicationInterne/EventService"; // Adjust the import path

const AddEvent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const event = {
        name: values.name,
        startEvent: values.startEvent.format("YYYY-MM-DD"),
        endEvent: values.endEvent.format("YYYY-MM-DD"),
        description: values.description,
      };
      await createEvent(event);
      message.success("Event added successfully!");
      navigate("/admin/event-list"); // Redirect to event list after adding
    } catch (error) {
      message.error("Failed to add event");
      console.error("Failed to add event:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Event</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          startEvent: null,
          endEvent: null,
        }}
      >
        <Form.Item
          name="name"
          label="Event Name"
          rules={[{ required: true, message: "Please enter the event name" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the event description" },
          ]}
        >
          <Input.TextArea placeholder="Enter event description" rows={4} />
        </Form.Item>

        <Form.Item
          name="startEvent"
          label="Start Event"
          rules={[
            { required: true, message: "Please select the event start date" },
          ]}
        >
          <DatePicker
            placeholder="Select start date"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="endEvent"
          label="End Event"
          rules={[
            { required: true, message: "Please select the event end date" },
          ]}
        >
          <DatePicker placeholder="Select end date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEvent;
