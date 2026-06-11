import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadProducto } from "../middlewares/upload.middleware.js";
import { subirImagenProducto } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/img_producto",
  authMiddleware,
  uploadProducto.single("imagen"),
  subirImagenProducto
);

export default router;