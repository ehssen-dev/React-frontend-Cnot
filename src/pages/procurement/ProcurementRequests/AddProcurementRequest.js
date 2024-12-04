import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import ProcurementRequestService from "../../../services/CommunicationInterne/ProcurementRequestService";

const { TextArea } = Input;

const AddProcurementRequest = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Construct the request payload from form values
      const requestPayload = {
        userIdentifier: values.userIdentifier, // Corrected key to match backend
        requestedGoods: values.requestedGoods,
        quantity: values.quantity,
        estimatedCost: values.estimatedCost,
        justification: values.justification,
        description: values.description, // Optional field
      };

      await ProcurementRequestService.createProcurementRequest(requestPayload);
      message.success("Procurement request added successfully!");
      navigate("/admin/procurement-request");
    } catch (error) {
      message.error("Failed to add procurement request!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <h2>Add Procurement Request</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          quantity: 1,
          estimatedCost: 0,
        }}
      >
        <Form.Item
          label="User Identifier"
          name="userIdentifier"
          rules={[
            { required: true, message: "Please enter the user identifier" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Requested Goods"
          name="requestedGoods"
          rules={[
            { required: true, message: "Please enter the requested goods" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="Estimated Cost"
          name="estimatedCost"
          rules={[
            { required: true, message: "Please enter the estimated cost" },
          ]}
        >
          <InputNumber min={0} step={0.01} />
        </Form.Item>

        <Form.Item
          label="Justification"
          name="justification"
          rules={[
            { required: true, message: "Please provide a justification" },
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Procurement Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProcurementRequest;
