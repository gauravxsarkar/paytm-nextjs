"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";


export const Sidebar = ({href , title }: {href : string, title: string})=> {
    const router = useRouter();
    const pathname = usePathname();

    const selected = pathname === href

    return (
        <div onClick={()=> {
            router.push(href)
        }}>
            <div>
                {title}
            </div>
        </div>
    )
}