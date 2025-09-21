import { useState } from "react";
import toast from "react-hot-toast";

const INITIAL_FORM = {
  name: "",
  price: "",
  company: "",
  rating: "",
  featured: false,
};
export default function ProductForm({
  product,
  onSubmit,
  resetAfterSuccess = false,
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(product || INITIAL_FORM);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({ ...form, [name]: name === "featured" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.company) {
      return toast.error("Required fields missing");
    }
    if (isNaN(form.price)) return toast.error("Price must be a number");
    if (form.rating && isNaN(form.rating))
      return toast.error("Rating must be number");

    try {
      setLoading(true);
      let body = {
        ...form,
        price: parseFloat(form.price),
        rating: form.rating ? parseFloat(form.rating) : undefined,
      };

      await onSubmit(body);

      if (resetAfterSuccess) {
        setForm(INITIAL_FORM);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="rating"
        placeholder="Rating (0-5)"
        value={form.rating}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Featured
      </label>
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
}
