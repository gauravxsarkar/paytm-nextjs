const express = require("express")
import prisma from "../../db/prisma/index";
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());


app.post("/sbiWebhook", async (req : any ,res: any) => {
    
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.userId,
        amount : req.body.amount
    };

    try {

       await prisma.$transaction(
        [
            prisma.balance.updateMany(
                {
                    where: {
                        userId : Number( paymentInfo.userId )
                    },
                    data : {
                        amount : {
                            increment : Number( paymentInfo.amount)
                        }
                    }
                }
            ) ,
        
          prisma.onRampTransactions.updateMany(
                {
                    where : {
                        token : paymentInfo.token
                    },
                    data : {
                        status : "success"
                    }
                }
            )  
        ]
       )

       res.status(200).json({
        msg : "captured"
    }) 

      
    } catch (e) {
        res.status(411).json({
            msg : "error while processing"
        })
    }

  
})



app.post("/hi", async (req : any, res : any)=> {
   
   const email = req.body.email;
   const password = req.body.password;

   const hashedPw = await bcrypt.hash(password, 10);

   const user = await prisma.user.create({
    data: {
        email: email,
        password: hashedPw
    }
});
   
  if(user){
    res.json({
        msg : "hello"
    }) 
  }else {
    res.json({
        msg : "sahi se import kar"
    })
  }


})


app.listen(8080)