import express from "express";
const app = express();

interface messageInterface{
    id: string;
    msg: string;
}

app.get("/", (req, res) => {
    res.send("server up");
})

app.get("/mes", (req, res) => {
    const messages: messageInterface[]  = [
        {
            id: "1",
            msg: "hi"
        },
        {
            id: "2",
            msg: "hi"
        },
        {
            id: "3",
            msg: "hi"
        },
        {
            id: "4",
            msg: "hi"
        },
        {
            id: "5",
            msg: "6"
        },
    ]

    res.send(messages);
})

app.listen(process.env.PORT || 3001, () => {
    console.log("listening");
})