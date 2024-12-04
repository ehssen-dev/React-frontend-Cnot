import React, { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DepartmentService from "../../services/CommunicationInterne/DepartmentService"; // Ensure correct import

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsData = await DepartmentService.getAllDepartments();
        setDepartments(departmentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load departments");
        setLoading(false);
        console.error(err);
      }
    };

    fetchDepartments();
  }, []);

  const handleEdit = (departmentId) => {
    navigate(`/admin/edit-department/${departmentId}`);
  };

  const handleDelete = async (departmentId) => {
    try {
      await DepartmentService.deleteDepartment(departmentId);
      setDepartments((prev) =>
        prev.filter((department) => department.departmentId !== departmentId)
      );
      message.success("Department deleted successfully!");
    } catch (err) {
      setError("Failed to delete department!");
      console.error(err);
    }
  };

  const handleAdd = () => {
    navigate("/admin/department-list/add");
  };

  const handleViewDetails = (departmentId) => {
    navigate(`/admin/department-details/${departmentId}`);
  };

  const columns = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Information",
      dataIndex: "contactInformation",
      key: "contactInformation",
    },
    {
      title: "Responsibilities",
      dataIndex: "responsibilities",
      key: "responsibilities",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleViewDetails(record.departmentId)}
          >
            Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.departmentId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.departmentId)}
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
    total: departments.length,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography.Title level={4}>Department Dashboard</Typography.Title>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Department
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={departments}
        pagination={paginationProps}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default DepartmentList;
