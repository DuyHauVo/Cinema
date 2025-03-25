import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Màu sắc cho các phần
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function DashboardPi({ topTheaters }) {
  // Tính tổng giá trị (value) của tất cả các phần
  const total = topTheaters.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div className="w-full h-96 p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-center mb-4">Biểu đồ phân phối</h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={topTheaters}
            dataKey="total" // Sử dụng 'value' để tính toán biểu đồ
            nameKey="name" // Sử dụng 'name' để hiển thị tên
            outerRadius={120}
            fill="#8884d8"
            label
            
          >
            {topTheaters.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${((value / total) * 100).toFixed(2)}%`} // Hiển thị phần trăm
            labelFormatter={(label) => `Phân loại: ${label}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardPi;
