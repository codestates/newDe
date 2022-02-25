import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import compression from 'compression';
import 'dotenv/config';

// modules
import boardRouter from './routers/boardRouter';
import userRouter from './routers/userRouter';
import globalRouter from "./routers/globalRouter";
import commentRouter from './routers/commentRouter';

const PORT = 4000;

const app = express();
const logger = morgan('dev');


// db connection
createConnection()
  .then(() => {
    console.log('Database Connected :)');
  })
  .catch((error) => console.log(error));
  
// middleware
app.use(express.json()); //body parser(json)

app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
// app.use(express.static(__dirname+'/../src/imageStorage'));
app.use(express.static(__dirname+'/../src/imageStorage'));
// app.use(express.static('.'));

app.use(logger);
app.use(cors({
    origin : true,
    credentials : true
}));

// route
app.get('/', (req, res) => {
  res.send('NewDe is running...');
});

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/comment", commentRouter);



const handleListening = () => console.log(`Server Listening on https://server.newb-d.com:${PORT}`);

app.listen(PORT, handleListening);


//haha

