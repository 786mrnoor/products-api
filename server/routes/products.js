import { Router } from "express";

import addProduct from "../controllers/products/add.js";
import getAllProducts from "../controllers/products/get-all.js";
import updateProduct from "../controllers/products/update.js";
import removeProduct from "../controllers/products/remove.js";
import getProduct from "../controllers/products/get.js";

const router = Router();

// api/products
router
  .post("/", addProduct)
  .get("/", getAllProducts)
  .get("/:productId", getProduct)
  .put("/:productId", updateProduct)
  .delete("/:productId", removeProduct);

export default router;
