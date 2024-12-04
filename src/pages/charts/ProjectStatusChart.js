import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectStatusChart = ({ data }) => {
  const chartData = {
    labels: ["Active", "Completed", "Pending"],
    datasets: [
      {
        data: [data.active, data.completed, data.pending],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
        hoverBackgroundColor: ["#66bb6a", "#42a5f5", "#ffb74d"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default ProjectStatusChart;
