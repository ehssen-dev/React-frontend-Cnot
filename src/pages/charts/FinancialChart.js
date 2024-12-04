import React from "react";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

const FinancialChart = ({ data }) => {
  // Check if data is valid
  if (
    !data ||
    data["Total Expenditure"] === undefined ||
    data["Total Income"] === undefined
  ) {
    return (
      <Typography color="textSecondary">
        No financial chart data available
      </Typography>
    );
  }

  // Prepare data for chart
  const chartData = {
    labels: ["Total Expenditure", "Total Income"],
    datasets: [
      {
        label: "Financial Data",
        data: [data["Total Expenditure"], data["Total Income"]],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default FinancialChart;
