"use server";

import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export default async function CreateOnRampTransaction(provider : string, amount : number) {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session.user?.id){
         return {
            msg : "unauthenticated user" 
         }
   }
   
   
const token = (Math.random()*1000).toString()

const status =   await prisma.onRampTransactions.create({
    data: {
      provider,
      status: "pending",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100
    }
   })

   console.log(status);

}