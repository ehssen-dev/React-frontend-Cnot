import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Select } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProcurementRequestService from "../../../services/CommunicationInterne/ProcurementRequestService";
import AsyncSelect from "react-select/async";

const { Option } = Select;

const ProcurementRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, selectedProject, selectedStatus]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response =
        await ProcurementRequestService.getAllProcurementRequests();
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      setError("There was an error fetching procurement requests!");
      setLoading(false);
    }
  };

  const filterRequests = async () => {
    try {
      if (selectedStatus === "ALL") {
        const filteredByProject = requests.filter((request) =>
          !selectedProject || selectedProject.value === "All Projects"
            ? true
            : request.projectId === selectedProject.value
        );
        setFilteredRequests(filteredByProject);
        return;
      }

      const response = await ProcurementRequestService.getPendingRequests();
      const pendingRequests = response.data;

      const filtered = requests.filter((request) =>
        pendingRequests.some(
          (pendingRequest) =>
            pendingRequest.requestId === request.requestId &&
            request.status === selectedStatus
        )
      );

      const finalFiltered = filtered.filter((request) =>
        !selectedProject || selectedProject.value === "All Projects"
          ? true
          : request.projectId === selectedProject.value
      );

      setFilteredRequests(finalFiltered);
    } catch (error) {
      setError("There was an error fetching pending procurement requests!");
    }
  };

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
    setSelectedStatus(value);
  };

  const handleEdit = (requestId) => {
    navigate(`/admin/edit-procurement-request/${requestId}`);
  };

  const handleApprove = async (requestId) => {
    try {
      await ProcurementRequestService.approveRequest(requestId);
      setRequests((prev) =>
        prev.map((request) =>
          request.requestId === requestId
            ? { ...request, status: "APPROVED" }
            : request
        )
      );
      filterRequests();
      message.success("Procurement request approved successfully!");
    } catch (error) {
      setError("Failed to approve procurement request!");
      console.error(error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await ProcurementRequestService.resetRequest(requestId);
      setRequests((prev) =>
        prev.map((request) =>
          request.requestId === requestId
            ? { ...request, status: "REJECTED" }
            : request
        )
      );
      filterRequests();
      message.success("Procurement request rejected successfully!");
    } catch (error) {
      setError("Failed to reject procurement request!");
      console.error(error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/procurement-request/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Request Number",
      dataIndex: "requestNumber",
      key: "requestNumber",
    },
    {
      title: "Requested By",
      dataIndex: "userIdentifier",
      key: "userIdentifier",
      render: (userIdentifier) => userIdentifier || "Unknown",
    },
    {
      title: "Requested Goods",
      dataIndex: "requestedGoods",
      key: "requestedGoods",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Estimated Cost",
      dataIndex: "estimatedCost",
      key: "estimatedCost",
      render: (cost) => `$${cost.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.requestId)}
          >
            Edit
          </Button>
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.requestId)}
            type="primary"
          >
            Approve
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.requestId)}
            danger
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const paginationProps = {
    current: page,
    pageSize,
    total: filteredRequests.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Procurement Requests
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Request
        </Button>
        <Select
          defaultValue="ALL"
          style={{ width: 200, marginLeft: 16 }}
          onChange={handleStatusChange}
        >
          <Option value="PENDING">Pending</Option>
          <Option value="APPROVED">Approved</Option>
          <Option value="REJECTED">Rejected</Option>
          <Option value="ALL">All</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredRequests}
        pagination={paginationProps}
        rowKey="requestId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default ProcurementRequestList;
