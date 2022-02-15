import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import compression from 'compression';
import 'dotenv/config';

createConnection()
  .then(() => {
    console.log('Database Connected :)');
  })
  .catch((error) => console.log(error));
  
const PORT = 4000;

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(cors({
    origin : true,
    credentials : true
}));




const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);




