import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/prisma/index"


async function getNames(){
    const session = await getServerSession(authOptions);
    const userid = session?.user?.id 
    const User = await prisma.user.findUnique({
        where : {
            id : Number(userid)
        }
    }); 
  return {
    email : User?.email ,
    name : User?.name
}}

async function getBalance(){
    const session = await getServerSession(authOptions);
    const userid = session?.user?.id 
    const User = await prisma.balance.findUnique({
        where : {
            userId : Number(userid)
        }
    }); 

    const amount = ((User?.amount ?? 0)/100)
  return amount
}

export default async function DashBoard() {
    const User = await getNames()
    const balance = await getBalance()

    return <div>
         <p className="text-[3rem] font-bold flex items-center ml-4 ">
         Welcome  <span className="text-[3rem] font-extrabold text-violet-700 ml-2"> {User.name || "0xUser"}</span>
        </p> 
     
     <p className="text-[3rem] font-bold flex items-center ml-4 ">
     Your Email Id is  <span className="text-[3rem] font-extrabold text-violet-700 ml-2"> {User.email}</span>
     </p>  

     <p className="text-[3rem] font-bold flex items-center ml-4 ">
     Your Current Balance : Rs <span className="text-[3rem] font-extrabold text-violet-700 ml-2"> { balance }</span>
     </p>  

    </div>
}