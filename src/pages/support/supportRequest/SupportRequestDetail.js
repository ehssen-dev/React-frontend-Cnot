// src/components/SupportRequestDetail.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getSupportRequestById } from "../../../services/CommunicationInterne/SupportRequestService";
import SupportResponseService from "../../../services/CommunicationInterne/SupportResponseService";

const SupportRequestDetail = () => {
  const { supportRequestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseLoading, setResponseLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getSupportRequestById(supportRequestId);
        setRequest(data);
      } catch (error) {
        setError("Failed to fetch support request");
        console.error("Failed to fetch support request:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [supportRequestId]);

  const onFinish = async (values) => {
    setResponseLoading(true);
    try {
      await SupportResponseService.createSupportResponse(
        supportRequestId,
        values
      );
      message.success("Response added successfully!");
      navigate("/admin/support-requests");
    } catch (error) {
      message.error("Failed to add response.");
      console.error("Failed to add response:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <h2>Support Request Details</h2>
      <Card title={`Request ID: ${request.supportRequestId}`}>
        <p>
          <strong>Subject:</strong> {request.subject}
        </p>
        <p>
          <strong>Description:</strong> {request.description}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>
        {/* Display additional details as needed */}
      </Card>

      <Form
        name="supportResponse"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          message: "",
          montant: "",
          attachments: null,
        }}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          label="Response Message"
          name="message"
          rules={[
            { required: true, message: "Please enter the response message" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Amount" name="montant">
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Attachments"
          name="attachments"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Input type="file" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={responseLoading}>
            Submit Response
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SupportRequestDetail;
