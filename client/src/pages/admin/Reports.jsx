import React, { useEffect, useState } from "react";
import { fetchStoreSales } from "../../services/sales.services";
import { shortDate } from "../../utils/formatDate";

const Reports = () => {
  const [storeSales, setStoreSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedSaleId, setExpandedId] = useState(null);

  const getStoreSales = async () => {
    try {
      setLoading(true);
      const response = await fetchStoreSales();
      setStoreSales(response.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStoreSales();
    const interval = setInterval(getStoreSales, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-4 d-flex flex-column gap-5">
      <header className="d-flex justify-content-between">
        <h2>Sales reports</h2>
        <button className="btn btn-outline-dark">
          <i className="bi bi-download"></i> Export CSV
        </button>
      </header>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Cashier</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <span className="spinner-border my-5"></span>
                </td>
              </tr>
            ) : (
              storeSales.map((sale) => (
                <React.Fragment key={sale.id}>
                  <tr key={sale.id}>
                    <td className="text-center">
                      <i
                        className={`bi bi-chevron-${expandedSaleId === null ? "up" : "down"} btn`}
                        onClick={() => {
                          setExpandedId(
                            expandedSaleId === sale.id ? null : sale.id,
                          );
                        }}
                      ></i>
                    </td>
                    <td>{shortDate(sale.createdAt)}</td>
                    <td>{sale.cashier.fullName}</td>
                    <td>{sale.items.length}</td>
                    <td>₦{Number(sale.total).toLocaleString()}</td>
                  </tr>
                  {sale.id === expandedSaleId && (
                    <tr className="text-start">
                      <td colSpan={5}>
                        {sale.items.map((item) => (
                          <div
                            key={item.id}
                            className="d-flex justify-content-between sale-items"
                          >
                            <span>
                              {item.product.productName} ×{" "}
                              <span className="fw-bold">{item.quantity}</span>
                            </span>
                            <span className="text-start">
                              ₦
                              {Number(
                                item.unitPrice * item.quantity,
                              ).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default Reports;
