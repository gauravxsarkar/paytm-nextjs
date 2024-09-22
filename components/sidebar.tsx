"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";


export const Sidebar = ({href , title }: {href : string, title: string})=> {
    const router = useRouter();
    const pathname = usePathname();

    const selected = pathname === href

    return (
        <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8 w-[500px] `} onClick={()=> {
            router.push(href)
        }}>
            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"} text-[1.5rem] mt-3`}>
                {title}
            </div>
        </div>
    )
}