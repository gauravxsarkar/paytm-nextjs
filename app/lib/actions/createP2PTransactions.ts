"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/db/prisma";

export default async function CreateP2PTransactions ( amount : number ,ToUserId : string){
   const session =  await getServerSession(authOptions)
   const FromUserId = session?.user?.id 

   if(!FromUserId){
    return {
        msg : "invalid access and user"
    }
}

const To = await prisma.user.findUnique({
    where : {
        email : ToUserId
    }
})

const ToId = To?.id

await prisma.p2pTransactions.create({
    data : {
        amount : amount*100,
        startTime : new Date(),
        fromUserId : Number(FromUserId),
        toUserId : Number(ToId)
    }
})
}