import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/prisma/index"



async function getTransactions(){
    const session = await getServerSession(authOptions);
    const userid = session?.user?.id 
    const Transactions = await prisma.p2pTransactions.findMany({
        where : {
            fromUserId : Number(userid)
        }
    }); 
    return Transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
    }))
}

export default async function P2PtransferCard() {
    const Transfer = await getTransactions();

    if(!Transfer.length){
        return <div>
             <h1 className="font-semibold text-[30px] mb-2 mt-3">P2P Transactions</h1>
            <p className="text-xl text-red-500"> no transactions done yet</p>
        </div>
    }

    return <div>
       <h1 className="font-semibold text-[30px] mb-2 mt-3">P2P Transactions</h1>
       <p className="text-xl font-bold text-red-500"> *only amount debited from your wallet is being recorded </p>
       <ul className="flex">
         {Transfer.map((t, index) => (
             <li key={index} >
                <div className="m-5 text-2xl bg-violet-500 p-7 rounded-2xl text-white">
                <strong>Time:</strong> {t.time.toDateString()} <br />
                <strong>Amount:</strong> -{(t.amount)/100} <br />
                </div>
           </li>
         ))
         }
       </ul>
    </div>
}