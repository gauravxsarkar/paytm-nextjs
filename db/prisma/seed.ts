import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main(){
    const mohak = await prisma.user.upsert({
        where: {email : "shami@gmail.com"},
        update: {},
        create : {
            email : "shami@gmail.com",
            password : await bcrypt.hash("mohak",10 ), 
            name: "shami",
            Balance: {
                create : {
                    amount : 900000,
                    locked : 0
                }
            },
            OnRampTransaction : {
                create : {
                    startTime: new Date(),
                    status : "success",
                    amount : 900000,
                    token : "token_2",
                    provider : "sbi bank"
                }
            }
        }


    })
}

main()
.then(async()=> {
    await prisma.$disconnect()
})
.catch (async(e) => {
    console.log (e);
    await prisma.$disconnect();
    process.exit();
})