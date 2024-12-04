import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SupplierService from "../../../services/CommunicationInterne/SupplierService";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await SupplierService.getAllSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error loading suppliers:", error);
    }
  };

  const handleDelete = async (supplierId) => {
    try {
      await SupplierService.deleteSupplier(supplierId);
      loadSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Suppliers
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/add-supplier")}>
          Add Supplier
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Information</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>On-Time Delivery Rate</TableCell>
              <TableCell>Quality Rating</TableCell>
              <TableCell>Past Issues</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.supplierId}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactInformation}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.onTimeDeliveryRate}</TableCell>
                <TableCell>{supplier.qualityControlRating}</TableCell>
                <TableCell>{supplier.numberOfPastIssues}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-supplier/${supplier.supplierId}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(supplier.supplierId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </DashboardLayout>
  );
};

export default SupplierList;
