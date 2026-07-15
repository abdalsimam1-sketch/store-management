import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AdminStats } from "../../components/admin/AdminStats";
import { fetchCashierDash } from "../../services/dashboard.services";

export const CashierDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);
  const getCashierDash = async () => {
    try {
      setLoading(true);
      const response = await fetchCashierDash();
      setDashboard(response.data.stats);
    } catch {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCashierDash();
  }, []);
  const { user } = useAuth();
  return (
    <div className="container px-md-5 py-4 d-flex flex-column gap-5">
      <header>
        <h2>Hi, {user?.fullName}</h2>
        <span>
          You've made a total of{" "}
          <span className="fw-bold">{dashboard?._count}</span> sales today
          totalling{" "}
          <span className="fw-bold">
            {" "}
            ₦{Number(dashboard?._sum?.total).toLocaleString()}
          </span>
        </span>
      </header>
      <section className="row g-3">
        <div className="col-12 col-md-6">
          <AdminStats
            title="Today's total"
            amount={Number(dashboard?._sum?.total).toLocaleString()}
            symbol="₦"
            icon=""
          ></AdminStats>
        </div>
        <div className="col-12 col-md-6">
          <AdminStats
            title="Today's average sale"
            amount={Number(dashboard?._avg?.total).toLocaleString()}
            symbol="₦"
            icon=""
          ></AdminStats>
        </div>
      </section>

      <section>{}</section>
    </div>
  );
};
