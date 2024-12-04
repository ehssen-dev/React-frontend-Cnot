import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import BudgetIcon from "../assets/img/DT.png"; // Adjust the path to your icon

import KPIBox from "./charts/KPIBox";
import BudgetChart from "./charts/BudgetChart";
import FinancialReportChart from "./reports/FinancialReportChart";
import ProjectCountByStatusChart from "../pages/procurement/projects/ProjectCountByStatusChart";
import ProjectsByDateChart from "./charts/ProjectsByDateChart";
import FinancialChart from "./charts/FinancialChart";

import ProjectService from "../services/CommunicationInterne/projectService";
import {
  getAllFinancialReports,
  getFinancialReportChartData,
} from "../services/CommunicationInterne/FinancialReportService";

const DashboardPage = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [ongoingProjects, setOngoingProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetUsed, setBudgetUsed] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState({
    active: 0,
    completed: 0,
    pending: 0,
  });
  const [projects, setProjects] = useState([]);
  const [financialReports, setFinancialReports] = useState([]);
  const [projectStatusData, setProjectStatusData] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [financialChartData, setFinancialChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchDashboardData(),
          fetchFinancialReports(),
          fetchProjectStatusData(),
          fetchTotalBudgetUsed(), // Fetch the total budget allocation
        ]);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchFinancialChartData();
    }
  }, [startDate, endDate, selectedProjectId]);

  const fetchDashboardData = async () => {
    try {
      const response = await ProjectService.getAllProjects();
      const projectsData = response.data;

      if (Array.isArray(projectsData)) {
        setTotalProjects(projectsData.length);

        const ongoing = projectsData.filter(
          (project) => project.status === "IN_PROGRESS"
        ).length;
        const completed = projectsData.filter(
          (project) => project.status === "COMPLETED"
        ).length;

        setOngoingProjects(ongoing);
        setCompletedProjects(completed);

        setStatusDistribution({
          active: ongoing,
          completed: completed,
          pending: projectsData.filter(
            (project) => project.status === "PLANNING"
          ).length,
        });

        setProjects(projectsData);

        const totalBudget = projectsData.reduce(
          (sum, project) =>
            sum +
            project.budgetAllocations.reduce(
              (budgetSum, allocation) => budgetSum + allocation.allocatedAmount,
              0
            ),
          0
        );
        setTotalBudget(totalBudget);
      } else {
        throw new Error("Invalid projects data format");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to fetch dashboard data");
    }
  };

  const fetchFinancialReports = async () => {
    try {
      const response = await getAllFinancialReports();
      const financialReportsData = response.data;
      if (Array.isArray(financialReportsData)) {
        setFinancialReports(financialReportsData);
      } else {
        throw new Error("Financial reports data is not an array");
      }
    } catch (error) {
      console.error("Error fetching financial reports:", error);
      setError("");
    }
  };

  const fetchProjectStatusData = async () => {
    try {
      const response = await ProjectService.getProjectCountByStatus();
      setProjectStatusData(response.data);
    } catch (error) {
      console.error("Error fetching project status data:", error);
      setError("Failed to fetch project status data");
    }
  };

  const fetchFinancialChartData = async () => {
    try {
      const response = await getFinancialReportChartData(
        startDate,
        endDate,
        selectedProjectId
      );
      setFinancialChartData(response.data);
    } catch (error) {
      console.error("Error fetching financial chart data:", error);
      setError("Failed to fetch financial chart data");
    }
  };

  const fetchTotalBudgetUsed = async () => {
    try {
      const response = await ProjectService.getTotalBudgetAllocationByProject();
      const budgetData = response.data;

      const totalBudgetUsed = Object.values(budgetData).reduce(
        (sum, value) => sum + value,
        0
      );
      setBudgetUsed(totalBudgetUsed);
    } catch (error) {
      console.error("Error fetching total budget allocation:", error);
      setError("Failed to fetch total budget allocation");
    }
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
  };
  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US", { style: "decimal" }).format(number);
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <KPIBox title="Total Projects" value={totalProjects} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPIBox title="Ongoing Projects" value={ongoingProjects} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPIBox
            title="Budget Used"
            value={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center" // Ensures horizontal centering
                sx={{ height: "100%" }} // Ensures it takes the full height of KPIBox
              >
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ marginRight: 1 }}
                >
                  {formatNumber(budgetUsed)}
                </Typography>
                <img
                  src={BudgetIcon}
                  alt="Budget Icon"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </Box>
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 1.5, width: "100%", height: 550 }}>
            <Typography variant="h6">Project Status Distribution</Typography>
            {projectStatusData ? (
              <ProjectCountByStatusChart data={projectStatusData} />
            ) : (
              <Typography>Loading chart data...</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Projects by Date Range</Typography>
            <TextField
              type="date"
              name="startDate"
              label="Start Date"
              variant="outlined"
              value={startDate}
              onChange={handleDateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              name="endDate"
              label="End Date"
              variant="outlined"
              value={endDate}
              onChange={handleDateChange}
              fullWidth
              margin="normal"
            />
            <ProjectsByDateChart startDate={startDate} endDate={endDate} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2, width: "100%" }}>
            <BudgetChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, width: "100%" }}>
            <Typography variant="h6">Financial Chart</Typography>
            <TextField
              select
              label="Select Project"
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedProjectId || ""}
              onChange={handleProjectChange}
              SelectProps={{ native: true }}
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </TextField>
            {financialChartData ? (
              <FinancialChart data={financialChartData} />
            ) : (
              <Typography>Loading financial chart data...</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Financial Report Chart</Typography>
            <FinancialReportChart financialReports={financialReports} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
