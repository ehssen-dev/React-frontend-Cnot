import React, { useEffect, useState } from "react";
import { Table, Button, Space, Dropdown, Menu, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BudgetAllocationService from "../../../services/CommunicationInterne/BudgetAllocationService";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import AsyncSelect from "react-select/async";

const BudgetAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch budget allocations and projects
    Promise.all([
      BudgetAllocationService.getAllBudgetAllocations(),
      ProjectService.getAllProjects(),
    ])
      .then(([allocationsResponse, projectsResponse]) => {
        setAllocations(allocationsResponse.data);
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

  const handleEdit = (budgetId) => {
    navigate(`/admin/budget-allocations/edit/${budgetId}`);
  };

  const handleDelete = async (budgetId) => {
    try {
      await BudgetAllocationService.deleteBudgetAllocation(budgetId);
      setAllocations((prev) =>
        prev.filter((allocation) => allocation.budgetId !== budgetId)
      );
      message.success("Budget allocation deleted successfully!");
    } catch (err) {
      setError("Failed to delete budget allocation!");
      console.error(err);
    }
  };

  const handleAdd = () => {
    navigate("/admin/budget-tracking/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectId",
      key: "projectId",
      render: (text) =>
        projects.find((project) => project.value === text)?.label || "Unknown",
    },
    {
      title: "Allocated Amount",
      dataIndex: "allocatedAmount",
      key: "allocatedAmount",
    },
    {
      title: "Used Amount",
      dataIndex: "usedBudget",
      key: "usedBudget",
    },
    {
      title: "Remaining Amount",
      dataIndex: "remainingBudget",
      key: "remainingBudget",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "budgetStatus",
      key: "budgetStatus",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.budgetId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.budgetId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Filter allocations based on selected project
  const filteredAllocations = allocations.filter((allocation) => {
    if (!selectedProject || selectedProject.value === "All Projects") {
      return true;
    }
    return allocation.projectId === selectedProject.value;
  });

  const paginationProps = {
    current: page,
    pageSize,
    total: filteredAllocations.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Budget Allocations
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
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Budget
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredAllocations}
        pagination={paginationProps}
        rowKey="budgetId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default BudgetAllocations;
