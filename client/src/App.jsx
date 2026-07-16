import { AuthPage } from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { CashierDashboard } from "./pages/cashier/CashierDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import { CashierLayout } from "./components/cashier/CashierLayout";
import Products from "./pages/admin/Products";
import Cashiers from "./pages/admin/Cashiers";
import Reports from "./pages/admin/Reports";
import PageNotFound from "./pages/PageNotFound";
import { Checkout } from "./pages/cashier/Checkout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

        {/* ADMIN ROUTES */}

        <Route
          element={
            <ProtectedRoutes allowedRole="admin">
              <AdminLayout></AdminLayout>
            </ProtectedRoutes>
          }
        >
          <Route
            path="/admin"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route path="/admin/products" element={<Products></Products>}></Route>
          <Route path="/admin/cashiers" element={<Cashiers></Cashiers>}></Route>
          <Route path="/admin/reports" element={<Reports></Reports>}></Route>
        </Route>

        {/* CASHIER ROUTES */}

        <Route
          element={
            <ProtectedRoutes allowedRole="cashier">
              <CashierLayout></CashierLayout>
            </ProtectedRoutes>
          }
        >
          <Route
            path="/cashier"
            element={<CashierDashboard></CashierDashboard>}
          ></Route>
          <Route
            path="/cashier/checkout"
            element={<Checkout></Checkout>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
