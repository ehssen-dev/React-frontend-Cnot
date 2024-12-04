import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import apiClient from "../../../services/apiClient"; // Ensure the path is correct

ChartJS.register(Title, Tooltip, Legend);

const ProjectCountByStatusChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = Object.keys(data).map((status) =>
        status.replace("_", " ")
      );
      const values = Object.values(data);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Project Count by Status",
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      });
    }
  }, [data]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div style={{ height: "490px", width: "490px" }}>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ProjectCountByStatusChart;
