import ProductModel from "../../models/Product.js";

export default async function getAllProducts(req, res) {
  try {
    const query = buildQuery(req.query);

    const products = await ProductModel.find(query);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

function buildQuery({ featured, priceGte, priceLte }) {
  let query = {};

  if (featured === "true") query.featured = true;
  if (featured === "false") query.featured = false;

  if (priceGte || priceLte) query.price = {};
  if (priceGte) query.price["$gte"] = Number(priceGte);
  if (priceLte) query.price["$lte"] = Number(priceLte);

  return query;
}
