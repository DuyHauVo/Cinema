import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#ff0000",
  "#00c49f",
];

function DashboardCharts({ topMovie }) {

  return (
    <div className="w-full h-96 p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-center mb-4">
        Doanh thu theo tháng
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={topMovie}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8">
            {topMovie.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardCharts;
