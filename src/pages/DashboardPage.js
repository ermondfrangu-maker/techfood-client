import Sidebar from "../components/Sidebar";
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import "./DashboardPage.css";

function DashboardPage() {

  const role =
    localStorage.getItem("role");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [stats, setStats] =
    useState({});

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://scrambled-vagabond-payer.ngrok-free.dev/api/auth/dashboard-stats",
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const chartData = [

    {
      month: "Jan",
      orders: 12,
    },

    {
      month: "Feb",
      orders: 19,
    },

    {
      month: "Mar",
      orders: 28,
    },

    {
      month: "Apr",
      orders: 35,
    },

    {
      month: "May",
      orders: 42,
    },

    {
      month: "Jun",
      orders: 51,
    },

  ];

  const pieData = [

    {
      name: "Accepted",
      value:
        stats.accepted || 8,
    },

    {
      name: "Pending",
      value:
        stats.pending || 3,
    },

    {
      name: "Rejected",
      value: 2,
    },

  ];

  const COLORS = [
    "#00ffae",
    "#f59e0b",
    "#ef4444",
  ];

  return (

    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              {
                user?.name ||
                "TechFood User"
              }
            </p>

          </div>

          <div className="dashboard-role">

            {
              role === "supplier"
                ? "Supplier Panel"
                : "Restaurant Panel"
            }

          </div>

        </div>

        <div className="stats-grid">

          {role === "supplier" && (

            <>

              <StatCard
                title="Products"
                value={stats.products}
                icon="📦"
                color="blue"
              />

              <StatCard
                title="Orders"
                value={stats.orders}
                icon="🛒"
                color="green"
              />

              <StatCard
                title="Pending"
                value={stats.pending}
                icon="⏳"
                color="orange"
              />

              <StatCard
                title="Accepted"
                value={stats.accepted}
                icon="✅"
                color="purple"
              />

            </>

          )}

          {role === "restaurant" && (

            <>

              <StatCard
                title="Orders"
                value={stats.orders}
                icon="🛒"
                color="green"
              />

              <StatCard
                title="Cart Items"
                value={stats.cart}
                icon="🧾"
                color="orange"
              />

              <StatCard
                title="Suppliers"
                value={stats.suppliers}
                icon="🏪"
                color="blue"
              />

            </>

          )}

        </div>

        <div className="charts-grid">

          <div className="chart-card">

            <h2>
              Orders Growth 📈
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={chartData}
              >

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#00ffae"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="chart-card">

            <h2>
              Order Status 📊
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                >

                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="charts-grid">

          <div className="chart-card">

            <h2>
              Monthly Performance 🚀
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={chartData}
              >

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="orders"
                  fill="#00ffae"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="activity-card">

            <h2>
              Recent Activity
            </h2>

            <div className="activity-item">
              🚀 New order received
            </div>

            <div className="activity-item">
              📦 Product stock updated
            </div>

            <div className="activity-item">
              🛒 Restaurant placed order
            </div>

            <div className="activity-item">
              ✅ Order accepted
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

function StatCard({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div className={`stat-card ${color}`}>

      <div className="stat-top">

        <span className="stat-icon">
          {icon}
        </span>

      </div>

      <h3>{title}</h3>

      <h1>
        {value || 0}
      </h1>

    </div>

  );

}

export default DashboardPage;