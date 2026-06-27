import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    last7DaysLogins: 0,
    totalLogins: 0,
  });

  const [userStatus, setUserStatus] = useState({
    active: 0,
    inactive: 0,
  });

  const [loginStatus, setLoginStatus] = useState({
    success: 0,
    failed: 0,
  });

  const [loginTrend, setLoginTrend] = useState([]);

  useEffect(() => {

    // Dashboard Cards
    axios
      .get("http://localhost:8080/api/dashboard")
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error("Dashboard API Error:", error);
      });

    // User Status Chart
    axios
      .get("http://localhost:8080/api/dashboard/user-status")
      .then((response) => {
        setUserStatus(response.data);
      })
      .catch((error) => {
        console.error("User Status API Error:", error);
      });

    // Login Status Chart
    axios
      .get("http://localhost:8080/api/dashboard/login-status")
      .then((response) => {
        setLoginStatus(response.data);
      })
      .catch((error) => {
        console.error("Login Status API Error:", error);
      });

    // Login Trend Chart
    axios
      .get("http://localhost:8080/api/dashboard/login-trend")
      .then((response) => {
        setLoginTrend(response.data);
      })
      .catch((error) => {
        console.error("Login Trend API Error:", error);
      });

  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Pie Chart 1
  const userStatusData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [
          userStatus.active,
          userStatus.inactive,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Doughnut Chart
  const loginStatusData = {
    labels: ["Success", "Failed"],
    datasets: [
      {
        data: [
          loginStatus.success,
          loginStatus.failed,
        ],
        backgroundColor: [
          "#3b82f6",
          "#f59e0b",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart
  const loginTrendData = {
    labels: loginTrend.map(
      (item) => item.day
    ),

    datasets: [
      {
        label: "Logins",

        data: loginTrend.map(
          (item) => item.count
        ),

        borderColor: "#2563eb",

        backgroundColor:
          "rgba(37,99,235,0.2)",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">

      {/* <h1>User Access Dashboard</h1> */}

      {/* Cards */}

      <div className="card-container">

        <div className="card">
          <h3>Total Users</h3>
          <p>{dashboard.totalUsers}</p>
        </div>

        <div className="card">
          <h3>Active Users</h3>
          <p>{dashboard.activeUsers}</p>
        </div>

        <div className="card">
          <h3>Inactive Users</h3>
          <p>{dashboard.inactiveUsers}</p>
        </div>

        <div className="card">
          <h3>Last 7 Days Logins</h3>
          <p>{dashboard.last7DaysLogins}</p>
        </div>

        <div className="card">
          <h3>Total Logins</h3>
          <p>{dashboard.totalLogins}</p>
        </div>

      </div>

      {/* Charts */}

      <div className="charts-container">

        <div className="chart-card">
          <h3>Active vs Inactive Users</h3>

          <div className="chart-wrapper">
            <Pie
              data={userStatusData}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Success vs Failed Logins</h3>

          <div className="chart-wrapper">
            <Doughnut
              data={loginStatusData}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-card">
          <h3>Last 7 Days Login Trend</h3>

          <div className="chart-wrapper">
            <Line
              data={loginTrendData}
              options={chartOptions}
            />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;