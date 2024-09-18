import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main(){
    const mohak = await prisma.user.upsert({
        where: {email : "mohak@gmail.com"},
        update: {},
        create : {
            email : "mohak@gmail.com",
            password : "mohak",
            name: "mohak",
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
                    token : "token_1",
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