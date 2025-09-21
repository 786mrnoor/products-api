import ProductModel from "../../models/Product.js";

export default async function addProduct(req, res) {
  try {
    const { name, price, featured, rating, company } = req.body || {};

    const prod = new ProductModel({
      name,
      price,
      featured,
      rating,
      company,
    });
    await prod.save();

    res.status(201).json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
