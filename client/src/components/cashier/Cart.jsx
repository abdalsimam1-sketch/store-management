import { useCart } from "../../hooks/useCart";

export const Cart = ({
  cart,
  clear,
  increase,
  decrease,
  remove,
  onCheckout,
  loading,
  success,
}) => {
  const { total } = useCart();

  return (
    <div className="card position-absolute p-3 cart z-3 d-flex flex-column gap-3">
      <section className="d-flex justify-content-between align-items-center border-bottom">
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-cart fs-4"></i>{" "}
          <span>
            Current Sale{" "}
            <span className="border rounded-pill bg-success-subtle px-3">
              {cart.length}
            </span>
          </span>
        </div>
        <span
          className="text-decoration-underline cursor-pointer"
          onClick={clear}
        >
          Clear
        </span>
      </section>
      <section className="row g-3">
        {cart.map((item) => (
          <div key={item.id} className="border-bottom pb-3">
            <div className="d-flex justify-content-between ">
              <div className="d-flex flex-column">
                <span>{item.productName}</span>
                <span>₦{Number(item.price).toLocaleString()} each</span>
              </div>
              <i
                className="bi bi-trash btn btn-outline-dark align-self-end"
                onClick={() => {
                  remove(item.id);
                }}
              ></i>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex border rounded px-4 align-items-center gap-3">
                <span
                  className="fs-3 cursor-pointer"
                  onClick={() => decrease(item.id)}
                >
                  -
                </span>
                <span>{item.quantity}</span>
                <span
                  className="fs-3 cursor-pointer"
                  onClick={() => increase(item)}
                >
                  +
                </span>
              </div>
              <span>
                ₦{Number(item.quantity * item.price).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </section>
      <section>
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>₦{Number(total(cart)).toLocaleString()}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>-------</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>Total due</span>
          <h4>₦{Number(total(cart)).toLocaleString()}</h4>
        </div>
      </section>
      <section className="w-100">
        <button
          className=" btn add-btn w-100 mb-4"
          onClick={onCheckout}
          disabled={loading || cart.length === 0}
        >
          {loading ? <span className="spinner-border"></span> : <>Submit</>}
        </button>
        {success && (
          <div className="w-100">
            <p className="p-2 alert alert-success w-100">
              Sale Created Successfully!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
