import { Link, Outlet, useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";

export default function Nav() {
  const navigate = useNavigate();

  async function logout() {
    try {
      const promise = authFetch("/api/auth/logout", { method: "POST" });
      toast.promise(promise, {
        loading: "Logging out...",
        success: "Logout successful!",
        error: (err) => err.message || "Logout failed",
      });
      await promise;
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <nav className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  );
}
