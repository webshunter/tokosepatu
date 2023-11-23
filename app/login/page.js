"use client"
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/component/header";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';

export default function Login() {
    const { data: session } = useSession();
    const [value, setValue] = useState(null);
    const route = useRouter();
    const [showForm, setShowForm] = useState(null);

    useEffect(()=>{
        const redirectHome = function(){
            if(session){
                route.push('/');
            }
            setShowForm(true);
        };
        setTimeout(()=>{
            redirectHome();
        },1000);
    }, [session, route, setShowForm]);

    if (session){
        return (<div className='my-5 bg-white'>
            <div className='flex justify-center items-center py-10'>Anda sudah login</div>
        </div>);
    }else{
        return (<>
            {!showForm? 
                <div className='px-[50px] pt-[50px] h-screen'>
                    <div className="loader">Rumahjo
                        <span></span>
                    </div>
                </div>
                // <div className='px-[50px] pt-[50px]'>
                //     <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                //         <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                //             <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                //             </svg>
                //         </div>
                //         <div className="w-full">
                //             <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                //             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                //             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                //             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                //             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                //             <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                //         </div>
                //         <span className="sr-only">Loading...</span>
                //     </div>
                // </div>
            :
            <>
                <div className="my-5 bg-white">
                    <div className="px-0 md:px-10 lg:px-[111px] py-0 md:py-10 grid grid-cols-7 gap-6">
                        <div className="hidden md:block col-span-4">
                            <div className="block w-full h-full rounded">
                                <img className="block h-full w-full rounded-[20px]" src="/bannerlogin.png" ></img>
                            </div>
                        </div>
                        <div className="col-span-7 md:col-span-3 shadow-none md:shadow-lg rounded-none md:rounded-[20px] p-0 md:p-[16px] lg:p-[32px]">
                            <div className="md:border-b md:border-slate-300 shadow-xl md:shadow-none p-4 md:p-[8px] lg:p-[16px]">
                                <div className="font-bold">Login/Register</div>
                            </div>
                            <form className="p-4 md:p-[8px] lg:p-[16px]">
                                <div>
                                    <p className="font-medium leading-6 text-[14px]">Nomor Telepon</p>
                                    <div className="block mb-[8px] md:mb-0 lg:mb-[16px]">
                                        <PhoneInput
                                            defaultCountry="ID"
                                            placeholder="Enter phone number"
                                            value={value}
                                            onChange={setValue} />
                                    </div>
                                </div>
                                <p className="font-medium leading-6 text-[14px] pointer text-indigo-800 underline mb-[24px] md:mb-[12px] lg:mb-[24px]">Lupa Password?</p>
                                <button className="bg-indigo-950 text-white rounded-lg w-full text-[16px] mb-[24px] md:mb-[8px] lg:mb-[16px] h-10">Selanjutnya</button>
                                <div className="flex w-full gap-4 mb-[24px] md:mb-[8px] lg:mb-[16px] items-center">
                                    <hr className="border-b w-full" />
                                    <p className="w-full whitespace-nowrap text-gray-500 text-[14px]">Atau gunakan dengan akun</p>
                                    <hr className="border-b w-full" />
                                </div>
                                    <button type='button' onClick={() => signIn('google')} className="rounded-lg w-full text-[16px] mb-[16px] md:mb-[8px] lg:mb-[16px] h-10 flex relative items-center text-center px-4 border border-slate-400 cursor-pointer">
                                    <span className="flex absolute items-center mr-[.25rem]">
                                        <Image src="https://storage.googleapis.com/core-asset/static/images/assets/icon-google.svg" width={24} height={24} alt="Login with Google" />
                                    </span>
                                    <span className="m-auto text-slate-700">Google</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </>
            }
            <style jsx global>
                {`
                nav .w-full .flex.justify-end {
                    display: none;
                }
                .PhoneInputInput {
                    height: 2.5rem;
                    border-radius: 0px 0.5rem 0.5rem 0px;
                }
                .loader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 150px;
                    height: 150px;
                    background: transparent;
                    border: 3px solid rgba(0, 102, 255, 0.1);
                    border-radius: 50%;
                    text-align: center;
                    line-height: 150px;
                    font-family: sans-serif;
                    font-size: 20px;
                    color: #ffe40c;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    text-shadow: 0 0 10px #ffe40c;
                    box-shadow: 0 0 20px rgba(0, 0, 0, .15);
                  }
                  
                  .loader::before {
                    content: '';
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    width: 100%;
                    height: 100%;
                    border: 3px solid transparent;
                    border-top: 3px solid #1e1b4b;
                    border-right: 3px solid #1e1b4b;
                    border-radius: 50%;
                    animation: animateC 2s linear infinite;
                  }
                  
                  .loader span {
                    display: block;
                    position: absolute;
                    top: calc(50% - 2px);
                    left: 50%;
                    width: 50%;
                    height: 4px;
                    background: transparent;
                    transform-origin: left;
                    animation: animate 2s linear infinite;
                  }
                  
                  .loader span::before {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #1e1b4b;
                    top: -6px;
                    right: -8px;
                    box-shadow: 0 0 20px 5px #4f46e5;
                  }
                  
                  @keyframes animateC {
                    0% {
                      transform: rotate(0deg);
                    }
                  
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                  
                  @keyframes animate {
                    0% {
                      transform: rotate(45deg);
                    }
                  
                    100% {
                      transform: rotate(405deg);
                    }
                  }       
                `}
            </style>
        </>)
    }
    }
