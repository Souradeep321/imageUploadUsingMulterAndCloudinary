import { Router } from "express";
import { createProducts, deleteProducts, fetchProducts, updateProducts } from "../controllers/products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();    

router.route("/").post(upload.single('image'), createProducts);
router.route("/").get(fetchProducts)
router.route("/:id").patch(upload.single("image"),updateProducts)
router.route("/:id").delete(deleteProducts)

export default router