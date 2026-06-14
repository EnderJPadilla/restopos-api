import path from "path";

export const STORAGE_ROOT = process.env.UPLOAD_PATH;

export const STORAGE_PATHS = {

  productos: path.join(
    STORAGE_ROOT,
    "productos"
  ),

  usuarios: path.join(
    STORAGE_ROOT,
    "usuarios"
  ),

  empresas: path.join(
    STORAGE_ROOT,
    "empresas"
  )

};

// Compatibilidad con código existente
export const PRODUCTS_PATH = STORAGE_PATHS.productos;
export const USERS_PATH = STORAGE_PATHS.usuarios;
export const COMPANIES_PATH = STORAGE_PATHS.empresas;