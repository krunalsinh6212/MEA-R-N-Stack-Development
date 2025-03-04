const express =require('express');
const path = require('path');

const app = express();
const PORT =3000;
const pagepath=path.join(__dirname+"/pages/");

app.get("/",(req,res)=>{
    res.sendFile(path.join(pagepath+"index.html"))
})

app.get("/aboutus",(req,res)=>{
    res.sendFile(path.join(pagepath+"aboutus.html"))
})

app.get("/product",(req,res)=>{
    res.sendFile(path.join(pagepath+"product.html"))

})
app.get("/service",(req,res)=>{
    res.sendFile(path.join(pagepath+"service.html"))
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(pagepath+"contact.html"))
})

app.listen(PORT,()=>{
    console.log(`Server is running on :http://localhost:${PORT}`); 
})
