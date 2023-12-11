"use client"
import React from "react";
import { usePathname } from "next/navigation";

export default function WaButton({className,phone,children}){
    const pathname = usePathname();
    return <>
        <button className={className?className:""} onClick={()=>{
            let text = `Hai, saya tertarik dengan informasi terkait iklan tersebut: ${`https://rumahjo.com` + pathname}`
            window.open('https://api.whatsapp.com/send?phone=' + phone + '&text=' + text, '_blank');
        }}>
            {children}
        </button>
    </>
}