const express =require('express');
const path = require('path');

const app = express();
const PORT =3000;
const pagepath=path.join(__dirname+"/pages/");

// app.use("/styles/css",express.static(
//     path.join(__dirname,"node_modules/bootstrap/dist/css")
// ));

app.get("/",(req,res)=>{
    // res.send("<h1> Welcome to home page</h> <br>"+
    //     "<a href='/'>Home</a>&nbsp;"+
    //     "<a href='/aboutus'>About us</a>&nbsp;"+
    //     "<a href='/products'>Product</a>"
    res.sendFile(path.join(pagepath+"index.html"))


    // );
})

app.get("/aboutus",(req,res)=>{
    // res.send("<h1> Welcome to about us page");
    res.sendFile(path.join(pagepath+"aboutus.html"))
})

app.get("/product",(req,res)=>{
    // res.send("<h1> Welcome to Products page");
    res.sendFile(path.join(pagepath+"product.html"))

})
app.get("/service",(req,res)=>{
    // res.send("<h1> Welcome to Products page");
    res.sendFile(path.join(pagepath+"service.html"))
})

app.get("/contact",(req,res)=>{
    // res.send("<h1> Welcome to Products page");
    res.sendFile(path.join(pagepath+"contact.html"))
})

app.listen(PORT,()=>{
    console.log(`Server is running on :http://localhost:${PORT}`); 
})
