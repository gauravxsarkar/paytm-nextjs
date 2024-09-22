"use server";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function TransferP(to : string, amount: number){
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id 

    if(!userId){
        return {
            msg : "invalid access and user"
        }
    }

    const ToUser = await prisma.user.findUnique({
        where: {
            email : to
        }
    })

    if (!ToUser){
        return {
            msg : "user not found"
        }
    }

    const ToUserId = ToUser.id;

    await prisma.$transaction(async (tx) => {

        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;

        const from = await tx.balance.findUnique({
            where : {
               userId : Number(userId)
            }
        });

        if(!from || from.amount < amount || !from.amount){
            return {
                msg : "insufficient funds"
            }
        }

        await tx.balance.update({

            where : {
                userId : Number(userId) 
            },
            data : {
                amount : { decrement: amount }
            }
        })

        await tx.balance.update({
            where : {
                userId : Number(ToUserId) 
            },
            data : {
                amount : { increment: amount }
            }
        })
    })
}