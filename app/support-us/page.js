"use client"
import { useState } from 'react';

export default function SupportUs() {
    return (<>
        <style jsx global>{`
        nav .w-full .flex.justify-end {
            display: none;
        }
        `}</style>
        <div className="px-4 md:px-10 lg:px-28 my-5 bg-white">
            <div className="grid grid-cols-7 gap-6">
                <div className="col-span-7">
                    <div className="pt-4 w-full text-left md:text-center mb-8 text-3xl">Dukung Kami</div>
                    <div className="w-full">
                        <center className="text-2xl text-center">Donasi sekarang dan bantu kami mewujudkan impian Anda</center>
                    </div>
                    <div className="grid grid-cols-6 gap-6 shadow-lg rounded-[20px]">
                        <div className="hidden lg:block lg:col-span-2">
                            <center className="pt-[25%] pl-[5%]">
                                <img className="w-[50%]" src="/rumahjo-PNG.png" />
                            </center>
                        </div>
                        <div className="col-span-6 md:col-span-3 lg:col-span-2">
                            <center className="p-4">
                                <img className="md:w-[80%] lg:w-[70%]" src="/qris.jpeg" />
                            </center>
                        </div>
                        <div className="md:col-span-3 lg:col-span-2">
                            <img src="/feature-v1.jpg" className="hidden md:block pr-10 lg:mt-[-88px]"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}