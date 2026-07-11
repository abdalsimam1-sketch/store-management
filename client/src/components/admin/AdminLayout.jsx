import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex ">
      <section className="">
        <AdminSidebar></AdminSidebar>
      </section>
      <section className="w-100">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default AdminLayout;
