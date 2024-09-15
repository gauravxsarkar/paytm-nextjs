const express = require("express")

const app = express();


app.post("/", (req ,res) => {
    
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.userId,
        amount : req.body.amount
    }

    res.json({
        msg : "hello"
    }) 
})

app.get("/hi", (req,res)=> {
    res.json({
        msg : "hello"
    }) 
})


app.listen(8080)