import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import FilterForm from "./FilterForm";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const data = await authFetch("/api/products");
        if (ignore) return;
        setProducts(data);
      } catch (err) {
        console.error("error", err);
      }
    }
    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = authFetch("/api/products/" + id, { method: "DELETE" });
      toast.promise(res, {
        loading: "Deleting product...",
        success: "Product deleted!",
        error: (err) => err.message || "Failed to delete",
      });
      await res;
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  async function handleFilter(filters) {
    let query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      query.set(key, value);
    });
    try {
      const data = await authFetch(`/api/products?${query.toString()}`);
      setProducts(data);
    } catch (err) {
      console.error("error", err);
    }
  }

  return (
    <main className="home-page">
      <h1>Products</h1>
      <FilterForm onFilter={handleFilter} />
      <ul>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </ul>
    </main>
  );
}
