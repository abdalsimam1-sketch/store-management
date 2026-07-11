import { useAuth } from "../../context/AuthContext";
import { shortDate } from "../../utils/formatDate";

export const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="py-4 px-5  container">
      <section>
        {user && <h2>Good day, {user.fullName}</h2>}
        <span className="fw-bold">
          Here is how{" "}
          <span className="store-name">{user?.store?.storeName}</span> is doing
          today, {shortDate(new Date())}
        </span>
      </section>
    </div>
  );
};
