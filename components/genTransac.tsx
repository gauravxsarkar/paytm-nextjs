import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/prisma/index"



async function getTransactions(){
    const session = await getServerSession(authOptions);
    const userid = session?.user?.id 
    const Transactions = await prisma.onRampTransactions.findMany({
        where : {
            userId : Number(userid)
        }
    }); 
    return Transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransCard() {
    const Transfer = await getTransactions();

    return <div>
       <h1 className="font-semibold text-[30px] mb-2 mt-3">OnRamped Transactions</h1>
       <ul className="flex">
         {Transfer.map((t, index) => (
             <li key={index} >
                <div className="m-5 text-2xl bg-violet-500 p-7 rounded-2xl text-white">
                <strong>Time:</strong> {t.time.toDateString()} <br />
                <strong>Amount:</strong> ++{(t.amount)/100} <br />
                <strong>Status:</strong> {t.status} <br />
                <strong>Provider:</strong> {t.provider} <br />
                </div>
           </li>
         ))
         }
       </ul>
    </div>
}