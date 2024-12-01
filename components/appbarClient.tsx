"use client"
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";


 function AppbarClient(){


    const session = useSession();
    const router = useRouter();
    
return(
    <div>
<Appbar onSignin={signIn} onSignout={async()=>{
    await signOut();
    router.push("/api/auth/signin")
}} user={session.data?.user}></Appbar>
    </div>
)
}

interface props {
    user? : {
     name? : string | null
    }, 
    onSignin : any,
    onSignout : any
  }

 const Appbar = ({user, onSignin, onSignout}: props) => {
    return <div className="flex justify-between border-b px-4 pt-5 pb-3">
    <div className="text-lg flex flex-col justify-center">
      <div className="grid grid-cols-2">
        <div className="text-[2rem] font-bold flex items-center ml-4 "> <span className="text-[2rem] font-extrabold text-violet-700">ONE</span>pay</div>
     
      </div>
    </div>
    <div className="flex flex-col justify-center pt-2">
        <button className="bg-violet-700 text-white font-semibold px-4 py-2 rounded-lg" onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</button>
    </div>
  </div>
  }

  export default dynamic (() => Promise.resolve(AppbarClient), {ssr: false, suspense: true})

