import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUploader } from "../middlewares/upload.middleware.js";
import { subirImagenProducto, subirImagenUsuario } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/img_producto",
  authMiddleware,
  getUploader(
    "productos",
    5
  ).single(
    "imagen"
  ),
  subirImagenProducto
);

router.post(
  "/img_usuario",
  authMiddleware,
  getUploader(
    "usuarios",
    2
  ).single(
    "imagen"
  ),
  subirImagenUsuario
);

export default router;