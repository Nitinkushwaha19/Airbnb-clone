const mongoose = require("mongoose");
const Listing = require("../models/listening");
const initData = require("../init/data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main(){{
    await mongoose.connect(MONGO_URL);
}}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6560edd5b9e2caba57941b44"}))
    await Listing.insertMany(initData.data);
    console.log("Data was intialized");
}

initDB();