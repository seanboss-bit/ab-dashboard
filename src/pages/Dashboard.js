import React, { useEffect, useMemo, useState } from "react";
import DashboardInner from "../components/DashboardInner";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import RecentOrders from "../components/RecentOrders";
import RecentUser from "../components/RecentUser";
import { userRequest } from "../requestMethods";

const Dashboard = ({ open, setOpen }) => {
  const [incomeStats, setIncomeStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/order/income");
        // eslint-disable-next-line
        res.data.map((item) => {
          setIncomeStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Total Sales": item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div>
      <Navbar name="dashboard" open={open} setOpen={setOpen} />
      <DashboardInner />
      <Chart title="sales" data={incomeStats} dataKey="Total Sales" grid />
      <div className="for">
        <RecentUser />
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
