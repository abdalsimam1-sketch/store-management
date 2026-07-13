import { useAuth } from "../../context/AuthContext";
import { shortDate } from "../../utils/formatDate";
import { AdminStats } from "../../components/admin/AdminStats";
import { fetchAdminDash } from "../../services/dashboard.services";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

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
    <div className=" container h-100 pb-5 pb-md-0">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <span
            className="spinner-border"
            style={{ width: "5rem", height: "5rem" }}
          ></span>
        </div>
      ) : (
        <div className="py-4  px-md-3 d-flex flex-column gap-4">
          <section>
            {user && <h2>Good day, {user.fullName}</h2>}
            <span className="fw-bold">
              Here is how{" "}
              <span className="store-name">{user?.store?.storeName}</span> is
              doing today, {shortDate(new Date())}
            </span>
          </section>
          <section className="row g-3">
            <div className="col-lg-4">
              <AdminStats
                icon="cash text-success"
                amount={Number(
                  dashBoard.todaySales?._sum.total,
                ).toLocaleString()}
                title="Today's sales"
                symbol="₦"
              ></AdminStats>
            </div>
            <div className="col-lg-4">
              <AdminStats
                icon="cart cart-icon"
                amount={dashBoard.todaySales?._count}
                title="Transactions today"
              ></AdminStats>
            </div>
            <div className="col-lg-4">
              <AdminStats
                icon="exclamation-triangle text-warning"
                amount={dashBoard.lowStocksCount}
                title="Low stocks alert"
              ></AdminStats>
            </div>
          </section>

          <section className="row align-items-md-stretch g-4 g-md-3">
            <div className="recent-sales col-12  col-lg-8 ">
              <div className="card p-3 d-flex flex-column gap-3 h-100 list-card">
                <section className="d-flex justify-content-between border-bottom py-2">
                  <h5>Recent Sales</h5>
                  <Link to="/admin/reports" className="dash-link">
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </section>
                <section className="row g-3">
                  {dashBoard.recentSales?.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border-bottom pb-2"
                    >
                      <div className="d-flex gap-3">
                        <i className="bi bi-person  border fs-3 bg-secondary-subtle person-icon text-center"></i>
                        <div className="d-flex flex-column">
                          <span>{item.cashier?.fullName}</span>
                          <span>
                            {item.items.length} item(s) .{" "}
                            {formatDistanceToNow(item.createdAt, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <span className="text-success fw-bold">
                        + ₦{Number(item.total).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </section>
              </div>
            </div>
            <div className="low-stocks col-12 col-lg-4 ">
              <div className="card p-3 d-flex flex-column gap-3 h-100 list-card">
                <section className="d-flex justify-content-between border-bottom py-2">
                  {" "}
                  <h5>Low Stock</h5>
                  <Link className="dash-link" to="/admin/products">
                    Manage <i className="bi bi-arrow-right"></i>
                  </Link>
                </section>
                <section className="text-capitalize row g-3">
                  {dashBoard.lowStocks?.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border-bottom pb-2"
                    >
                      <div className="d-flex flex-column">
                        <span>{item.productName}</span>
                        <span className="text-muted">{item.category}</span>
                      </div>
                      <div>
                        <span className="text-nowrap border border-danger rounded-pill px-2 bg-danger-subtle">
                          {item.stockQuantity} left
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
