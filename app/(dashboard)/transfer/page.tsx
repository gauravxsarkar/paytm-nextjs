"use client"
import CreateOnRampTransaction from "@/app/lib/actions/createOnRampTransactions"
import TransCard from "@/components/genTransac"

import { useState } from "react"

const SupportedBanks = [{
  name : "sbi",
  redirectUrl : "https://openai.com/chatgpt/"
}, {
  name : "axis",
  redirectUrl : "https://openai.com/chatgpt/"
}]

export default function() {
  const [provider, setProvider] = useState(SupportedBanks[0].name || "")
  const [redirectUrl, setRedirectUrl] = useState(SupportedBanks[0].redirectUrl || "")
  const [amount , setAmount] = useState(0)

  console.log(provider);

//
    return (
     
        <div>

            <h1 className="text-[3rem] font-bold ml-[3rem] mt-[3rem] text-purple-500">TRANSFER</h1>

<div className="grid grid-cols-2 p-[8rem] w-[100vw]">
      <div className="flex flex-col p-[3rem] ">
        <h1 className="text-[2rem] font-bold">Add Money</h1>

        <label htmlFor="" className="mt-[4rem]">Amount</label>
        <input type="text" className="w-[20rem] mt-[10px]" onChange={(c : any)=> {
               setAmount(c.target.value);
        }} />
 
        <label htmlFor="" className="mt-7">Bank</label>
        <select
  name=""
  id=""
  className="w-[20rem] mt-[10px] mb-8"
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedBank = SupportedBanks.find((bank) => bank.name === value);
    setRedirectUrl(selectedBank?.redirectUrl || "");
    setProvider(selectedBank?.name || "");
  }}
>
  <option value="">Select a Bank</option>
  {SupportedBanks.map((bank, index) => (
    <option key={index} value={bank.name}>
      {bank.name}
    </option>
  ))}
</select>


        <div className="flex justify-center items-center">
        <button className="bg-blue-500 font-semibold w-[12rem] p-[1rem] text-white rounded-full" onClick={async ()=> {
          await CreateOnRampTransaction(provider, amount )
          window.location.href = redirectUrl || "";
          console.log("successful")
        }}>Add Money</button>
        </div>

       

      </div>

     

      </div>
    </div>

  
    
    )
}

