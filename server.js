
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


//mongodb connection
main().then(()=>{
    console.log("connection successful");
    
}).catch((err) => console.log(err));


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/notesApp")
}


//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.json());
app.use(cors());



// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);


//Port
app.listen(3000,()=>{
    console.log("app listening on port 3000");
    
});