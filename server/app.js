
import express from "express";

export const app = express();

app.get('/', function (req, res) {
    res.send('Hello')
})

app.listen(3000, ()=>console.log("Hi"))
