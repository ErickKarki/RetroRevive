import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { AiOutlineProduct } from "react-icons/ai";

const AdminDashboard = () => {
  const data = [
    {
      name: "Sunday",
      sales: 300,
      sales_pointer: 300,
    },
    {
      name: "Monday",
      sales: 400,
      sales_pointer: 400,
    },
    {
      name: "Tuesday",
      sales: 1500,
      sales_pointer: 1500,
    },
    {
      name: "Wednesday",
      sales: 3000,
      sales_pointer: 3000,
    },
    {
      name: "Thrusday",
      sales: 100,
      sales_pointer: 100,
    },
    {
      name: "Friday",
      sales: 0,

      sales_pointer: 0,
    },
    {
      name: "Saturday",
      sales: 300,
      sales_pointer: 300,
    },
  ];

  return (
    <div>
      <main className="main-container">
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <AiOutlineProduct className="card_icon" />
              <h3>Total Products</h3>
            </div>
            <h1>1</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <BsFillGrid3X3GapFill className="card_icon" />
              <h3>Total Sales</h3>
            </div>
            <h1>2</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <BsFillGrid3X3GapFill className="card_icon" />
              <h3>Total Orders</h3>
            </div>
            <h1>2</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <BsFillGrid3X3GapFill className="card_icon" />
              <h3>Messages</h3>
            </div>
            <h1>2</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis dataKey="sales" />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="sales" stroke="#2a9d8f" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
