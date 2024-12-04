import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import InvoiceService from "../../../services/CommunicationInterne/InvoiceService";
import ProjectService from "../../../services/CommunicationInterne/projectService";

const { TextArea } = Input;
const { Option } = Select;

// Updated statuses to match the backend enum
const InvoiceStatuses = ["PAID", "UNPAID", "OVERDUE", "PENDING", "APPROVED"];

const AddInvoice = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects for the dropdown
    ProjectService.getAllProjects()
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        message.error("Failed to fetch projects");
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  const handleFinish = async (values) => {
    try {
      const invoice = {
        ...values,
        invoiceDate: values.invoiceDate.format("YYYY-MM-DD"),
        dueDate: values.dueDate.format("YYYY-MM-DD"),
      };

      await InvoiceService.createInvoice(invoice);
      message.success("Invoice added successfully!");
      navigate("/admin/invoice");
    } catch (error) {
      message.error("Failed to add invoice");
      console.error("Failed to add invoice:", error);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff" }}>
      <h2>Add New Invoice</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          invoiceDate: null,
          dueDate: null,
        }}
      >
        <Form.Item
          name="invoiceDate"
          label="Invoice Date"
          rules={[
            { required: true, message: "Please select the invoice date" },
          ]}
        >
          <DatePicker
            placeholder="Select invoice date"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select the due date" }]}
        >
          <DatePicker placeholder="Select due date" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the invoice description" },
          ]}
        >
          <TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            { required: true, message: "Please select the invoice status" },
          ]}
        >
          <Select placeholder="Select Status" style={{ width: "100%" }}>
            {InvoiceStatuses.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="projectId"
          label="Project"
          rules={[{ required: true, message: "Please select the project" }]}
        >
          <Select
            placeholder="Select Project"
            loading={loading}
            style={{ width: "100%" }}
          >
            {projects.map((project) => (
              <Option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Invoice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddInvoice;
