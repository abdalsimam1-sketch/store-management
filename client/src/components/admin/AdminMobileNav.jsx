import { Link } from "react-router-dom";

export const AdminMobileNav = () => {
  return (
    <div className="mobile-nav z-1 text-light w-100 rounded-top d-flex justify-content-between">
      <div>
        <Link to="/admin" className={`btn d-flex flex-column`}>
          <i className="bi-grid-1x2 "></i>
          <span>Dashboard</span>
        </Link>
      </div>
      <div>
        <Link to="/admin/products" className={`btn d-flex flex-column`}>
          <i className="bi-box-seam "></i>
          <span>Products</span>
        </Link>
      </div>
      <div>
        <Link to="/admin/cashiers" className={`btn d-flex flex-column`}>
          <i className="bi-person "></i>
          <span>Cashiers</span>
        </Link>
      </div>
      <div>
        <Link to="/admin/reports" className={`btn d-flex flex-column`}>
          <i className="bi-bar-chart-line "></i>
          <span>Reports</span>
        </Link>
      </div>
    </div>
  );
};
