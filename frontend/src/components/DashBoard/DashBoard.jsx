import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashBoard = () => {
  const projects = useSelector((state) => state.project.projects);
  console.log("Projects Data:", projects);

  // Group projects by status and count them
  const projectCounts = projects?.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart-friendly format
  const data = Object.keys(projectCounts || {}).map((status) => ({
    status,
    count: projectCounts[status],
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-gray-200 my-32">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Project Status Overview 📊
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="status" tick={{ fill: "#4b5563" }} />
            <YAxis tick={{ fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
            />
            <Bar
              dataKey="count"
              fill="url(#colorGradient)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No projects available.</p>
      )}
    </div>
  );
};

export default DashBoard;
