import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const FinancialReportChart = ({ projectId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/financial-reports/project/${projectId}`)
      .then((response) => {
        const reports = response.data;

        // Extract data for chart
        const labels = reports.map((report) => report.reportPeriod);
        const incomeData = reports.map((report) => report.totalIncome);
        const expenditureData = reports.map(
          (report) => report.totalExpenditure
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Total Income",
              data: incomeData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Total Expenditure",
              data: expenditureData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [projectId]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Financial Report Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default FinancialReportChart;
