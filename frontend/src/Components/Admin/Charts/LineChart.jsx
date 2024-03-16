import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
// Sample data for the line chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Visitors',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    // You can add more datasets here if you want
  ],
};
function MyLineChart() {
  return (
    <div>
      <h2>Monthly Visitors</h2>
      <Line data={data} />
    </div>
  );
}
export default MyLineChart;