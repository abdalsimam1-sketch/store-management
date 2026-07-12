import { useEffect, useState } from "react";
import { fetchCashiers } from "../../services/auth.services";

const Cashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCashiers = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetchCashiers();
      setCashiers(response);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCashiers();
  }, []);

  return (
    <div className="container py-4 d-flex flex-column gap-5">
      <section className="d-flex justify-content-between align-items-center">
        <h2>Cashiers</h2>
        <button className="btn add-btn align-self-end">+ Add Cashier</button>
      </section>

      <section>
        <table className="table">
          <thead className="text-muted">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {cashiers.map((item) => (
              <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.createdAt}</td>
                <td>
                  <i className="bi bi-trash btn btn-outline-danger"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default Cashiers;
