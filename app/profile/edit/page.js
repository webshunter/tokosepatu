"use client"
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { getFips } from 'crypto';

export default function EditProfile() {
    const [popupVisible, setPopUpVisible] = useState(false);
    const [fullname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [telp, setTelp] = useState("");
    const [password, setPassword] = useState("");
    const [dataResponse, setDataresponse] = useState(null);
    const openPopUp = () => {
        setPopUpVisible(true);
    };
    const closePopUp = () => {
        setPopUpVisible(false);
    };

    const warning = function(text){
        alert(text);
        throw 'stop action';
    }

    const submitAction = function(){
        telp?telp:warning('Telp wajib diisi');
        password?password:warning('Password wajib diisi');
        let data = {
            password: password
            , email: email
            , telp: telp
            , fullname: fullname
            , about: about
        }
        console.log(data);
    }

    const { data: session } = useSession();

    if (!dataResponse){
        setDataresponse(1);
        fetch('/api/user?email=rumahjo123@gmail.com')
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                let [data] = res.message;
                setName(data.fullname)
                setEmail(data.email)
                setAbout(data.about)
                setPassword(data.password)
                setTelp(data.telp)
            })
    }

    return (<>
        <div className="grid grid-cols-6 gap-4">
            <div className="col-start-auto md:col-start-2 col-span-6 md:col-span-4 mt-5">
                <div className="bg-white shadow-md md:mb-2 px-5 md:p-5 rounded-xm">
                    <div className="hidden md:block pb-[16px]">
                        <h3 className="text-[20px] font-bold text-gray-800">Edit Profil</h3>
                    </div>
                    <div className="pt-[16px] border-b border-gray-400">
                        <div className="text-[16px] leading-[24px] font-bold py-[8px] text-gray-800 border-0 md:border-t border-gray-400">Informasi Dasar</div>
                        <div className="pb-[16px]">
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap">
                                <div className="basis-[27.5%] md:basis-[15%]">
                                    <figure className="relative overflow-hidden w-[96px] md:w-[120px] h-[96px] md:h-[120px] bg-[50%] bg-cover rounded-full m-0 bg-[url('https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg')]">
                                        <div onClick={openPopUp} className="flex md:hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,47,52,.7)] h-[32px] justify-center items-center cursor-pointer">
                                            <svg className="w-[24px] h-[24px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M670.72 128l42.667 128h182.613l42.667 42.667v554.667l-42.667 42.667h-768l-42.667-42.667v-554.667l42.667-42.667h182.613l42.667-128h317.44zM609.28 213.333h-194.56l-42.667 128h-201.387v469.333h682.667v-469.333h-201.387l-42.667-128zM512 341.333c117.632 0 213.333 95.701 213.333 213.333s-95.701 213.333-213.333 213.333-213.333-95.701-213.333-213.333 95.701-213.333 213.333-213.333zM512 426.667c-70.613 0-128 57.387-128 128s57.387 128 128 128 128-57.387 128-128-57.387-128-128-128z"></path></svg>
                                        </div>
                                    </figure>
                                </div>
                                <div className="hidden md:block basis-[22.5%] pr-2">
                                    <div className="relative">
                                        <div className="flex flex-row flex-wrap items-start relative">
                                            <div className="items-center flex w-full">
                                                <button className="border-2 h-[48px] border-yellow-400 w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
                                                    <span>Unggah</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block basis-[22.5%] pl-2">
                                    <div className="relative">
                                        <div className="flex flex-row flex-wrap items-start relative">
                                            <div className="items-center flex w-full">
                                                <button className="border-2 h-[48px] border-red-500 bg-red-500 text-white w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
                                                    <span>Hapus</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-[72.5%] md:basis-[60%] pl-[16px] md:pl-0 flex flex-row items-start flex-wrap">
                                    <div className="flex w-full items-center">
                                        <div className="grow">
                                            <input type="text"
                                            value={fullname?fullname:''}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                                name="fullname" placeholder="Nama Lengkap"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap">
                                <div className="basis-[100%] md:basis-[60%] flex flex-row items-start flex-wrap my-4">
                                    <div className="flex w-full items-center">
                                        <div className="grow">
                                            <textarea rows="4" onChange={(e)=>{
                                                setAbout(e.target.value)
                                            }} value={about?about:''} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tentang saya (opsional)"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-[16px] leading-[24px] font-bold py-2 text-gray-800 border-t border-gray-400">Informasi Kontak</div>
                        <div className="pb-[16px]">
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap my-4">
                                <div className="basis-[100%] md:basis-[60%] flex flex-row items-start flex-wrap">
                                    <div className="flex w-full items-center">
                                        <div className="grow">
                                                <input type="text"
                                                value={telp?telp:''}
                                                onChange={(e) => {
                                                    setTelp(e.target.value)
                                                }}
                                                    name="telp" placeholder="+6281234567890"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[40%] flex flex-row items-start flex-wrap">
                                    <div className='text-[12px] leading-[18px] m-0 md:ml-[8px]'>
                                        <span>Apakah ini penting?. Hal tersebut penting untuk memungkinkan kami berkomunikasi dengan Anda dengan aman.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap my-4">
                                <div className="basis-[100%] md:basis-[60%] flex flex-row items-start flex-wrap">
                                    <div className="flex w-full items-center">
                                        <div className="grow">
                                                <input type="text"
                                                name="email" onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }} value={email?email:""} placeholder="Email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[40%] flex flex-row items-start flex-wrap">
                                    <div className='text-[12px] leading-[18px] m-0 md:ml-[8px]'>
                                        <span>Kami tidak akan mengungkapkan email Anda kepada orang lain atau menggunakannya untuk mengirimi Anda spam.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap my-4">
                                <div className="basis-[100%] md:basis-[60%] flex flex-row items-start flex-wrap">
                                    <div className="flex w-full items-center">
                                        <div className="grow">
                                                <input type="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }}
                                                value={password?password:""}
                                                    name="password" placeholder="Password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[40%] flex flex-row items-start flex-wrap">
                                    <div className='text-[12px] leading-[18px] m-0 md:ml-[8px]'>
                                        <span>Ini sangat rahasia bagi Anda dan kami akan menjaganya dengan baik pada sitem yang telah kami bangun.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-[16px]">
                        <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap">
                            <div className="basis-[100%] md:basis-[25%] pt-7">
                                <div className="relative">
                                    <div className="flex flex-row flex-wrap items-start relative">
                                        <div className="items-center flex w-full">
                                            <button onClick={submitAction} type="submit" className="border-2 h-[48px] border-yellow-400 bg-indigo-950 text-white w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
                                                <span>Simpan Perubahan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    { popupVisible && (
        <div onClick={closePopUp}>
            <div className="items-end fixed z-[9999] flex justify-center bg-[rgba(0,0,0,.8)]" style={{top:"0",left:"0",bottom:"0",right:"0",transform:"translateZ(0)"}}>
                <div className="bg-white absolute" style={{padding:"16px 16px 8px",bottom:"0",left:"0",right:"0"}}>
                    <button className="px-[10px] mb-[10px] border-2 border-yellow-400 h-[40px] w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
                        <span>Unggah</span>
                    </button>
                    <button className="px-[10px] mb-[10px] border-2 border-red-500 bg-red-500 text-white h-[40px] w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
                        <span>Hapus</span>
                    </button>
                </div>
            </div>
        </div>
    )}
    </>)
}