import ProductModel from "../../models/Product.js";

export default async function getProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findOne({ _id: productId });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
