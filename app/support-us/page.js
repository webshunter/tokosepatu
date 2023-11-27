"use client"
import { useState } from 'react';

export default function SupportUs() {
    return (<>
        <style jsx global>{`
        nav .w-full .flex.justify-end {
            display: none;
        }
        .donate .banner::before {
            background:url(/horizontal-curv.svg) center bottom no-repeat;
            bottom:0;
            width:102%;
            right:0;
            height:auto;
            background-size:104%;
        }
        `}</style>
        <div className="px-4 md:px-10 my-5 bg-white">
            <div className="pt-4 w-full text-left md:text-center mb-8 text-3xl">Dukung Kami</div>
            <div className="donate block lg:flex overflow-hidden relative shadow-lg rounded-[20px]">
                <div className="banner w-full md:w-5/5 lg:w-3/5 relative overflow-hidden max-h-[600px]">
                    <img src="/Designer.png" className="w-full h-full object-cover object-left align-middle"></img>
                </div>
                <div className="p-4 w-full md:w-5/5">
                    <div className="w-full">
                        <center className="text-2xl text-center">Donasi sekarang dan bantu kami mewujudkan impian Anda</center>
                    </div>
                    <div className="block md:flex">
                        <div className="w-4/4 md:w-2/4 mx-[20px] md:mx-[30px] py-4 md:py-[30px]">
                            <img className="max-w-[100%] lg:max-w-[75%] px-[75px] md:px-[55px] lg:px-[40px]" src="https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png" />
                            <img className="max-w-[100%] lg:max-w-[75%]" src="/qr.svg"></img>
                        </div>
                        <div className="w-4/4 md:w-2/4 text-center md:text-left mx-[20px] md:mt-[100px] md:mx-[10px] py-2 md:py-[30px]">
                            <h2 className="text-xl md:text-3xl">BANK BCA</h2>
                            <h3 className="text-2xl md:text-4xl">12345678900</h3>
                            <h2 className="text-xl md:text-3xl">RUMAHJODOTCOM</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}