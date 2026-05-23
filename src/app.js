import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.routes.js';
import productRoutes from '../src/routes/products.routes.js';
import usersRoutes from '../src/routes/users.routes.js';
import locationRoutes from '../src/routes/location.routes.js';
import categoriasRoutes from '../src/routes/categories.routes.js';
import settingsRoutes from '../src/routes/settings.routes.js';
import tablesRoutes from '../src/routes/tables.routes.js';
import orderRoutes from '../src/routes/order.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/usuarios', usersRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/tables', tablesRoutes);
app.use('/api/pedidos', orderRoutes);

export default app;