import { useState } from "react";
import { setField } from "../../utils/setFormField";
import { registerCashier } from "../../services/auth.services";

export const AddCashier = ({ onClose, refresh }) => {
  const [cashierForm, setCashierForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const response = await registerCashier(cashierForm);
      console.log(response);
      setSuccess(true);
      refresh();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="top-0 start-0 position-fixed h-100 w-100 z-1 modal-container d-flex justify-content-center align-items-center">
      <div className="card p-3 product-modal d-flex flex-column gap-2">
        <form onSubmit={handleSubmit}>
          {success && (
            <div className="p-2 alert alert-success">
              <span>Cashier Added Successfully!</span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <h4>Add Cashier</h4>
            <i className="bi bi-x-circle btn" onClick={onClose}></i>
          </div>
          <hr />
          <div className="d-flex flex-column gap-1">
            <label htmlFor="full-name">Fullname</label>
            <input
              type="text"
              id="full-name"
              className="form-control"
              value={cashierForm.fullName}
              onChange={(e) => setField(e, "fullName", setCashierForm)}
              placeholder="John Doe....."
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={cashierForm.email}
              onChange={(e) => setField(e, "email", setCashierForm)}
              placeholder="johndoe@gmail.com...."
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={cashierForm.password}
              onChange={(e) => setField(e, "password", setCashierForm)}
              placeholder="************"
            />
          </div>
          <hr />
          <div className="d-flex gap-2 justify-content-end">
            <button className="btn cancel-btn" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="btn add-btn">
              {loading ? (
                <span className="spinner-border"></span>
              ) : (
                <span>Add Cashier</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
