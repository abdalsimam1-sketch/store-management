import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AdminStats } from "../../components/admin/AdminStats";
import { fetchCashierDash } from "../../services/dashboard.services";
import { fetchCashierSales } from "../../services/sales.services";
import { shortDate } from "../../utils/formatDate";

export const CashierDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [sales, setSales] = useState([]);
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
  const getCashierSales = async () => {
    try {
      const response = await fetchCashierSales();
      setSales(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCashierDash();
    getCashierSales();
  }, []);
  const { user } = useAuth();
  return loading ? (
    <div className="d-flex justify-content-center py-5">
      <span
        className="spinner-border"
        style={{ width: "5rem", height: "5rem" }}
      ></span>
    </div>
  ) : (
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

      <section className="dash-table text-center">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((item) => (
              <tr key={item?.id}>
                <td>{shortDate(item?.createdAt)}</td>
                <td>{item?.items?.length}</td>
                <td>₦{Number(item?.total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
