import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/products.services";
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

  const getProducts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchProducts(search, category);
      console.log(data.data.products);
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

      <section className="d-flex justify-content-between">
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
          className="form-select text-capitalize filter"
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
      <section>
        <table
          className="table text-capitalize align-middle"
          style={{ borderRadius: "1rem" }}
        >
          <thead className="text-muted ">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td className="text-capitalize ">
                  <span className="border px-3 py-1 rounded-pill bg-dark-subtle">
                    {item.category}
                  </span>
                </td>
                <td>₦{Number(item.price).toLocaleString()}</td>
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
                    <i className="btn btn-outline-danger bi bi-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {modalOpen && (
        <div>
          <AddEditProduct
            product={selectedProduct}
            onClose={() => setModalOpen(false)}
            refresh={() => getProducts()}
            mode={selectedProduct ? "edit" : "add"}
          ></AddEditProduct>
        </div>
      )}
    </div>
  );
};
export default Products;
