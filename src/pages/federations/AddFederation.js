import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import FederationService from "../../services/CommunicationInterne/FederationService"; // Adjust the import path

const AddFederation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await FederationService.addFederation(values);
      message.success("Federation added successfully!");
      navigate("/admin/federation-list"); // Redirect to federation list after adding
    } catch (error) {
      message.error("Failed to add federation");
      console.error("Failed to add federation:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Federation</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          name: "",
          description: "",
          email: "",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the federation name" },
          ]}
        >
          <Input placeholder="Enter federation name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter the federation description",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter federation description" rows={4} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the federation email" },
            { type: "email", message: "Please enter a valid email address" },
            { max: 50, message: "Email must be at most 50 characters" },
          ]}
        >
          <Input placeholder="Enter federation email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Federation
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddFederation;
