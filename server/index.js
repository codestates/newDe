
import express from 'express'
import cors from 'cors'
import mysql from 'mysql'


const app = express();
const port = 8080;

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'image_practice'
  })
  
  db.connect()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/user/:id',(req,res)=>{
    console.log(req.params)
    db.query(`SELECT * from content where id=${req.params.id}`,(err,result)=>{
        if(err){
            console.log('err')
        } else {
            res.json({data:result})
        }
    })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

