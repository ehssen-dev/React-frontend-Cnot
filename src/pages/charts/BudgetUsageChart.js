import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetUsageChart = ({ used, total }) => {
  const chartData = {
    labels: ["Budget"],
    datasets: [
      {
        label: "Used Budget",
        data: [used],
        backgroundColor: "#3f51b5",
      },
      {
        label: "Remaining Budget",
        data: [total - used],
        backgroundColor: "#f44336",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BudgetUsageChart;
