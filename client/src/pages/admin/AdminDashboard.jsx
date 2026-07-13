import { useAuth } from "../../context/AuthContext";
import { shortDate } from "../../utils/formatDate";
import { AdminStats } from "../../components/admin/AdminStats";
import { fetchAdminDash } from "../../services/dashboard.services";
import { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [dashBoard, setDashBoard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getDashboard = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetchAdminDash();
      console.log(response.data);
      setDashBoard(response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <div className="py-4 px-5  container d-flex flex-column gap-4">
      <section>
        {user && <h2>Good day, {user.fullName}</h2>}
        <span className="fw-bold">
          Here is how{" "}
          <span className="store-name">{user?.store?.storeName}</span> is doing
          today, {shortDate(new Date())}
        </span>
      </section>
      <section className="row g-3">
        <div className="col-md-4">
          <AdminStats
            icon="cash"
            amount={Number(dashBoard.todaySales?._sum.total).toLocaleString()}
            title="Today's sales"
            symbol="₦"
          ></AdminStats>
        </div>
        <div className="col-md-4">
          <AdminStats
            icon="cart"
            amount={dashBoard.todaySales?._count}
            title="Transactions today"
          ></AdminStats>
        </div>
        <div className="col-md-4">
          <AdminStats
            icon="exclamation-triangle"
            amount={dashBoard.lowStocksCount}
            title="Low stocks alert"
          ></AdminStats>
        </div>
      </section>
    </div>
  );
};
