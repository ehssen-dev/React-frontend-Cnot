import React, { useEffect, useState } from "react";
import ProjectService from "../../services/CommunicationInterne/projectService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Add this import
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
);

const ProjectDurationChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = "2024-01-01";
        const endDate = "2024-12-31";
        const response = await ProjectService.getProjectsInDateRange(
          startDate,
          endDate
        );
        const projects = response.data;

        // Transform data for the chart
        const transformedData = projects.map((project) => ({
          date: new Date(project.startDate).toLocaleDateString(),
          duration:
            (new Date(project.endDate) - new Date(project.startDate)) /
            (1000 * 60 * 60 * 24), // Duration in days
        }));

        setChartData({
          labels: transformedData.map((item) => item.date),
          datasets: [
            {
              label: "Project Duration (Days)",
              data: transformedData.map((item) => item.duration),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Project Durations Over Time</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `Duration: ${tooltipItem.raw} days`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            y: {
              title: {
                display: true,
                text: "Duration (Days)",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ProjectDurationChart;
