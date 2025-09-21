import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    let ignore = false;
    async function get() {
      try {
        const res = authFetch(`/api/products/${productId}`);
        toast.promise(res, {
          loading: "Loading product...",
          success: "Product Loaded!",
          error: (err) => err.message || "Failed to Load Product",
        });
        const data = await res;
        if (ignore) return;

        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    get();
  }, [productId]);
  async function handleSubmit(form) {
    const res = authFetch(`/api/products/${product?._id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    toast.promise(res, {
      loading: "Updating product...",
      success: "Product updated!",
      error: (err) => err.message || "Failed to update",
    });
    await res;
  }

  return (
    <>
      <h1>Edit Product</h1>
      {product && <ProductForm onSubmit={handleSubmit} product={product} />}
    </>
  );
}
