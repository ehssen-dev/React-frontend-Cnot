import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceService from "../../../services/CommunicationInterne/InvoiceService";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [formValues, setFormValues] = useState({
    invoiceNumber: "",
    totalAmount: "",
    invoiceDate: "",
    dueDate: "",
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Enum values for the status
  const statusOptions = ["PAID", "UNPAID", "OVERDUE", "PENDING", "APPROVED"];

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await InvoiceService.getInvoiceById(invoiceId);
        setFormValues(response.data);
      } catch (err) {
        setError("Failed to fetch invoice details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      await InvoiceService.updateInvoice(invoiceId, formValues);
      setSuccess("Invoice updated successfully.");
      setTimeout(() => navigate("/admin/invoice"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Error updating invoice.");
      console.error("Error updating invoice", err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Invoice
        </Typography>

        {error && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">{success}</Alert>
          </Snackbar>
        )}

        <TextField
          name="invoiceNumber"
          label="Invoice Number"
          fullWidth
          margin="normal"
          value={formValues.invoiceNumber}
          onChange={handleChange}
          helperText="Unique identifier for the invoice."
          required
        />
        <TextField
          name="totalAmount"
          label="Total Amount"
          type="number"
          fullWidth
          margin="normal"
          value={formValues.totalAmount}
          onChange={handleChange}
          helperText="Total amount due for this invoice."
          required
        />
        <TextField
          name="invoiceDate"
          label="Invoice Date"
          type="date"
          fullWidth
          margin="normal"
          value={formValues.invoiceDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          helperText="Date the invoice was issued."
          required
        />
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          value={formValues.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          helperText="Date by which the invoice must be paid."
          required
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          value={formValues.description}
          onChange={handleChange}
          helperText="Additional details about the invoice."
        />

        {/* Dropdown for Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formValues.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/invoices")}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditInvoice;
