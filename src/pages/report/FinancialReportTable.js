import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  styled,
  TablePagination,
  Box,
} from "@mui/material";
import { getAllFinancialReports } from "../../services/CommunicationInterne/FinancialReportService";

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: "calc(100vh - 64px)", // Adjust based on your header height
  overflow: "auto", // Hide scrollbars
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  width: "100%", // Ensure the table width fits the container
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: "bold",
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const FinancialReportTable = () => {
  const [financialReports, setFinancialReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        const reports = await getAllFinancialReports();
        setFinancialReports(reports);
      } catch (error) {
        console.error("Error fetching financial reports:", error);
        setError("Failed to fetch financial reports");
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialReports();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <StyledTableContainer component={Paper}>
      <Box textAlign="center" marginBottom="20px">
        <Typography variant="h4" gutterBottom>
          Financial Report
        </Typography>
      </Box>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>ID</StyledTableHeadCell>
            <StyledTableHeadCell>Date</StyledTableHeadCell>
            <StyledTableHeadCell>Report Period</StyledTableHeadCell>
            <StyledTableHeadCell>Type</StyledTableHeadCell>
            <StyledTableHeadCell>Total Expenditure</StyledTableHeadCell>
            <StyledTableHeadCell>Total Budgets</StyledTableHeadCell>
            <StyledTableHeadCell>Remaining Budget</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {financialReports
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((report) => (
              <StyledTableRow key={report.freportId}>
                <StyledTableCell>{report.freportId}</StyledTableCell>
                <StyledTableCell>
                  {new Date(report.reportDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{report.reportPeriod}</StyledTableCell>
                <StyledTableCell>{report.reportType}</StyledTableCell>
                <StyledTableCell>
                  {report.totalIncome.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell>
                  {report.totalExpenditure.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell>{report.netIncome.toFixed(2)}</StyledTableCell>
              </StyledTableRow>
            ))}
          {financialReports.length === 0 && (
            <TableRow>
              <StyledTableCell colSpan={7} align="center">
                No financial reports available
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={financialReports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledTableContainer>
  );
};

export default FinancialReportTable;
