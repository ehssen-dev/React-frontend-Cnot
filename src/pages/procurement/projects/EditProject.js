import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import SolidarityService from "../../../services/CommunicationInterne/SolidarityService";
import {
  Alert,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Enum for Project Status
const ProjectStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
  CANCELLED: "CANCELLED",
};

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [solidarityOptions, setSolidarityOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await ProjectService.getProjectById(projectId);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch project details");
        console.error(err);
        setLoading(false);
      }
    };

    const fetchSolidarityOptions = async () => {
      try {
        const response = await SolidarityService.getAllSolidarityOlympics();
        setSolidarityOptions(response.data);
      } catch (err) {
        setError("Failed to fetch solidarity options");
        console.error(err);
      }
    };

    fetchProjectDetails();
    fetchSolidarityOptions();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProjectService.updateProject(projectId, project);
      navigate(`/admin/projects/${projectId}`);
    } catch (err) {
      setError("Failed to update project");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12 bg-gray-100 min-h-screen">
      <div className="mx-auto w-full max-w-[750px] rounded-lg bg-white shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-[#07074D] mb-6">
          Edit Project Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-5">
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={project.projectName || ""}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={project.description || ""}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-5">
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              name="startDate"
              value={project.startDate || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-5">
            <TextField
              fullWidth
              label="End Date"
              type="date"
              name="endDate"
              value={project.endDate || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-5">
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={project.status || ""}
                onChange={handleChange}
                label="Status"
                variant="outlined"
                required
              >
                {Object.values(ProjectStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Solidarity Olympic Program */}
          <div className="mb-5">
            <FormControl fullWidth>
              <InputLabel id="solidarity-select-label">
                Solidarity Olympic Program
              </InputLabel>
              <Select
                labelId="solidarity-select-label"
                name="solidarityOlympic"
                value={project.solidarityOlympic || ""}
                onChange={handleChange}
                label="Solidarity Olympic Program"
                variant="outlined"
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
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Project
            </Button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mt-5">
              <Alert severity="error">{error}</Alert>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProject;
