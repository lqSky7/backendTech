import express from "express";
const app = express();

// part of setup to tell express that we'll be using JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//nodemon restarts server upon any change we make. use install it as a "development dependency"
let teaArray = [];
let i = 0;

app.post("/tea", (req, res) => {
    const hi = req.body;

    let newTea = {id: i++, ...hi} // this ...hi fetches key and value (this will scale if there are more properties) of dict from JSON and kind of uses it here directly! 
    teaArray.push(newTea);
    res.status(201).send(newTea);
})

app.listen(3001, () => {console.log("listening");
})