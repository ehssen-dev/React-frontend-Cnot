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
import moment from "moment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TimelineChart = ({ projects }) => {
  const chartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: "Project Duration (in days)",
        data: projects.map((project) => {
          const start = moment(project.startDate);
          const end = moment(project.endDate);
          return end.diff(start, "days");
        }),
        backgroundColor: "#00acc1",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TimelineChart;
