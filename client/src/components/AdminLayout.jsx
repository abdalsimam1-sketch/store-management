import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex ">
      <section>
        <AdminSidebar></AdminSidebar>
      </section>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default AdminLayout;
