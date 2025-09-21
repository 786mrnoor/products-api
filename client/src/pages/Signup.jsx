import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { updateAccessToken } from "../utils/authFetch";
import { signup } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
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
      const dataPromise = signup(form);
      toast.promise(dataPromise, {
        loading: "Signing up...",
        success: "Signup successful!",
        error: (err) => err.message || "Signup failed",
      });
      const data = await dataPromise;
      setLoading(false);

      updateAccessToken(data.token);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="signup-form">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          placeholder="Password (min 6)"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          Signup
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
