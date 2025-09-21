import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  async function handleSubmit(form) {
    const res = authFetch("/api/products", {
      method: "POST",
      body: JSON.stringify(form),
    });

    toast.promise(res, {
      loading: "Adding product...",
      success: "Product added!",
      error: (err) => err.message || "Failed to add",
    });
    await res;
  }

  return (
    <>
      <h1>Add Product</h1>
      <ProductForm onSubmit={handleSubmit} resetAfterSuccess={true} />;
    </>
  );
}
