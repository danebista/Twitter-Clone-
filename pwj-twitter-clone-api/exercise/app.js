const express= require('express')   
const app= express()
const port = 3000
const Twitter= require('./api/helper/twitter');
require('dotenv').config();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

const twitter= new Twitter(); 

app.get('/tweets', (req, res)=>{
    const q= req.query.q 
    const count= req.query.count
    const maxId= req.query.max_id
    twitter.get(q, count, maxId).then((response)=>{
        res.status(200).send(response.data);
    }).catch((error)=> {
        res.status(400).send(error);
    });
})

app.listen(port, ()=>console.log(`listening on port ${port}!`));
