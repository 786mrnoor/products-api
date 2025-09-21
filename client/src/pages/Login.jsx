import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { updateAccessToken } from "../utils/authFetch";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isValid = re.test(form.email?.toLowerCase());
      if (!isValid) return toast.error("Invalid email");

      setLoading(true);
      const resPromise = login(form);
      toast.promise(resPromise, {
        loading: "Logging in...",
        success: "Login successful!",
        error: (err) => err.message || "Login failed",
      });
      const res = await resPromise;
      setLoading(false);
      updateAccessToken(res.token);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message || "Login failed");
    }
  }
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
