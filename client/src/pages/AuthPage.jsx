import { useState } from "react";
import { login, register } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AUTH_MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

const AUTH_FORM = {
  storeName: "",
  fullName: "",
  email: "",
  password: "",
};

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState(AUTH_MODE.LOGIN);
  const [authForm, setAuthForm] = useState(AUTH_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (authMode === "login") {
        const response = await login({
          email: authForm.email,
          password: authForm.password,
        });
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cashier");
        }
        setUser(response.data.user);
      } else {
        const response = await register(authForm);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cashier");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="d-flex container">
      <div className="left  d-none d-lg-flex d-flex align-items-center p-3 text-light ">
        <h2 className="mx-auto text-center">
          {authMode === "login" && (
            <>
              Welcome back. Your <span className="till">till</span> is exactly
              where you left it.
            </>
          )}
          {authMode === "register" && (
            <>
              Run your shop with the <span className="till">calm</span> of
              knowing every kobo is accounted for.
            </>
          )}
        </h2>
      </div>
      <div className="right d-flex justify-content-center align-items-center">
        <form
          className="card auth-section p-3 d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div>
            {" "}
            <h3>{authMode === "login" ? <>Log in</> : <>Register</>}</h3>
            <span>
              {authMode === "login" ? (
                <>Enter your details to access your dahsboard</>
              ) : (
                <>Set up Till for your store in under 2 minutes</>
              )}
            </span>
          </div>
          {authMode === "register" && (
            <div>
              <div className="d-flex justify-content-between">
                <label htmlFor="store-name">Store Name</label>
                {authMode === "register" && error && (
                  <span className="text-danger fw-bold text-capitalize">
                    {error}
                  </span>
                )}
              </div>
              <input
                type="text"
                className={`form-control ${error && "border-danger"}`}
                id="store-name"
                value={authForm.storeName}
                onChange={(e) =>
                  setAuthForm((current) => ({
                    ...current,
                    storeName: e.target.value,
                  }))
                }
              />
            </div>
          )}
          {authMode === "register" && (
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                className={`form-control ${error && "border-danger"}`}
                value={authForm.fullName}
                onChange={(e) =>
                  setAuthForm((current) => ({
                    ...current,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div>
            <div className="d-flex justify-content-between">
              <label htmlFor="email">Email</label>{" "}
              {authMode === "login" && error && (
                <span className="text-danger fw-bold text-capitalize">
                  {error}
                </span>
              )}
            </div>
            <input
              type="email"
              id="email"
              className={`form-control ${error && "border-danger"}`}
              value={authForm.email}
              onChange={(e) =>
                setAuthForm((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`form-control ${error && "border-danger"}`}
              value={authForm.password}
              onChange={(e) =>
                setAuthForm((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button className="btn auth-btn " disabled={loading}>
            {!loading && (authMode === "login" ? <>Log in</> : <>Register</>)}
            {loading && <span className="spinner-border"></span>}
          </button>
          <span className="mx-auto">
            {authMode === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-decoration-underline fw-bold auth-switch cursor-pointer"
                  onClick={() => {
                    setAuthMode(AUTH_MODE.REGISTER);
                    setError("");
                    setAuthForm(AUTH_FORM);
                  }}
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-decoration-underline fw-bold auth-switch cursor-pointer"
                  onClick={() => {
                    setAuthMode(AUTH_MODE.LOGIN);
                    setError("");
                    setAuthForm(AUTH_FORM);
                  }}
                >
                  Login
                </span>
              </>
            )}
          </span>
        </form>
      </div>
    </main>
  );
};
