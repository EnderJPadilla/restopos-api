import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config(); // ⚠️ SIEMPRE LO PRIMERO

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,          // 👈 USUARIO EXPLÍCITO
  password: String(process.env.DB_PASSWORD), // 👈 SIEMPRE STRING
  database: process.env.DB_NAME,

  ssl: false, // true solo si usas cloud (Supabase, RDS, etc)

  max: 10,              // conexiones máximas
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 🔍 Verificación inmediata de conexión
pool
  .connect()
  .then(client => {
    console.log('✅ PostgreSQL conectado correctamente');
    console.log(`-----------------------------------------------------`);
    client.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    console.log(`-----------------------------------------------------`);
    process.exit(1);
  });

export default pool;
