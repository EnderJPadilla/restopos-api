import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });

export const storeRefreshToken = async (
  usuarioId,
  empresaId,
  accessToken,
  refreshToken
) => {
  await pool.query(
    `
    SELECT sp_refresh_token(
      $1::uuid,
      $2::uuid,
      $3::text,
      $4::text,
      now() + interval '3 days'
    )
    `,
    [usuarioId, empresaId, accessToken, refreshToken]
  );
};


export const validateTokenBD = async (userId, empresaId, token) => {
  console.log('Validando Token de sesión en base de datos...');
  console.log('----------------------------------------');

  const { rows, rowCount } = await pool.query(
    'SELECT sp_validate_access_token($1, $2, $3) AS valido',
    [userId, empresaId, token]
  );

  // El SP debería retornar máximo 1 registro
  if (rowCount > 1) {
    throw new Error('RESPUESTA_INCONSISTENTE_SP');
  }

  return rows[0] || null;
};

export const validateRefreshTokenBD = async (refreshToken) => {
  console.log('Validando refresh token en base de datos...');
  console.log('----------------------------------------');

  const { rows, rowCount } = await pool.query(
    'SELECT * FROM sp_validate_refresh_token($1)',
    [refreshToken]
  );

  // El SP debería retornar máximo 1 registro
  if (rowCount > 1) {
    throw new Error('RESPUESTA_INCONSISTENTE_SP');
  }

  return rows[0] || null;
};
