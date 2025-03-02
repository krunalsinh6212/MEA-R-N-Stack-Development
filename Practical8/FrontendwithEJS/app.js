const path = require('path');
const axios = require('axios'); //it is used for to call API ( UDApi / Third party)

const express = require('express');
const app = express();

const ejs = require('ejs');

//Set view-engine
app.set('views',path.join(__dirname,'views'));			
app.set('view engine', 'ejs');

//Set the middleware for form-data to json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/css", express.static(
    path.join(__dirname, 'node_modules/bootstrap/dis/css')));

require('dotenv').config();
const PORT = process.env.PORT;

//Show all products
app.get("/", async(req, res)=>{
    try {
        const data = await axios.get(`http://localhost:3001/api/v1/getallproducts`)
        res.render("index", { data: data.data.products});      
    }
    catch(err) { res.status(500).send(err.message);}
});

//Render fresh product entry form
app.get("/addproduct", async(req, res)=>{
    res.render("addproduct");
})

//Cretae new product
app.post("/createproduct", async(req, res)=>{
    const { productid, productname, description, quantity, price} = req.body;
    await axios.post(`http://localhost:3001/api/v1/createproduct`,
        {
            productid: productid, 
            productname: productname,
            description: description, 
            quantity: quantity, 
            price: price
        }
    )
    .then(async response=> {
        const data = await axios.get(`http://localhost:3001/api/v1/getallproducts`)
        res.render("index", { data: data.data.products});      
    })
    .catch((err) => { res.status(500).send(err.message);})
});

//Delete product
app.get("/delproduct/:prcode", async(req, res)=>{
    const productid  = req.params.prcode;
    const success= 
        await axios.delete(`http://localhost:3001/api/v1/delproduct/${productid}`)
    .then(async response=> {
        const data = await axios.get(`http://localhost:3001/api/v1/getallproducts`)
        res.render("index", { data: data.data.products});      
    })
    .catch((err) => { res.status(500).send(err.message)});
});

//Get and Update product
app.get("/updateproduct/:prcode", async(req, res)=>{
    try {
        const productid  = req.params.prcode;
        const successproduct = 
            await axios.get(`http://localhost:3001/api/v1/getproduct/${productid}`)
        res.render("updateproduct", { data: successproduct.data.product});      
    }
    catch(err) 
    { 
        res.status(500).send(err.message);
    }
});

app.post("/updateproduct/:prcode", async(req, res)=>{
    await axios.put(
        `http://localhost:3001/api/v1/updproduct/${req.params.prcode}`,
        { 
            productid: req.params.prcode, 
            productname: req.body.productname,
            description: req.body.description, 
            quantity: req.body.quantity, 
            price: req.body.price 
        }
    )
    .then(async response=> {
        const data = await axios.get(`http://localhost:3001/api/v1/getallproducts`)
        res.render("index", { data: data.data.products});      
    })
    .catch((err)=> 
        res.status(500).send(err.message)
    );    
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});