import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProcurementRequestService from "../../../services/CommunicationInterne/ProcurementRequestService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ProcurementRequestsOverview = ({ projectId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    ProcurementRequestService.getProcurementRequestsByProjectId(projectId)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching procurement requests", error);
      });
  }, [projectId]);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
        Procurement Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Requested Goods</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.requestId}>
              <TableCell>{request.requestId}</TableCell>
              <TableCell>{request.requestedGoods}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Define propTypes for validation
ProcurementRequestsOverview.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProcurementRequestsOverview;
