import React, { useEffect, useState } from "react";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import SolidarityService from "../../../services/CommunicationInterne/SolidarityService";

import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "../../../components/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../components/common/Navbars/DashboardNavbar";

const AssociateProject = () => {
  const [projects, setProjects] = useState([]);
  const [solidarityOlympics, setSolidarityOlympics] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSolidarityOlympic, setSelectedSolidarityOlympic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectService.getAllProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchSolidarityOlympics = async () => {
      try {
        // Assuming there's a service method to get all Solidarity Olympics
        const response = await SolidarityService.getAllSolidarityOlympics();
        setSolidarityOlympics(response.data);
      } catch (error) {
        console.error("Error fetching Solidarity Olympics:", error);
      }
    };

    fetchProjects();
    fetchSolidarityOlympics();
  }, []);

  const handleAssociate = async () => {
    setLoading(true);
    try {
      await ProjectService.associateProjectWithSolidarityOlympic(
        selectedProject,
        selectedSolidarityOlympic
      );
      alert("Project associated with Solidarity Olympic successfully!");
    } catch (error) {
      console.error("Error associating project:", error);
      alert("Failed to associate project.");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Paper elevation={3} style={{ padding: "30px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Associate Project with Solidarity Olympic
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="project-select-label">Select Project</InputLabel>
                <Select
                  labelId="project-select-label"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.projectId} value={project.projectId}>
                      {project.projectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="solidarity-olympic-select-label">
                  Select Solidarity Olympic
                </InputLabel>
                <Select
                  labelId="solidarity-olympic-select-label"
                  value={selectedSolidarityOlympic}
                  onChange={(e) => setSelectedSolidarityOlympic(e.target.value)}
                >
                  {solidarityOlympics.map((so) => (
                    <MenuItem key={so.solidarityOlympicId} value={so.solidarityOlympicId}>
                      {so.programName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAssociate}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Associate"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default AssociateProject;
