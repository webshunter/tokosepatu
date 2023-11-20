"use client"
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/component/header";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { useAlert } from 'react-alert';


export default function Login() {
    const alert = useAlert()
    const { data: session } = useSession();
    const route = useRouter();
    const [showForm, setShowForm] = useState(null);
    const [value, setValue] = useState(null);
    const [otp, setOtp] = useState('');
    const [hidden, setHidden] = useState(null);
    const [USR, setUSR] = useState(null);
    const [verified, setVerified] = useState(null);
    let [countDown, setCountDown] = useState(0);

    useEffect(() => {
        const redirectHome = async function () {
            if (session && !USR) {
                let {email} = session.user;
                let data = await fetch('/api/user?email='+email);
                let datatUser = await data.json();
                let [User] = datatUser.message
                setUSR(User.uniqid);
                if(User.telp && User.telp != ""){
                    setVerified(true);
                }
            }
        };
        redirectHome();
        const intervalId = setInterval(()=>{
            if (countDown > -1) {
                countDown--;
                setCountDown(countDown);
            }
        },1000);
        return () => clearInterval(intervalId);
    }, [session, route, setShowForm, setUSR, setCountDown, countDown]);


    if (!verified){
        if(!USR){
            return <>
                <div className='mt-[50px] flex justify-center items-center'>
                    <div className='w-[320px] border-2 border-indigo-950 p-10'>
                        <div role="status" class="max-w-sm animate-pulse">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        }else{
            return (<div className='flex justify-center items-center mt-[100px] mb-[50px] bg-white'>
                <div className='w-[340px] shadow-md p-10 border-2 border-indigo-950'>
                    {
                        !hidden ?
                            <div>
                                <PhoneInput
                                    defaultCountry="ID"
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue} />
                                <button onClick={async () => {
                                    if (!value) {
                                        alert.show('Please insert number')
                                        throw false;
                                    }
                                    let data = await fetch('https://app.rumahjo.com/token/request/' + value.replace(/\+/g,""))
                                    let dataJson = await data.json();
                                    if(dataJson.status){
                                        setCountDown(60);
                                        setHidden(true);
                                    }else{
                                        alert.show('Please insert right phone number')
                                    }
                                }} className='w-full bg-blue-900 text-white p-1 rounded'>Request Token</button>
                            </div>
                            :
                            <div className='w-full flex justify-center'>
                                <div>
                                    <OtpInput
                                        className="text-gray-700"
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                    {otp.length ==6?
                                        <button onClick={async () => {
                                            if(otp.length == 6){
                                                let awl = otp.substring(0,3);
                                                let akhir = otp.substring(3,6);
                                                let getOtp = awl+'-'+akhir;
                                                let data = await fetch('https://app.rumahjo.com/token/approval/'+getOtp+'/' + USR );
                                                let dataJson = await data.json();
                                                if(dataJson.status){
                                                    setVerified(true);
                                                }else{
                                                    alert.show('Pastikan token sudah sesuai')
                                                }
                                            }
                                        }} className='w-full bg-blue-900 text-white p-1 rounded mb-2'>Submit</button>
                                        :
                                        <></>
                                    }
                                    <button onClick={()=>{
                                        setOtp("");
                                    }} className='w-full bg-blue-900 text-white p-1 rounded mb-2'>clear</button>
                                    {countDown > 0?
                                        <div className='p-2 text-center'>
                                            <span>Silahkan inputkan token yang dikirim ke WA anda sebelum {countDown}</span>
                                        </div>
                                        :
                                        <button onClick={ async ()=>{
                                            let data = await fetch('https://app.rumahjo.com/token/request/' + value.replace(/\+/g, ""))
                                            let dataJson = await data.json();
                                            if (dataJson.status) {
                                                setCountDown(60);
                                            }
                                        }} className='w-full bg-blue-900 text-white p-1 rounded mb-2'>Minta Ulang Token</button>
                                    }
                                    
                                    <button onClick={() => {
                                        setHidden(null)
                                    }} className='w-full bg-white border-2 border-indigo-950 p-1 rounded'>Ubah no WA</button>
                                </div>
                            </div>
                    }
                </div>
                <style jsx global>
                    {`input{
                        min-width: 35px;
                    }`}
                </style>
            </div>);
        }
    }else{
        return <>
            <div className='my-[50px] flex justify-center items-center text-center'>
                <div>
                    <p className='text-2xl mb-2'>No Whatsapp anda sudah terverifikasi</p>
                    <p className='text-xl'>Silahkan kembali ke home</p>
                </div>
            </div>
        </>
    }

}
