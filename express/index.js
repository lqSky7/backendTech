import express from "express";
const app = express();

// part of setup to tell express that we'll be using JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//nodemon restarts server upon any change we make. use install it as a "development dependency"
let teaArray = [];
let i = 1;


// update element
app.put("/tea/:id", (req, res) => {
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
app.put("/tea/:id", (req, res) => {
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

app.listen(3001, () => {console.log("listening");
})