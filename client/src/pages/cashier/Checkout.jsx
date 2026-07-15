import { useEffect, useState } from "react";
import { CATEGORIES } from "../../data.js/categories";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { Cart } from "../../components/cashier/Cart";
import { createSale } from "../../services/sales.services";

export const Checkout = () => {
  const {
    search,
    setSearch,
    category,
    setCategory,
    loading,
    setLoading,
    error,
    setError,
    products,
    setProducts,
    handleSubmit,
    getProducts,
  } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const toggleCart = () => {
    setModalOpen(modalOpen === true ? false : true);
  };

  const { increase, decrease, cart, setCart, clearCart, remove } = useCart();
  const [saleLoading, setSaleLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saleItems = cart.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  const handleCreateSale = async () => {
    try {
      setSuccess(false);
      setSaleLoading(true);
      await createSale({ items: saleItems });
      setSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        setSuccess(false);
      }, 1500);
      await getProducts();
      clearCart();
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setSaleLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container py-4 d-flex flex-column gap-5 px-md-5">
      <header className="d-flex justify-content-between align-items-center">
        <h2>Checkout</h2>
        <div className="position-relative">
          <button
            className="btn add-btn px-3 align-self-end"
            onClick={toggleCart}
          >
            <i className="bi bi-cart me-3"></i> Cart
          </button>
          {modalOpen && (
            <div>
              <Cart
                cart={cart}
                increase={increase}
                decrease={decrease}
                remove={remove}
                clear={clearCart}
                onCheckout={() => handleCreateSale(cart)}
                loading={saleLoading}
                success={success}
              ></Cart>
            </div>
          )}
        </div>
      </header>

      <section>
        <form
          className="d-flex justify-content-between gap-3 gap-lg-0"
          onSubmit={handleSubmit}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id=""
            className={`form-control form-input `}
            placeholder="Search products or scan barcode..."
          />

          <select
            className="form-select filter text-capitalize"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Choose Category</option>
            {CATEGORIES.map((item) => (
              <option value={item} className="text-capitalize" key={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </section>
      <section className={`row g-3 `}>
        {loading ? (
          <div className="min-vh-100 d-flex justify-content-center ">
            <span
              className="spinner-border "
              style={{ width: "5rem", height: "5rem" }}
            ></span>
          </div>
        ) : (
          products.map((item) => {
            const cartItem = cart.find((product) => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : "";
            return (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="card p-3 h-100 ">
                  <i
                    className="bi bi-image text-center border-bottom"
                    style={{ fontSize: "5rem", size: "cover" }}
                  ></i>
                  <div className="d-flex flex-column gap-4">
                    {" "}
                    <div className="d-flex flex-column">
                      {" "}
                      <span>{item.productName}</span>
                      <span>{item.stockQuantity} in stock</span>
                      <span>₦{item.price}</span>
                    </div>
                    <div className="d-flex align-self-end align-items-center gap-4 border rounded px-3">
                      <span
                        className="fs-3 cursor-pointer"
                        onClick={() => decrease(item.id)}
                      >
                        -
                      </span>
                      <span>{quantity}</span>
                      <span
                        className="fs-3 cursor-pointer"
                        onClick={() => increase(item)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
