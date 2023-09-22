"use client"
import { Header } from "@/app/component/header";

export default function Page({params}) {

    let [slug] = params.name; 

    return (<>
        <Header />
        <div className="relative my-5 mx-[50px]">
            <div className="max-w-[calc(100%-450px)] bg-yellow-100">
                <div className="bg-white shadow-md">
                    <img className="w-full" src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww&w=1000&q=80g" alt="Sunset in the mountains"></img>
                </div>
            </div>
            <div className="absolute w-[400px] top-0 right-0 px-5 py-3 bg-blue-100">

            </div>
        </div>
    </>)
}