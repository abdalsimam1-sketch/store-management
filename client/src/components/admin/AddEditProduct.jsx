import { useEffect, useState } from "react";
import { CATEGORIES } from "../../data.js/categories";
import { addProduct, updateProduct } from "../../services/products.services";
import { setField } from "../../utils/setFormField";

export const AddEditProduct = ({ mode, product, onClose, refresh }) => {
  const [productForm, setProductForm] = useState({
    productName: "",
    category: "",
    price: "",
    stockQuantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setProductForm({
        productName: product.productName,
        category: product.category,
        price: product.price,
        stockQuantity: product.stockQuantity,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (mode === "add") {
        await addProduct(productForm);
      } else {
        await updateProduct(product.id, productForm);
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
      refresh();
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center modal-container">
      <div className="p-4 product-modal card bg-light">
        {success && (
          <div className="alert alert-success p-2">
            {mode === "add" && <span>Product added successfully!</span>}
            {mode === "edit" && <span>Product updated successfully!</span>}
          </div>
        )}
        <section className="d-flex justify-content-between align-items-center">
          <span>
            {mode === "add" ? <h3>Add Product</h3> : <h3>Edit Product</h3>}
          </span>
          <i
            className="bi bi-x-circle fs-4 cursor-pointer btn"
            onClick={onClose}
          ></i>
        </section>
        <hr />
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="product-name"
              value={productForm.productName}
              onChange={(e) => setField(e, "productName", setProductForm)}
              placeholder="Indomie Noodles (Carton)......"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-select w-100 text-capitalize"
              value={productForm.category}
              onChange={(e) => setField(e, "category", setProductForm)}
            >
              <option value="">Choose Category</option>
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <section className="d-flex justify-content-between">
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={productForm.price}
                onChange={(e) => setField(e, "price", setProductForm)}
                placeholder="₦1,000...."
              />
            </div>
            <div>
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                className="form-control"
                value={productForm.stockQuantity}
                onChange={(e) => setField(e, "stockQuantity", setProductForm)}
                placeholder="50...."
              />
            </div>
          </section>
          <hr />
          <section className="d-flex gap-3 justify-content-end">
            <button className="btn cancel-btn" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn add-btn" disabled={loading}>
              {loading ? <span className="spinner-border"></span> : <>Submit</>}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};
