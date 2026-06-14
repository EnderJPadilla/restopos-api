import fs from "fs";
import path from "path";
import multer from "multer";
import crypto from "crypto";
import { STORAGE_PATHS, } from "../config/storage.js";

function createStorage(basePath) {

  return multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      try {
        const empresaId = req.user.empresa_id;
        const empresaPath = path.join(
          basePath,
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

}

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

export function getUploader(
  folder,
  maxSize
) {

  const basePath = STORAGE_PATHS[folder];
  if (!basePath) {
    throw new Error(
      `No existe la carpeta '${folder}' en el arbol de ruta permitida.`
    );
  }

  return multer({
    storage: createStorage(
      basePath
    ),
    fileFilter,
    limits: {
      fileSize:
        maxSize *
        1024 *
        1024
    }
  });

}
