import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import DepartmentService from "../../services/CommunicationInterne/DepartmentService";

const AddDepartment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      // Construct the department DTO object to send to the backend
      const departmentDTO = {
        name: values.name,
        email: values.email,
        contactInformation: values.contactInformation,
        responsibilities: values.responsibilities,
      };

      // Call the service to create the department
      const response = await DepartmentService.createDepartment(departmentDTO);
      message.success("Department added successfully!");
      navigate("/admin/department-list"); // Navigate to department listing page
    } catch (error) {
      message.error("Failed to add department");
      console.error("Failed to add department:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Department</h2>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Department Name"
          rules={[
            { required: true, message: "Please enter the department name" },
          ]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the department email" },
          ]}
        >
          <Input placeholder="Enter department email" />
        </Form.Item>

        <Form.Item
          name="contactInformation"
          label="Contact Information"
          rules={[
            {
              required: true,
              message: "Please enter the department contact information",
            },
          ]}
        >
          <Input placeholder="Enter contact information" />
        </Form.Item>

        <Form.Item
          name="responsibilities"
          label="Responsibilities"
          rules={[
            {
              required: true,
              message: "Please enter the department responsibilities",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter responsibilities" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Department
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDepartment;
