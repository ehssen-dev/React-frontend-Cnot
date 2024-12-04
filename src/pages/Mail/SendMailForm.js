import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Row, Col, Select } from "antd";
import {
  UploadOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Container, Card, CardContent } from "@mui/material";
import MailService from "../../services/CommunicationInterne/mailService";

const { TextArea } = Input;
const { Option } = Select;

const SendMailForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleSubmit = async (values) => {
    try {
      const {
        sender,
        recipients,
        subject,
        message: content,
        qualificationType,
      } = values;

      // Create a FormData object
      const formData = new FormData();
      formData.append("senderEmail", sender); // Ensure this matches the backend key
      formData.append("recipient", recipients); // Ensure this matches the backend key
      formData.append("subject", subject);
      formData.append("content", content);
      formData.append("qualificationType", qualificationType); // Append qualification type

      // Append files to FormData
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj); // Ensure this matches the backend key
      });

      // Send mail request
      const result = await MailService.sendMail(formData);

      message.success("Mail sent successfully!");
      form.resetFields();
      setFileList([]); // Clear file list after submission
    } catch (error) {
      message.error(error.message || "Failed to send mail. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "125vh",
      }}
    >
      <Card sx={{ mb: 0.5, width: "900px", borderRadius: 2 }}>
        <CardContent>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Sender"
              name="sender"
              rules={[
                { required: true, message: "Please input the sender email!" },
              ]}
            >
              <Input placeholder="Enter sender email" />
            </Form.Item>

            <Form.Item
              label="Recipients"
              name="recipients"
              rules={[
                { required: true, message: "Please input the recipients!" },
              ]}
            >
              <Input placeholder="Enter recipients (comma-separated)" />
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: "Please input the subject!" }]}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please input the message!" }]}
            >
              <TextArea rows={4} placeholder="Enter message" />
            </Form.Item>

            <Form.Item
              label="Qualification Type"
              name="qualificationType"
              rules={[
                {
                  required: true,
                  message: "Please select a qualification type!",
                },
              ]}
            >
              <Select placeholder="Select qualification type">
                <Option value="URGENT">Urgent</Option>
                <Option value="HIGH_PRIORITY">High Priority</Option>
                <Option value="NORMAL">Normal</Option>
                <Option value="LOW_PRIORITY">Low Priority</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    block
                  >
                    Send
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Upload
                    name="files"
                    multiple
                    customRequest={({ file, onSuccess }) => {
                      setFileList((prev) => [...prev, file]);
                      onSuccess();
                    }}
                    fileList={fileList}
                    onChange={handleFileChange}
                    showUploadList
                  >
                    <Button icon={<UploadOutlined />} block>
                      Attach File
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    block
                    onClick={() => form.resetFields()}
                  >
                    Delete Draft
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SendMailForm;
