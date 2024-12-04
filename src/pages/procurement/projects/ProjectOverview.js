import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import { Container, Typography, Box, Paper } from "@mui/material";

const ProjectOverview = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    ProjectService.getProjectById(projectId)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project details", error);
      });
  }, [projectId]);

  return (
    <Container>
      {project && (
        <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            {project.projectName}
          </Typography>
          <Typography variant="body1">{project.description}</Typography>
          <Box mt={2}>
            <Typography variant="body2">
              Start Date: {new Date(project.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              End Date: {new Date(project.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">Status: {project.status}</Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default ProjectOverview;
