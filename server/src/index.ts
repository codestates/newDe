import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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




