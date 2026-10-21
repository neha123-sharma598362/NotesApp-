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
    await mongoose.connect(process.env.Mongo_URL)
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
