import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import SolidarityService from "../../../services/CommunicationInterne/SolidarityService";
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import {
  Info as InfoIcon,
  Report as ReportIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { generateFinancialReport } from "../../../services/CommunicationInterne/FinancialReportService";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [solidarityOptions, setSolidarityOptions] = useState([]);
  const [selectedSolidarity, setSelectedSolidarity] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [error, setError] = useState(null);
  const [generatedReportId, setGeneratedReportId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalBudget, setTotalBudget] = useState(null);

  // Fetch project details and solidarity options
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await ProjectService.getProjectById(projectId);
        setProject(response.data);
        setSelectedSolidarity(
          response.data.solidarityOlympic
            ? response.data.solidarityOlympic.solidarityOlympicId
            : ""
        );
        setStartDate(
          response.data.startDate
            ? new Date(response.data.startDate).toISOString().split("T")[0]
            : ""
        );
        setEndDate(
          response.data.endDate
            ? new Date(response.data.endDate).toISOString().split("T")[0]
            : ""
        );
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError("Failed to fetch project details. Please try again later.");
      }
    };

    const fetchSolidarityOptions = async () => {
      try {
        const response = await SolidarityService.getAllSolidarityOlympics();
        setSolidarityOptions(response.data);
      } catch (error) {
        console.error("Error fetching solidarity options:", error);
        setError("Failed to fetch solidarity options. Please try again later.");
      }
    };

    fetchProjectDetails();
    fetchSolidarityOptions();
  }, [projectId]);

  // Handle the generation of the financial report
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setError(null);

    try {
      const response = await generateFinancialReport(
        startDate,
        endDate,
        projectId
      );

      console.log("API Response:", response); // Debugging output

      // Check the correct path for reportId based on the actual response format
      const freportId = response?.data?.freportId || response?.freportId;

      if (freportId) {
        setGeneratedReportId(freportId);
      } else {
        alert(
          "No report generated. Please check the parameters and try again."
        );
      }
    } catch (err) {
      console.error("Error generating financial report:", err);
      if (err.response && err.response.data) {
        setError(
          `Failed to generate financial report: ${err.response.data.message}`
        );
      } else {
        setError(
          "Failed to generate financial report. Please try again later."
        );
      }
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Handle associating project with solidarity olympic
  const handleAssociation = async () => {
    if (!selectedSolidarity) {
      alert(
        "Please select a valid Solidarity Olympic Program before associating."
      );
      return;
    }

    try {
      await ProjectService.associateProjectWithSolidarityOlympic(
        projectId,
        selectedSolidarity
      );
      alert("Project associated with Solidarity Olympic successfully!");
    } catch (error) {
      console.error(
        "Error associating project with Solidarity Olympic:",
        error
      );
      alert("Failed to associate project.");
    }
  };

  // Navigate to the report view page
  const handleViewReport = () => {
    if (generatedReportId) {
      navigate(`/report/${generatedReportId}`);
    } else {
      alert("No report available to view.");
    }
  };

  // Render loading message if project data is not loaded yet
  if (!project) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Card sx={{ mb: 0.5 }}>
        <CardContent>
          <Paper elevation={3} style={{ padding: "30px", marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {project.projectName}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {project.description}
            </Typography>

            <Divider style={{ margin: "20px 0" }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon style={{ marginRight: "8px" }} />
                  Project Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Start Date"
                      secondary={new Date(
                        project.startDate
                      ).toLocaleDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="End Date"
                      secondary={new Date(project.endDate).toLocaleDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Validation Date"
                      secondary={
                        project.validationDate
                          ? new Date(
                              project.validationDate
                            ).toLocaleDateString()
                          : "N/A"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Status" secondary={project.status} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Department"
                      secondary={
                        project.department ? project.department.name : "N/A"
                      }
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  <ReportIcon style={{ marginRight: "8px" }} />
                  Reports
                </Typography>
                {/* Technical Report Display */}
                <Box mb={2}>
                  <Typography variant="subtitle1">
                    <AssignmentIcon style={{ marginRight: "8px" }} />
                    Technical Report
                  </Typography>
                  {project.technicalReport ? (
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Report Date"
                          secondary={new Date(
                            project.technicalReport.reportDate
                          ).toLocaleDateString()}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Report Period"
                          secondary={project.technicalReport.reportPeriod}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Report Type"
                          secondary={project.technicalReport.reportType}
                        />
                      </ListItem>
                    </List>
                  ) : (
                    <Typography>No technical report available</Typography>
                  )}
                </Box>

                {/* Financial Report Display */}
                <Box>
                  <Typography variant="subtitle1">
                    <AssignmentIcon style={{ marginRight: "8px" }} />
                    Financial Report
                  </Typography>
                  {project.financialReport ? (
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Report Date"
                          secondary={new Date(
                            project.financialReport.reportDate
                          ).toLocaleDateString()}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Report Period"
                          secondary={project.financialReport.reportPeriod}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Report Type"
                          secondary={project.financialReport.reportType}
                        />
                      </ListItem>
                    </List>
                  ) : (
                    <Typography>No financial report available</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Divider style={{ margin: "20px 0" }} />

            <Typography variant="h6" gutterBottom>
              Report Submission Date
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Report Submission Date"
                  secondary={
                    project.reportSubmissionDate
                      ? new Date(
                          project.reportSubmissionDate
                        ).toLocaleDateString()
                      : "N/A"
                  }
                />
              </ListItem>
            </List>
            <Divider style={{ margin: "20px 0" }} />

            {/* Solidarity Olympic Program Selection */}
            <Typography variant="h6" gutterBottom>
              Solidarity Olympic Program
            </Typography>

            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <InputLabel id="solidarity-select-label">
                Select Solidarity Olympic
              </InputLabel>
              <Select
                labelId="solidarity-select-label"
                value={selectedSolidarity}
                onChange={(e) => setSelectedSolidarity(e.target.value)}
                label="Select Solidarity Olympic"
              >
                {solidarityOptions.length > 0 ? (
                  solidarityOptions.map((option) => (
                    <MenuItem
                      key={option.solidarityOlympicId}
                      value={option.solidarityOlympicId}
                    >
                      {option.programName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No options available</MenuItem>
                )}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAssociation}
              style={{ marginBottom: "20px" }}
            >
              Associate with Solidarity Olympic
            </Button>

            <Divider style={{ margin: "20px 0" }} />

            {/* Date Inputs for Report Generation */}
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            {/* Button to Generate Financial Report */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
            >
              {isGeneratingReport
                ? "Generating Report..."
                : "Generate Financial Report"}
            </Button>

            {/* Button to View Generated Report */}
            {generatedReportId && (
              <Button
                variant="contained"
                color="info"
                onClick={handleViewReport}
                style={{ marginTop: "20px" }}
              >
                View Generated Report
              </Button>
            )}

            {/* Display Error Message */}
            {error && (
              <Typography color="error" style={{ marginTop: "20px" }}>
                {error}
              </Typography>
            )}
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProjectDetails;
