"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
 const session = useSession()
  return (
   <div>
     <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}></Appbar>
   </div>
  );
}

interface props {
  user? : {
   name? : string | null
  }, 
  onSignin : any,
  onSignout : any
}

const Appbar = ({user, onSignin, onSignout}: props) => {
  return <div className="flex justify-between border-b px-4">
  <div className="text-lg flex flex-col justify-center">
    aja yaha pay kar 
  </div>
  <div className="flex flex-col justify-center pt-2">
      <button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</button>
  </div>
</div>
}


