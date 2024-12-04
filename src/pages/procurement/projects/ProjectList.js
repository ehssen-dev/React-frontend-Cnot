import React, { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectService from "../../../services/CommunicationInterne/projectService";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    ProjectService.getAllProjects()
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching projects");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/admin/edit-project/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    try {
      await ProjectService.deleteProject(projectId);
      setProjects((prev) =>
        prev.filter((project) => project.projectId !== projectId)
      );
      message.success("Project deleted successfully!");
    } catch (err) {
      setError("Failed to delete project!");
      console.error(err);
    }
  };

  const handleAdd = () => {
    navigate("/admin/project-list/add");
  };

  const handleViewDetails = (projectId) => {
    navigate(`/admin/project-details/${projectId}`);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleViewDetails(record.projectId)}
          >
            Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.projectId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.projectId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const paginationProps = {
    current: page,
    pageSize,
    total: projects.length,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography.Title level={4}>Project Dashboard</Typography.Title>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Project
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        pagination={paginationProps}
        rowKey="projectId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default ProjectList;
