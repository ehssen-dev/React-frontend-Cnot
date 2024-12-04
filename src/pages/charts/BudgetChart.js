// src/components/BudgetChart.js
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
import apiClient from "../../services/apiClient";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BudgetChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "/projects/stats/total-budget-allocation"
        );
        const data = response.data;

        const labels = Object.keys(data);
        const values = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Budget Allocation",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h2>Total Budget Allocation by Project</h2>
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
              text: "Total Budget Allocation by Project",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1000, // Adjust the step size for readability
              },
              suggestedMin: 0,
              suggestedMax:
                Math.max(...Object.values(chartData.datasets[0]?.data || [])) +
                1000,
            },
          },
        }}
      />
    </div>
  );
};

export default BudgetChart;
