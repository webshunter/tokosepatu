"use client"
import Link from "next/link"
import { useEffect } from "react"
export const Header = function(){

    useEffect(()=>{

    })

    return (<>
        <nav className="fixed top-0 z-[999] h-[50px] w-[100vw] bg-blue-600 text-white px-10 py-2">
            <Link href="/">detail</Link>
        </nav>
        <nav className="px-10 py-2 shadow-md">
            <button className="pr-5">SEMUA KATEGORI</button>
            <Link className="pr-5 text-[14px]" href="/">Property</Link>
            <Link className="pr-5 text-[14px]" href="/">Motor Bekas</Link>
        </nav>
    </>)
}