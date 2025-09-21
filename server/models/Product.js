import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive"],
  },
  featured: Boolean,
  rating: {
    type: Number,
    default: 0.0,
    min: [0, "Rating must be between 0 and 5"],
    max: [5, "Rating must be between 0 and 5"],
    transform(val) {
      const n = parseFloat(val);
      return isNaN(n) ? undefined : Number(n.toFixed(2));
    },
  },
  company: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
