import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import PurchaseOrderService from "../../../services/CommunicationInterne/PurchaseOrderService";
import ProjectService from "../../../services/CommunicationInterne/projectService"; // Assuming this is your service for projects
import AsyncSelect from "react-select/async";

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch purchase orders and projects
    Promise.all([
      PurchaseOrderService.getAllPurchaseOrders(),
      ProjectService.getAllProjects(),
    ])
      .then(([purchaseOrdersResponse, projectsResponse]) => {
        setPurchaseOrders(purchaseOrdersResponse.data);
        setProjects([
          { value: "All Projects", label: "All Projects" },
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

  const handleEdit = (purchaseId) => {
    navigate(`/admin/edit-purchase-order/${purchaseId}`);
  };

  const handleDelete = async (purchaseId) => {
    try {
      await PurchaseOrderService.deletePurchaseOrder(purchaseId);
      setPurchaseOrders((prev) =>
        prev.filter((order) => order.purchaseId !== purchaseId)
      );
      message.success("Purchase order deleted successfully!");
    } catch (err) {
      setError("Failed to delete purchase order!");
      console.error(err);
    }
  };

  const handleAdd = () => {
    navigate("/admin/purchase-order/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Purchase Name",
      dataIndex: "purchaseName",
      key: "purchaseName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (date) => new Date(date).toLocaleDateString(),
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
            onClick={() => handleEdit(record.purchaseId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.purchaseId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredPurchaseOrders = purchaseOrders.filter((order) => {
    if (!selectedProject || selectedProject.value === "All Projects") {
      return true;
    }
    return order.projectId === selectedProject.value;
  });

  const paginationProps = {
    current: page,
    pageSize,
    total: filteredPurchaseOrders.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography.Title level={4}>Purchase Orders</Typography.Title>
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
          Add Purchase Order
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPurchaseOrders}
        pagination={paginationProps}
        rowKey="purchaseId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default PurchaseOrderList;
