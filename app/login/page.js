"use client"
import Image from 'next/image'
import { Header } from "@/app/component/header";
import { useEffect, useState } from "react";

export default function Login() {
    return (<>
    <div className="my-5 bg-white">
        <div className="px-0 md:px-10 py-0 md:py-10 grid grid-cols-3 gap-6">
            <div className="hidden md:block col-span-2">
                <div className="block w-full h-full rounded">
                    <img className="block h-full w-full rounded-[20px]" src="/bannerlogin.png" ></img>
                </div>
            </div>
            <div className="col-span-3 md:col-span-1 shadow-none md:shadow-lg rounded-none md:rounded-[20px] p-0 md:p-[32px]">
                <div className="md:border-b md:border-slate-300 shadow-xl md:shadow-none p-4 md:p-[16px]">
                    <div className="font-bold">Login/Register</div>
                </div>
                <form className="p-[16px]">
                    <div>
                        <p className="font-medium leading-6 text-[14px]">Nomor Telepon atau Email</p>
                        <div className="mb-[16px]">
                            <input className="rounded px-[16px] py-[10px] w-full border border-inherit" placeholder="Masukan Nomor Telepon atau Email"></input>
                        </div>
                    </div>
                    <p className="font-medium leading-6 text-[14px] pointer text-indigo-800 underline mb-[24px]">Lupa Password?</p>
                    <button className="bg-indigo-950 text-white rounded-lg w-full text-[16px] mb-[16px] h-10">Selanjutnya</button>
                    <div className="flex w-full gap-4 mb-[16px] items-center">
                        <hr className="border-b w-full" />
                        <p className="w-full whitespace-nowrap text-gray-500 text-[14px]">Atau gunakan dengan akun</p>
                        <hr className="border-b w-full" />
                    </div>
                    <div className="rounded-lg w-full text-[16px] mb-[16px] h-10 flex relative items-center text-center px-4 border border-slate-400 cursor-pointer">
                        <span className="flex absolute items-center mr-[.25rem]">
                            <Image src="https://storage.googleapis.com/core-asset/static/images/assets/icon-google.svg" width={24} height={24} alt="Login with Google" />
                        </span>
                        <span className="m-auto text-slate-700">Google</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <style jsx global>
        {`
        nav .w-full .flex.justify-end {
            display: none;
        }
        `}
    </style>
    </>)
}