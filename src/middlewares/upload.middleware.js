import fs from "fs";
import path from "path";
import multer from "multer";
import crypto from "crypto";

import { PRODUCTS_PATH } from "../config/storage.js";

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    try {
      const empresaId = req.user.empresa_id;
      const empresaPath = path.join(
        PRODUCTS_PATH,
        empresaId
      );

      fs.mkdirSync(
        empresaPath,
        {
          recursive: true
        }
      );

      cb(
        null,
        empresaPath
      );

    } catch (error) {
      cb(error);
    }

  },

  filename: (
    req,
    file,
    cb
  ) => {

    const extension = path.extname(
      file.originalname
    );

    const uniqueName = `${Date.now()}-${crypto.randomUUID()}${extension}`;

    cb(
      null,
      uniqueName
    );

  }

});

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (
    !allowedTypes.includes(
      file.mimetype
    )
  ) {
    return cb(
      new Error(
        "Formato no permitido"
      )
    );
  }

  cb(
    null,
    true
  );

};

export const uploadProducto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});