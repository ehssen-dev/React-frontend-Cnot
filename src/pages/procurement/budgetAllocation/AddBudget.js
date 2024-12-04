import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectService from "../../../services/CommunicationInterne/projectService";
import BudgetAllocationService from "../../../services/CommunicationInterne/BudgetAllocationService";
import {
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
// Adjusted BudgetStatus enum
const BudgetStatus = {
  PENDING: "PENDING",
  ESCALATED: "ESCALATED",
  COMPLETED: "COMPLETED",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL",
  GOOD: "GOOD",
  IN_DANGER: "IN_DANGER",
  NORMAL: "NORMAL",
};

// Adjusted Category enum with uppercase keys
const Category = {
  EQUIPMENT: "EQUIPMENT",
  SUPPLIES: "SUPPLIES",
  SERVICES: "SERVICES",
  TRAINING: "TRAINING",
  TRAVEL: "TRAVEL",
  MAINTENANCE: "MAINTENANCE",
  CONSULTING: "CONSULTING",
  SOFTWARE: "SOFTWARE",
  HARDWARE: "HARDWARE",
  CONTRACTS: "CONTRACTS",
  OTHER: "OTHER",
};

const AddBudget = () => {
  const [projects, setProjects] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [budgetAllocation, setBudgetAllocation] = useState({
    allocatedAmount: "",
    usedBudget: "",
    remainingBudget: "",
    startDate: "",
    endDate: "",
    budgetStatus: "",
    category: "",
    projectId: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    ProjectService.getAllProjects()
      .then((response) => {
        const projectsData = response.data;
        setProjects(projectsData);
        setProjectOptions(
          projectsData.map((project) => ({
            value: project.projectId,
            label: project.projectName,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch projects");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetAllocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BudgetAllocationService.createBudgetAllocation(budgetAllocation);
      navigate("/admin/budget-tracking");
    } catch (err) {
      setError("Failed to add budget allocation");
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "113vh",
      }}
    >
      <Card sx={{ mb: 0.5, width: "900px", borderRadius: 2 }}>
        <CardContent>
          <div className="flex items-center justify-center p-12 bg-gray-100 min-h-screen">
            <div className="mx-auto w-full max-w-[750px] rounded-lg bg-white shadow-lg p-8">
              <Card
                sx={{
                  mb: 3,
                  boxShadow: 5,
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1.5px solid #ddd",
                  fontWeight: "bold",
                  //maxWidth: "fit-content",
                  mx: "left", // Center horizontally if needed
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    Add New Budget
                  </Typography>
                </CardContent>
              </Card>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="projectId"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Select Project
                  </label>
                  <select
                    name="projectId"
                    value={budgetAllocation.projectId}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  >
                    <option value="">Select Project</option>
                    {projectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="allocatedAmount"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Allocated Amount
                  </label>
                  <input
                    type="number"
                    name="allocatedAmount"
                    value={budgetAllocation.allocatedAmount}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="startDate"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={budgetAllocation.startDate}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="endDate"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={budgetAllocation.endDate}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Budget Status Field */}
                <div className="mb-5">
                  <label
                    htmlFor="budgetStatus"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Budget Status
                  </label>
                  <select
                    name="budgetStatus"
                    value={budgetAllocation.budgetStatus}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  >
                    <option value="">Select Status</option>
                    {Object.values(BudgetStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Field */}
                <div className="mb-5">
                  <label
                    htmlFor="category"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={budgetAllocation.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {Object.values(Category).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="hover:shadow-form w-full rounded-md bg-[#5c6789] py-3 px-8 text-center text-base font-semibold text-white outline-none transition hover:bg-[#011244]"
                  >
                    Submit
                  </button>
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddBudget;
