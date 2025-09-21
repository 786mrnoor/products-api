import ProductModel from "../../models/Product.js";

export default async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const update = req.body;

    const product = await ProductModel.findOneAndReplace(
      { _id: productId },
      update,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
