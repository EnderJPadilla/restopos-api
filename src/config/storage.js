import path from "path";

export const STORAGE_ROOT =
  process.env.UPLOAD_PATH;

export const PRODUCTS_PATH = path.join(
  STORAGE_ROOT,
  "productos"
);

export const USERS_PATH = path.join(
  STORAGE_ROOT,
  "usuarios"
);

export const COMPANIES_PATH = path.join(
  STORAGE_ROOT,
  "empresas"
);