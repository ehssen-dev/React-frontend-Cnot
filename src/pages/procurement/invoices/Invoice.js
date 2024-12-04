import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InvoiceService from "../../../services/CommunicationInterne/InvoiceService";
import ProjectService from "../../../services/CommunicationInterne/projectService"; // Import the ProjectService
import AsyncSelect from "react-select/async";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null); // State for selected status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const getStatusText = (status) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "Paid";
      case "UNPAID":
        return "Unpaid";
      case "OVERDUE":
        return "Overdue";
      case "PENDING":
        return "Pending";
      case "APPROVED":
        return "Approved";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    // Fetch invoices and projects
    Promise.all([
      InvoiceService.getAllInvoices(),
      ProjectService.getAllProjects(),
    ])
      .then(([invoicesResponse, projectsResponse]) => {
        setInvoices(invoicesResponse.data);
        setProjects([
          { value: "All Projects", label: "All Projects" }, // Option to show all projects
          ...projectsResponse.data.map((project) => ({
            value: project.projectId,
            label: project.projectName,
          })),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setError("There was an error fetching the data!");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          projects.filter((project) =>
            project.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      }, 1000);
    });
  };

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value); // Update selected status filter
  };

  const handleEdit = (invoiceId) => {
    navigate(`/admin/invoice/edit/${invoiceId}`);
  };

  const handleDelete = async (invoiceId) => {
    try {
      await InvoiceService.deleteInvoice(invoiceId);
      setInvoices((prev) =>
        prev.filter((invoice) => invoice.invoiceId !== invoiceId)
      );
      message.success("Invoice deleted successfully!");
    } catch (err) {
      setError("Failed to delete invoice!");
      console.error(err);
    }
  };

  const handleAdd = () => {
    navigate("/admin/invoice/add");
  };

  const handleViewDetails = (invoiceId) => {
    navigate(`/admin/invoice/${invoiceId}`);
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusText(status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<FileTextOutlined />}
            onClick={() => handleViewDetails(record.invoiceId)}
          >
            Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.invoiceId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.invoiceId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Filter invoices based on selected project and status
  const filteredInvoices = invoices.filter((invoice) => {
    if (!selectedProject || selectedProject.value === "All Projects") {
      return true;
    }
    const matchesProject = invoice.projectId === selectedProject.value;
    const matchesStatus = selectedStatus
      ? invoice.status === selectedStatus
      : true;
    return matchesProject && matchesStatus;
  });

  const paginationProps = {
    current: page,
    pageSize,
    total: filteredInvoices.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <AsyncSelect
          cacheOptions
          defaultOptions={projects}
          loadOptions={promiseOptions}
          onChange={handleProjectChange}
          value={selectedProject}
          placeholder="Select Project"
          styles={{
            container: (provided) => ({
              ...provided,
              marginBottom: "16px",
            }),
            control: (provided) => ({
              ...provided,
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderColor: "#e0e0e0",
              "&:hover": {
                borderColor: "#6A64F1",
              },
            }),
          }}
        />
        <Select
          defaultValue="All Status"
          style={{ width: 200, marginBottom: 16 }}
          onChange={handleStatusChange}
        >
          <Select.Option value="PAID">Paid</Select.Option>
          <Select.Option value="UNPAID">Unpaid</Select.Option>
          <Select.Option value="OVERDUE">Overdue</Select.Option>
          <Select.Option value="PENDING">Pending</Select.Option>
          <Select.Option value="APPROVED">Approved</Select.Option>
        </Select>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Invoice
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInvoices}
        pagination={paginationProps}
        rowKey="invoiceId"
      />
    </div>
  );
};

export default Invoices;
