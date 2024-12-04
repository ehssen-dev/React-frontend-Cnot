// src/components/AddDelegation.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createDelegation } from "../../services/CommunicationInterne/DelegationService"; // Adjust the import path

const AddDelegation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createDelegation(values);
      message.success("Delegation added successfully!");
      navigate("/admin/delegation-list");
    } catch (error) {
      message.error("Failed to add delegation.");
      console.error("Failed to add delegation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <h2>Add New Delegation</h2>
      <Form
        name="addDelegation"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          delegationName: "",
          country: "",
          email: "",
        }}
      >
        <Form.Item
          label="Delegation Name"
          name="delegationName"
          rules={[
            { required: true, message: "Please enter the delegation name" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please enter the country" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "The input is not a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Delegation
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDelegation;
