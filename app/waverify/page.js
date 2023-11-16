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

    useEffect(() => {
        const redirectHome = function () {
            
        };
    }, [session, route, setShowForm]);
    return (<div className='flex justify-center items-center mt-[100px] mb-[50px] bg-white'>
        <div className='w-[340px] shadow-md p-10 border-2 border-indigo-950'>
            {
                !hidden?
                    <div>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={value}
                            onChange={setValue} />
                        <button onClick={()=>{
                            alert.show('Oh look, an alert!')
                            setHidden(true)
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
                            <button className='w-full bg-blue-900 text-white p-1 rounded mb-2'>clear</button>
                            <button onClick={()=>{
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
