const express = require('express');
const mongoose = require('mongoose');
const {checkExistingUser} = require("./utility");
const app =express();
const cors = require('cors')
const userModel = require('./schema');
const postModal=require('./postSchema');
const buyModal=require('./buySchema');
const {CheckBuy}=require('./utility');
const {Remove}=require('./utility');
const { remove } = require('./postSchema');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.listen(process.env.PORT || 3003,()=>{
    console.log('server running at 3003 port');
});
mongoose.connect('mongodb://localhost/api_web_tech_assignment',()=>{
    console.log('connected to DB')
}),
    (err)=>console.log(err);
    

    app.post("/", async (req, res)=> {
        if(await checkExistingUser(req.body.email)) {
            res.status(400).send("email exist. Please try with different email");
        } else {
    userModel.create({email: req.body.email,Cust_id:req.body.Cust_id,Cust_name:req.body.Cust_name})
                                .then(()=> { 
                                    res.status(200).send(`${req.body.email} added successfully`); 
                                }).catch((err)=> {
                                    res.status(400).send("user already exists")
            });
        }
        
    });
    app.post("/add",(req,res)=>{
        postModal.create({ 
            inventory_id:req.body.inventory_id,
            inventory_type:req.body.inventory_type,
            item_name:req.body.item_name,
            available:req.body.available
     })
    .then((data)=>{
     res.status(200).send(data)
    }).catch((err)=>{
    console.log(err)
    })                        
    })
    app.post("/buy",(req,res)=>{
        if(CheckBuy(req.body.inventory_id1,req.body.req_item))   {
            Remove(req.body.inventory_id1,req.body.req_item)
            res.send("item updated")
        }  
        else{
            res.send("item not available");
        }                   
    })