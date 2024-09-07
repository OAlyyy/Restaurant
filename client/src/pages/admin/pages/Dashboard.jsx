import React, { useState, useEffect } from "react";
import { fetchOrders, calculateSales } from "../../../firebase.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Css/Dashboard.css";

// Grouping sales by selected time range
const groupSalesByTime = (orders, timeRange) => {
  const groupedSales = {};

  orders.forEach((order) => {
    const timestamp = order.timestamp;
    if (!timestamp || typeof timestamp !== "object") return;

    const date = new Date(timestamp.seconds * 1000);
    let key;

    if (timeRange === "hour") {
      key = date.getHours();
    } else if (timeRange === "day") {
      const weekNumber = Math.ceil(date.getDate() / 7);
      key = `Week ${weekNumber}`;
    } else if (timeRange === "month") {
      key = date.toLocaleString('default', { month: 'long' });
    }

    if (!groupedSales[key]) groupedSales[key] = 0;
    groupedSales[key] += order.totalPrice || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  return Object.keys(groupedSales).map((key) => ({
    time: key,
    sales: groupedSales[key],
  }));
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState("hour");

  useEffect(() => {
    fetchOrders()
      .then((fetchedOrders) => {
        setOrders(fetchedOrders);

        const totalSales = calculateSales(fetchedOrders);
        setSales(totalSales);

        const groupedData = groupSalesByTime(fetchedOrders, timeRange);
        setSalesData(groupedData);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="time-range-selector">
          <button onClick={() => handleTimeRangeChange("hour")} className={timeRange === "hour" ? "active" : ""}>Day</button>
          <button onClick={() => handleTimeRangeChange("day")} className={timeRange === "day" ? "active" : ""}>Week</button>
          <button onClick={() => handleTimeRangeChange("month")} className={timeRange === "month" ? "active" : ""}>Month</button>
        </div>
        <div className="metrics">
          <div className="sales">
            <h3>Total Sales</h3>
            <p>€{sales.toFixed(2)}</p>
          </div>
          <div className="orders">
            <h3>Order Count</h3>
            <p>{orders.length}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              interval={0} // Ensures all labels are displayed
              angle={-45} // Rotates labels for better readability
              textAnchor="end"
              height={60} // Increases height for rotated labels
            />
            <YAxis />
            <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="sales" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
