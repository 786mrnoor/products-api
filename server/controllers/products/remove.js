import ProductModel from "../../models/Product.js";

export default async function removeProduct(req, res) {
  try {
    const { productId } = req.params;
    const removed = await ProductModel.findOneAndDelete({ _id: productId });
    if (!removed)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
