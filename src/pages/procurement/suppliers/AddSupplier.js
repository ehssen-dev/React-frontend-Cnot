import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SupplierService from "../../../services/CommunicationInterne/SupplierService";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";

const AddSupplier = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    contactInformation: "",
    address: "",
    email: "",
    onTimeDeliveryRate: "",
    qualityControlRating: "",
    numberOfPastIssues: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await SupplierService.createSupplier(formValues);
      navigate("/admin/suppliers");
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Add Supplier
        </Typography>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          name="contactInformation"
          label="Contact Information"
          fullWidth
          margin="normal"
          value={formValues.contactInformation}
          onChange={handleChange}
        />
        <TextField
          name="address"
          label="Address"
          fullWidth
          margin="normal"
          value={formValues.address}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          name="onTimeDeliveryRate"
          label="On-Time Delivery Rate"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.onTimeDeliveryRate}
          onChange={handleChange}
        />
        <TextField
          name="qualityControlRating"
          label="Quality Rating"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.qualityControlRating}
          onChange={handleChange}
        />
        <TextField
          name="numberOfPastIssues"
          label="Number of Past Issues"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.numberOfPastIssues}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
      </Container>
    </DashboardLayout>
  );
};

export default AddSupplier;
