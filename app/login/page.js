"use client"
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/component/header";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import OtpInput from 'react-otp-input';
import { LoaderJo } from '@/app/component/loader';

export default function Login() {
    const { data: session } = useSession();
    const [value, setValue] = useState(null);
    const route = useRouter();
    const [showForm, setShowForm] = useState(null);
    const [showWa, setShowWa] = useState(null);
    const [otp, setOtp] = useState('');
    const [token, setToken] = useState(null);
    let [countDown, setCountDown] = useState(0);

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
        const intervalId = setInterval(() => {
            if (countDown > -1) {
                countDown--;
                setCountDown(countDown);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [session, route, setShowForm, setCountDown, countDown]);

    if (session){
        return (<div className='my-5 bg-white'>
            <div className='flex justify-center items-center py-10'>Anda sudah login</div>
        </div>);
    }else{
        return (<>
            {!showForm? 
                <LoaderJo />
            :
            <>
                {!showWa ?
                    <div className="my-5 bg-white">
                        <div className="px-0 md:px-10 lg:px-[111px] py-0 md:py-10 grid grid-cols-7 gap-6">
                            <div className="hidden md:block col-span-4">
                                <div className="block w-full h-full rounded">
                                    <img className="block h-full w-full rounded-[20px]" src="/banner rumahjo.com_04.png" ></img>
                                </div>
                            </div>
                            <div className="col-span-7 md:col-span-3 shadow-none md:shadow-lg rounded-none md:rounded-[20px] p-0 md:p-[16px] lg:p-[32px]">
                                <div className="md:border-b md:border-slate-300 shadow-xl md:shadow-none p-4 md:p-[8px] lg:p-[16px]">
                                    <div className="font-bold">Login/Register</div>
                                </div>
                                <form className="p-4 md:p-[8px] lg:p-[16px]">
                                    <div className="mb-[24px] md:mb-[12px] lg:mb-[24px]">
                                        <p className="font-medium leading-6 text-[14px]">Nomor Telepon</p>
                                        <div className="block mb-[8px] md:mb-0 lg:mb-[16px]">
                                            <PhoneInput
                                                defaultCountry="ID"
                                                placeholder="Enter phone number"
                                                value={value}
                                                onChange={setValue} />
                                        </div>
                                    </div>
                                    <button type='button' onClick={ async ()=>{
                                        try{
                                            if(value != ""){
                                                let data = await fetch('https://app.rumahjo.com/token/request/' + value.replace(/\+/g, ""))
                                                let dataJson = await data.json();
                                                if (dataJson.status) {
                                                    setCountDown(60);
                                                }
                                                setShowWa(true);
                                            }else{
                                                alert("Pastingan normor diisi dengan benar");
                                            }
                                        }catch(e){
                                            alert("Pastingan normor diisi dengan benar");
                                        }
                                    }} className="bg-indigo-950 text-white rounded-lg w-full text-[16px] mb-[24px] md:mb-[8px] lg:mb-[16px] h-10">Selanjutnya</button>
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
                : 
                    <div className='flex my-10 justify-center py-3'>
                            <div className='w-[350px] border-2 border-indigo-950 p-10 shadow-md'>
                                <OtpInput
                                    className="text-gray-700"
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                                {otp.length == 6 ?
                                    <button onClick={() => {
                                        let awl = otp.substring(0, 3);
                                        let akhir = otp.substring(3, 6);
                                        let getOtp = awl + '-' + akhir;
                                        fetch('https://app.rumahjo.com/token/cek/' + getOtp)
                                        .then(function( w ){
                                            return w.json()
                                        })
                                        .then(function(res){
                                            console.log(res)
                                        })
                                    }} className='w-full bg-blue-900 text-white p-1 rounded mb-2'>Submit</button>
                                    :
                                    <></>
                                }
                                {countDown > 0 ?
                                    <div className='p-2 text-center'>
                                        <span>Silahkan inputkan token yang dikirim ke WA anda sebelum {countDown}</span>
                                    </div>
                                :
                                    <button className="w-full bg-white border-2 border-indigo-950 p-1 rounded mb-2">Minta Ulang Token</button>
                                }
                                <button onClick={()=>{
                                    setShowWa(null)
                                }} className="w-full bg-white border-2 border-indigo-950 p-1 rounded">Ubah no WA</button>
                            </div>
                    </div>
                }
                
            </>
            }
            <style jsx global>
                {`
                input{
                    min-width: 40px;
                }
                nav .w-full .flex.justify-end {
                    display: none;
                }
                .PhoneInputInput {
                    height: 2.5rem;
                    border-radius: 0px 0.5rem 0.5rem 0px;
                }
                `}
            </style>
        </>)
    }
    }
