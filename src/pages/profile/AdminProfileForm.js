import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Card,
  Avatar,
} from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import moment from "moment";
import AuthService from "../../services/AuthService";

const { Title } = Typography;
const { Option } = Select;

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AuthService.getUser();
        setUser(user);

        form.setFieldsValue({
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: moment(user.dateOfBirth),
          email: user.email,
          username: user.username,
          role: user.role || "USER",
        });
      } catch (error) {
        message.error("Failed to load user data.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      };

      await AuthService.updateUser(formattedValues);

      message.success("Profile information saved successfully!");
    } catch (error) {
      message.error("Error saving profile information.");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#f56a00" }}
        />
        <Title level={2} style={{ marginTop: "1rem" }}>
          Profile
        </Title>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          role: user ? user.role : "USER",
        }}
      >
        <Divider orientation="left">Personal Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                { required: true, message: "Please select your date of birth" },
              ]}
            >
              <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email" },
                { required: true, message: "Please enter your email" },
              ]}
            >
              <Input placeholder="Email" prefix={<MailOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Account Details</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select your role" }]}
            >
              <Select placeholder="Select Role">
                <Option value="SUPER_ADMIN">Super Admin</Option>
                <Option value="ADMIN">Admin</Option>
                <Option value="MODERATOR">Moderator</Option>
                <Option value="USER">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              borderRadius: "5px",
            }}
          >
            Save Profile Information
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileForm;
