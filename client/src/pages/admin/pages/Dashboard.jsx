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

const groupSalesByTime = (orders, timeRange) => {
    const groupedSales = {};
  
    orders.forEach((order) => {
      const timestamp = order.timestamp;
      if (!timestamp || typeof timestamp !== 'object') {
        // Skip orders without a valid timestamp
        return;
      }
  
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      let key;
  
      if (timeRange === 'hour') {
        key = date.getHours();
      } else if (timeRange === 'day') {
        key = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      } else if (timeRange === 'month') {
        key = date.getMonth(); // 0-11
      }
  
      if (isNaN(key)) {
        // Skip invalid timestamps
        return;
      }
  
      if (!groupedSales[key]) {
        groupedSales[key] = 0;
      }
  
      if (order.totalPrice) {
        groupedSales[key] += order.totalPrice;
      } else if (order.items) {
        order.items.forEach((item) => {
          groupedSales[key] += item.price * item.quantity;
        });
      }
    });
  
    const data = [];
    if (timeRange === 'hour') {
      for (let hour = 0; hour < 24; hour++) {
        data.push({
          time: `${hour}:00`,
          sales: groupedSales[hour] || 0,
        });
      }
    } else if (timeRange === 'day') {
      const days = Object.keys(groupedSales).sort();
      days.forEach((day) => {
        data.push({
          time: day,
          sales: groupedSales[day],
        });
      });
    } else if (timeRange === 'month') {
      for (let month = 0; month < 12; month++) {
        data.push({
          time: new Date(0, month).toLocaleString('default', { month: 'long' }),
          sales: groupedSales[month] || 0,
        });
      }
    }
  
    return data;
  };
  


const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('hour');

  useEffect(() => {
    fetchOrders()
      .then((fetchedOrders) => {
        setOrders(fetchedOrders);
        const totalSales = calculateSales(fetchedOrders);
        setSales(totalSales);
        const groupedData = groupSalesByTime(fetchedOrders, timeRange);
        setSalesData(groupedData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="time-range-selector">
          <button onClick={() => handleTimeRangeChange('hour')}>Day</button>
          <button onClick={() => handleTimeRangeChange('day')}>Week</button>
          <button onClick={() => handleTimeRangeChange('month')}>Month</button>
        </div>
        <div className="sales">
          <h3>Total Sales</h3>
          <p>€{sales}</p>
        </div>
        <div className="orders">
          <h3>Order Count</h3>
          <p>{orders.length}</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
