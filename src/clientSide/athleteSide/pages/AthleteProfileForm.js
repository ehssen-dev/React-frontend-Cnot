import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  InputNumber,
  Row,
  Col,
  Typography,
  Divider,
  message,
} from "antd";
import { UserOutlined, MailOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import AuthService from "../../../services/AuthService"; // getUser is here
import athleteService from "../../../services/CommunicationInterne/AthleteService"; // getAthleteById is here

const { Title } = Typography;
const { Option } = Select;

const AthleteProfileForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const user = await AuthService.getUser();
        const athleteId = user.athleteId;

        const athleteData = await athleteService.getAthleteById(athleteId);
        setAthlete(athleteData);

        form.setFieldsValue({
          firstName: athleteData.firstName,
          lastName: athleteData.lastName,
          dateOfBirth: moment(athleteData.dateOfBirth),
          email: athleteData.email,
          username: athleteData.username,
          gender: athleteData.gender, // Gender enum value here
          city: athleteData.city,
          phnum: athleteData.phnum,
          cin: athleteData.cin,
          sport: athleteData.sport,
        });
      } catch (error) {
        message.error("Failed to load athlete data.");
        console.error("Error fetching athlete data:", error);
      }
    };

    fetchAthleteData();
  }, [form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      };

      const athleteId = athlete?.athleteId;

      if (!athleteId) {
        throw new Error("Athlete ID not found.");
      }

      await athleteService.updateAthlete(athleteId, formattedValues);

      message.success("Profile information saved successfully!");
    } catch (error) {
      message.error("Error saving profile information.");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
        Athlete Profile
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          bloque: false,
          age: 18,
          gender: athlete ? athlete.gender : "MALE", // Default to MALE enum value
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
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select placeholder="Select Gender">
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Contact Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phnum"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Phone Number"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="National ID (CIN)"
              name="cin"
              rules={[
                { required: true, message: "Please enter your national ID" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="CIN" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Additional Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sport" name="sport">
              <Input placeholder="Sport" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Profile Photo" name="photo">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload Profile Photo</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Save Profile Information
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AthleteProfileForm;
