import React, { useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import SupportResponseService from "../../../services/CommunicationInterne/SupportResponseService";

const AddSupportResponse = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Encode files in Base64
      const attachments = await Promise.all(
        values.attachments.map(async (fileObj) => {
          const file = fileObj.originFileObj;
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        })
      );

      // Update values with encoded attachments
      const dataToSubmit = { ...values, attachments };

      const response = await SupportResponseService.createSupportResponse(
        dataToSubmit
      );
      message.success("Support response created successfully!");
    } catch (error) {
      message.error("Failed to create support response.");
      console.error("Failed to create support response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Support Response</h2>
      <Form name="addSupportResponse" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="montant"
          label="Amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="attachments"
          label="Attachments"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            multiple
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => onSuccess("ok"), 0);
            }}
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="supportRequestId"
          label="Support Request ID"
          rules={[
            { required: true, message: "Please enter the support request ID" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSupportResponse;
