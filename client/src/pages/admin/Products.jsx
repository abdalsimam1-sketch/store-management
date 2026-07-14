import { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../../services/products.services";
import { AddEditProduct } from "../../components/admin/AddEditProduct";
import { CATEGORIES } from "../../data.js/categories";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const getProducts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchProducts(search, category);
      setProducts(data.data.products);
    } catch (error) {
      setError(error.response?.data?.products);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    getProducts();
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product")) {
      return;
    }
    try {
      setDeletingId(id);
      await deleteProduct(id);
      getProducts();
    } catch (error) {
      if (error.code === "P2003") {
        throw new BadRequest(
          "Cannot delete a product that has existing sales records.",
        );
      }
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="container py-4 d-flex flex-column gap-5">
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Products</h2>
          <span></span>
        </div>
        <div>
          <button
            className="add-btn btn align-self-end"
            onClick={() => setModalOpen(true)}
          >
            + Add product
          </button>
        </div>
      </header>

      <section className="d-flex  gap-3 justify-content-md-between">
        <form className="w-100" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control form-input w-100"
            placeholder="Search products...."
          />
        </form>
        <select
          value={category}
          className="form-select text-capitalize filter w-100"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </section>
      <section className="data-table  text-nowrap">
        <table
          className="table text-capitalize align-middle flex-grow-1"
          style={{ borderRadius: "1rem" }}
        >
          <thead className="text-muted ">
            <tr>
              <th>Product</th>
              <th className="d-none d-md-table-cell">Category</th>
              <th className="d-none d-md-table-cell">Price</th>
              <th>In Stock</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center py-5">
                <td colSpan={5}>
                  <span className="spinner-border my-5"></span>
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td className="text-capitalize  d-none d-md-table-cell">
                    <span className="border px-3 py-1 rounded-pill bg-dark-subtle">
                      {item.category}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell">
                    ₦{Number(item.price).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`${Number(item.stockQuantity) <= 10 ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"} border px-3 rounded-pill py-1`}
                    >
                      {item.stockQuantity} left
                    </span>
                  </td>
                  <td>
                    <span className="d-flex gap-3">
                      <i
                        className="btn btn-outline-dark bi bi-pencil-square"
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedProduct(item);
                        }}
                      ></i>
                      {deletingId === item.id ? (
                        <span className="spinner-border text-danger"></span>
                      ) : (
                        <i
                          className="btn btn-outline-danger bi bi-trash"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        ></i>
                      )}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {modalOpen && (
        <div>
          <AddEditProduct
            product={selectedProduct}
            onClose={() => {
              setModalOpen(false);
              setSelectedProduct(null);
            }}
            refresh={() => getProducts()}
            mode={selectedProduct ? "edit" : "add"}
          ></AddEditProduct>
        </div>
      )}
    </div>
  );
};
export default Products;
