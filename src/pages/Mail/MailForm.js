import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Upload,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Container, Card, CardContent } from "@mui/material";
import MailService from "../../services/CommunicationInterne/mailService";

const { TextArea } = Input;

const MailForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const isRecipientsRequired = (recipientType) => {
    return recipientType === "custom";
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);

      const { recipientType, recipients, qualificationType, ...rest } = values;

      // Create a FormData object
      const formData = new FormData();
      formData.append("senderEmail", rest.sender); // Ensure this matches the backend key

      // Check if recipientType is "custom" and format recipients properly
      const formattedRecipients = isRecipientsRequired(recipientType)
        ? recipients
            .split(",")
            .map((email) => email.trim())
            .join(",")
        : "";
      formData.append("recipientEmails", formattedRecipients);

      formData.append("subject", rest.subject);
      formData.append("content", rest.message);
      if (qualificationType) {
        formData.append("qualificationType", qualificationType);
      }

      // Append files to FormData
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj); // Ensure this matches the backend key
      });

      // Log the formData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let result;

      switch (recipientType) {
        case "all-entities":
          result = await MailService.sendMailToAllEntities(formData);
          break;
        case "all-athletes":
          result = await MailService.sendMailToAllAthletes(formData);
          break;
        case "all-delegations":
          result = await MailService.sendMailToAllDelegations(formData);
          break;
        case "all-users":
          result = await MailService.sendMailToAllUsers(formData);
          break;
        case "custom":
          result = await MailService.sendMail(formData);
          break;
        default:
          throw new Error("Invalid recipient type");
      }

      message.success("Mail sent successfully!");
      console.log("Result:", result);
      form.resetFields();
      setFileList([]); // Clear file list after submission
    } catch (error) {
      message.error(error.message || "Failed to send mail. Please try again.");
      console.error("Mail sending error:", error);
    }
  };
  const handleRecipientTypeChange = (e) => {
    const recipientType = e.target.value;
    if (!isRecipientsRequired(recipientType)) {
      form.setFieldsValue({ recipients: "" });
    }
    form.validateFields(["recipients"]);
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
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ recipientType: "", qualificationType: "" }}
          >
            <Form.Item
              label="Sender"
              name="sender"
              rules={[
                {
                  required: true,
                  message: "Please input the sender email!",
                },
              ]}
            >
              <Input placeholder="Enter sender email" />
            </Form.Item>

            <Form.Item
              label="Recipients"
              name="recipients"
              rules={[
                {
                  required: isRecipientsRequired(
                    form.getFieldValue("recipientType")
                  ),
                  message: "Please input the recipients!",
                },
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
              label="Recipient Type"
              name="recipientType"
              rules={[
                {
                  required: true,
                  message: "Please select recipient type!",
                },
              ]}
            >
              <Radio.Group onChange={handleRecipientTypeChange}>
                <Radio.Button value="all-entities">All Entities</Radio.Button>
                <Radio.Button value="all-athletes">All Athletes</Radio.Button>
                <Radio.Button value="all-delegations">
                  All Delegations
                </Radio.Button>
                <Radio.Button value="all-users">All Users</Radio.Button>
                <Radio.Button value="custom">Custom</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Qualification Type"
              name="qualificationType"
              rules={[
                {
                  required: true,
                  message: "Please select qualification type!",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="URGENT">URGENT</Radio.Button>
                <Radio.Button value="HIGH_PRIORITY">HIGH PRIORITY</Radio.Button>
                <Radio.Button value="NORMAL">NORMAL</Radio.Button>
                <Radio.Button value="LOW_PRIORITY">LOW PRIORITY</Radio.Button>
              </Radio.Group>
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
                      onSuccess(); // Call onSuccess to indicate successful file upload
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

export default MailForm;
