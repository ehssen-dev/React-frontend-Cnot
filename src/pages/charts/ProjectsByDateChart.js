import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import projectService from "../../services/CommunicationInterne/projectService";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ProjectsByDateChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectService.getProjectsByDateRange(
          startDate,
          endDate
        );
        const projects = response.data;

        // Debugging output
        console.log("Fetched projects:", projects);

        if (!Array.isArray(projects)) {
          console.error(
            "Expected an array of projects but received:",
            projects
          );
          return;
        }

        const labels = [];
        const data = [];

        projects.forEach((project) => {
          const month = project.startDate.substring(0, 7); // YYYY-MM
          if (!labels.includes(month)) {
            labels.push(month);
            data.push(1);
          } else {
            const index = labels.indexOf(month);
            data[index] += 1;
          }
        });

        // Debugging output
        console.log("Labels:", labels);
        console.log("Data:", data);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Projects",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data for chart:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Projects by Date Range</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Projects by Month",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Month",
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Number of Projects",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ProjectsByDateChart;
