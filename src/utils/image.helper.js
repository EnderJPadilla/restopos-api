import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function guardarImagenBase64(
  idEmpresa,
  imagenBase64
) {

  if (!imagenBase64) {
    return null;
  }

  const match = imagenBase64.match(
    /^data:(image\/\w+);base64,(.+)$/
  );

  if (!match) {
    return null;
  }

  const mimeType = match[1];
  const data = match[2];

  let extension = "jpg";

  switch (mimeType) {
    case "image/png":
      extension = "png";
      break;

    case "image/webp":
      extension = "webp";
      break;

    case "image/jpeg":
      extension = "jpg";
      break;
  }

  const nombreArchivo = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const carpetaEmpresa = path.join(
    process.env.UPLOAD_PATH,
    "productos",
    idEmpresa
  );

  fs.mkdirSync(
    carpetaEmpresa,
    {
      recursive: true
    }
  );

  const rutaCompleta = path.join(
    carpetaEmpresa,
    nombreArchivo
  );

  fs.writeFileSync(
    rutaCompleta,
    Buffer.from(
      data,
      "base64"
    )
  );

  return {
    rutaFisica: rutaCompleta,
    url: `/storage/productos/${idEmpresa}/${nombreArchivo}`
  };
}