import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`-----------------------------------------------------`);
  // console.log(`🚀 RestoPos API ejecutándose en puerto ${PORT}`);
  console.log(`🚀 RestoPos API ejecutándose Correctamente.`);
  console.log(`-----------------------------------------------------`);
});
