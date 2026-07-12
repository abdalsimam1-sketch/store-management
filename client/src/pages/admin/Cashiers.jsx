import { useEffect, useState } from "react";
import { fetchCashiers } from "../../services/auth.services";
import { AddCashier } from "../../components/admin/AddCashier";
import { shortDate } from "../../utils/formatDate";

const Cashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
        <button
          className="btn add-btn align-self-end"
          onClick={() => setModalOpen(true)}
        >
          + Add Cashier
        </button>
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
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <span className="spinner-border"></span>
                </td>
              </tr>
            ) : (
              cashiers.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{shortDate(item.createdAt)}</td>
                  <td>
                    <i className="bi bi-trash btn btn-outline-danger"></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {modalOpen && (
        <div>
          <AddCashier
            refresh={() => getCashiers()}
            onClose={() => setModalOpen(false)}
          ></AddCashier>
        </div>
      )}
    </div>
  );
};
export default Cashiers;
