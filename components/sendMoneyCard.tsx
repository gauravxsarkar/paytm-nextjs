"use client";
import CreateP2PTransactions from "@/app/lib/actions/createP2PTransactions";
import TransferP from "@/app/lib/actions/P2Ptransfer"
import { useState } from "react"

export default function SendMoney( ){
   const [amount , setAmount] =  useState(0)
   const [email, setEmail] = useState("")

    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-10 mb-4">
           <div className="flex flex-col">
            <label htmlFor="" className="text-[1rem]">Enter EmailId</label>
            <input type="text" className="p-2 bg-slate-200" onChange={(e)=> {
               setEmail(e.target.value)
            }}/>
            </div>

            <div className="flex flex-col mb-4">
            <label htmlFor="" className="text-[1rem]">Amount</label>
            <input type="" className="p-2 bg-slate-200" onChange={(e)=> {
                setAmount(Number(e.target.value))
            }}/>
            </div>

            <button className="p-3 rounded-3xl bg-green-600" onClick={async ()=> {
                TransferP(email, amount)
                CreateP2PTransactions(amount, email)
            }}>
                Send
            </button>
            
        </div>
    )
}