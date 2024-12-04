import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import PurchaseOrderService from "../../../services/CommunicationInterne/PurchaseOrderService";
import ProjectService from "../../../services/CommunicationInterne/projectService"; // Assuming this service fetches the projects
import SupplierService from "../../../services/CommunicationInterne/SupplierService"; // Assuming this service fetches suppliers

const { TextArea } = Input;
const { Option } = Select;

const AddPurchaseOrder = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const [suppliers, setSuppliers] = useState([]); // Initialize as an empty array
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [manualProjectId, setManualProjectId] = useState(""); // State to track manual project ID input
  const [manualSupplierId, setManualSupplierId] = useState(""); // State to track manual supplier ID input
  const [useManualProjectId, setUseManualProjectId] = useState(false); // Flag to toggle manual input vs select dropdown
  const [useManualSupplierId, setUseManualSupplierId] = useState(false); // Flag to toggle manual input vs select dropdown
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects
    ProjectService.getAllProjects()
      .then((response) => {
        console.log("Projects fetched:", response); // Log the response for debugging
        if (Array.isArray(response)) {
          setProjects(response); // If response is an array of projects, use it
        } else {
          setProjects([]); // Fallback if response is not an array
        }
        setLoadingProjects(false);
      })
      .catch((error) => {
        message.error("Failed to fetch projects");
        console.error("Error fetching projects:", error);
        setLoadingProjects(false);
      });

    // Fetch suppliers
    SupplierService.getAllSuppliers()
      .then((response) => {
        console.log("Suppliers fetched:", response); // Log the response for debugging
        if (Array.isArray(response)) {
          setSuppliers(response); // If response is an array of suppliers, use it
        } else {
          setSuppliers([]); // Fallback if response is not an array
        }
        setLoadingSuppliers(false);
      })
      .catch((error) => {
        message.error("Failed to fetch suppliers");
        console.error("Error fetching suppliers:", error);
        setLoadingSuppliers(false);
      });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const {
        quantity,
        purchaseName,
        description,
        unitPrice,
        purchaseDate,
        expectedDeliveryDate,
        status,
      } = values;

      const projectId = useManualProjectId ? manualProjectId : values.projectId; // Use the manual input if selected
      const supplierId = useManualSupplierId
        ? manualSupplierId
        : values.supplierId; // Use the manual input if selected

      if (!projectId || !supplierId) {
        message.error("Project or Supplier not found");
        return;
      }

      await PurchaseOrderService.createPurchaseOrder({
        quantity,
        purchaseName,
        description,
        unitPrice,
        purchaseDate: purchaseDate.format("YYYY-MM-DDTHH:mm:ssZ"),
        expectedDeliveryDate: expectedDeliveryDate.format(
          "YYYY-MM-DDTHH:mm:ssZ"
        ),
        status,
        projectId, // Pass the projectId here
        supplierId, // Pass the supplierId here
      });
      message.success("Purchase order added successfully!");
      navigate("/admin/purchase-order");
    } catch (error) {
      message.error("Failed to add purchase order!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <h2>Add Purchase Order</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          quantity: 1,
          unitPrice: 0,
          status: "PENDING",
        }}
      >
        <Form.Item
          label="Purchase Name"
          name="purchaseName"
          rules={[
            { required: true, message: "Please enter the purchase name" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="Unit Price"
          name="unitPrice"
          rules={[{ required: true, message: "Please enter the unit price" }]}
        >
          <InputNumber min={0} step={0.01} />
        </Form.Item>

        <Form.Item
          label="Purchase Date"
          name="purchaseDate"
          rules={[
            { required: true, message: "Please select the purchase date" },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="Expected Delivery Date"
          name="expectedDeliveryDate"
          rules={[
            {
              required: true,
              message: "Please select the expected delivery date",
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter the status" }]}
        >
          <Input />
        </Form.Item>

        {/* Project Selection: Dropdown or Manual Input */}
        <Form.Item
          label="Project"
          name="projectId"
          rules={[{ required: false, message: "Please select a project" }]}
        >
          <Select
            placeholder="Select project"
            loading={loadingProjects}
            style={{ width: "100%" }}
            disabled={loadingProjects || useManualProjectId}
            onChange={() => setUseManualProjectId(false)} // Switch off manual input when project is selected
          >
            {projects.map((project) => (
              <Option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Manual Project ID Input */}
        <Form.Item
          label="Or Enter Project ID"
          name="manualProjectId"
          rules={[
            {
              required: useManualProjectId,
              message: "Please enter the project ID",
            },
          ]}
        >
          <Input
            disabled={!useManualProjectId}
            value={manualProjectId}
            onChange={(e) => setManualProjectId(e.target.value)}
            placeholder="Enter project ID"
          />
        </Form.Item>

        {/* Supplier Selection: Dropdown or Manual Input */}
        <Form.Item
          label="Supplier"
          name="supplierId"
          rules={[{ required: false, message: "Please select a supplier" }]}
        >
          <Select
            placeholder="Select supplier"
            loading={loadingSuppliers}
            style={{ width: "100%" }}
            disabled={loadingSuppliers || useManualSupplierId}
            onChange={() => setUseManualSupplierId(false)} // Switch off manual input when supplier is selected
          >
            {suppliers.map((supplier) => (
              <Option key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.supplierName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Manual Supplier ID Input */}
        <Form.Item
          label="Or Enter Supplier ID"
          name="manualSupplierId"
          rules={[
            {
              required: useManualSupplierId,
              message: "Please enter the supplier ID",
            },
          ]}
        >
          <Input
            disabled={!useManualSupplierId}
            value={manualSupplierId}
            onChange={(e) => setManualSupplierId(e.target.value)}
            placeholder="Enter supplier ID"
          />
        </Form.Item>

        {/* Toggle Button */}
        <Form.Item>
          <Button
            type="link"
            onClick={() => setUseManualProjectId(!useManualProjectId)}
          >
            {useManualProjectId
              ? "Select from List"
              : "Enter Project ID Manually"}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            onClick={() => setUseManualSupplierId(!useManualSupplierId)}
          >
            {useManualSupplierId
              ? "Select from List"
              : "Enter Supplier ID Manually"}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Purchase Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPurchaseOrder;
