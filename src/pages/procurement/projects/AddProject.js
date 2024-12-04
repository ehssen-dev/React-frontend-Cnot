import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button, message, Spin } from "antd";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import DepartmentService from "../../../services/CommunicationInterne/DepartmentService";
import SolidarityService from "../../../services/CommunicationInterne/SolidarityService";

const { TextArea } = Input;
const { Option } = Select;

const AddProject = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [solidarityOlympics, setSolidarityOlympics] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingSolidarityOlympics, setLoadingSolidarityOlympics] =
    useState(true);

  useEffect(() => {
    // Fetch departments
    DepartmentService.getAllDepartments()
      .then((response) => {
        setDepartments(response);
        setLoadingDepartments(false);
      })
      .catch((error) => {
        message.error("Failed to fetch departments");
        console.error("Error fetching departments:", error);
        setLoadingDepartments(false);
      });

    // Fetch solidarity olympics
    SolidarityService.getAllSolidarityOlympics()
      .then((response) => {
        setSolidarityOlympics(response.data);
        setLoadingSolidarityOlympics(false);
      })
      .catch((error) => {
        message.error("Failed to fetch solidarity olympics");
        console.error("Error fetching solidarity olympics:", error);
        setLoadingSolidarityOlympics(false);
      });
  }, []);

  const handleFinish = async (values) => {
    try {
      const project = {
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        // Ensure the departmentId and solidarityOlympicId are included
        departmentId: values.departmentId,
        solidarityOlympicId: values.solidarityOlympicId,
        includedInProgram: values.includedInProgram || false, // Default to false if not provided
        status: values.status || "IN_PROGRESS", // Default to "IN_PROGRESS" if not provided
      };

      await ProjectService.createProject(project);
      message.success("Project added successfully!");
      navigate("/admin/project-list");
    } catch (error) {
      message.error("Failed to add project");
      console.error("Failed to add project:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Project</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          startDate: null,
          endDate: null,
          includedInProgram: true, // Default value for includedInProgram
          status: "IN_PROGRESS", // Default value for status
        }}
      >
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please enter the project name" }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the project description" },
          ]}
        >
          <TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Please select the start date" }]}
        >
          <DatePicker
            placeholder="Select start date"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: "Please select the end date" }]}
        >
          <DatePicker placeholder="Select end date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="departmentId"
          label="Department"
          rules={[{ required: true, message: "Please select a department" }]}
        >
          <Select
            placeholder="Select department"
            loading={loadingDepartments}
            style={{ width: "100%" }}
            disabled={loadingDepartments}
          >
            {departments.map((department) => (
              <Option
                key={department.departmentId}
                value={department.departmentId}
              >
                {department.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please enter the status" }]}
        >
          <Input placeholder="Enter status" />
        </Form.Item>

        <Form.Item
          name="includedInProgram"
          label="Included in Program"
          valuePropName="checked"
        >
          <Input type="checkbox" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Project
          </Button>
          <Button
            type="default"
            style={{ marginLeft: "8px" }}
            onClick={() => navigate("/projects")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProject;
