import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

import dotenv from 'dotenv';
dotenv.config();

const morganFormat = ":method :url :status :response-time ms";


const app = express();

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );


// part of setup to tell express that we'll be using JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//nodemon restarts server upon any change we make. use install it as a "development dependency"
let teaArray = [];
let i = 1;


// update element
app.put("/tea/:id", (req, res) => {

    // example: you can use logger.warn logger.info logger.log instead of console, it will also append the log file
    logger.warn("An element was updated");


    const ele = teaArray.find(e => e.id === parseInt(req.params.id));
    if(!ele) {   
        return res.status(404).send("not found")
    }
    else{ 
        const {name, price} = req.body;
        ele.name = name;
        ele.price = price;
        res.status(200).send(ele)
    }
})

// delete
app.delete("/tea/:id", (req, res) => {
    const ele = teaArray.findIndex(e => e.id === parseInt(req.params.id));
    if(ele === -1) {   
        return res.status(404).send("not found")
    }
    else{ 
        teaArray.splice(ele, 1);
        res.status(200).send("deleted")
    }
})

// add tea element
app.post("/tea", (req, res) => {
    const hi = req.body;

    let newTea = {id: i++, ...hi} // this ...hi fetches key and value (this will scale if there are more properties) of dict from JSON and kind of uses it here directly! 
    teaArray.push(newTea);
    res.status(201).send(newTea);
})


// list all 
app.get('/tealist', (req, res) => {
    res.status(200).send(teaArray);
})

// get some particular element using ID
//this /:id is a special syntax, can be accessed by req.params.id
app.get('/tea/:id', (req,res) => { 
    const returnee = teaArray.find(k => {
        
        console.log(k.id);
        console.log(req.params.id);
        
        return (Number(k.id) === parseInt(req.params.id))});
    if(!returnee) return res.status(404).send("Couldn't find fr");
    else{return res.status(200).send(returnee);}
}) 

console.log(teaArray);

console.log(process.env.PORT);


app.listen(process.env.PORT, () => {console.log("listening");
})