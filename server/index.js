const express = require('express')
const cors = require('cors')
const data = require('./data/data.json')

const PORT = 9090

const app = express();

app.use(cors());
app.use(express.static('public'));

const start = () =>{
    app.listen(PORT, ()=>{
        console.log(`Server is running ${PORT}`);
    });
}

app.get('/',(req,res)=>{
    res.end("Hello")
})

app.get('/data',(req,res)=>{
    res.send({data : data})
})

start();
