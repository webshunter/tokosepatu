"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { postData } from "../library/post";
import { encode } from "next-auth/jwt";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "../library/outclick";

const ButtonLogin = ({props}) => {
    const route = useRouter();
    const ref = useOutsideClick(() => {
        setVisible(null)
    });
    const { data: session } = useSession();
    const [visible, setVisible] = useState()

    if(session && session.user){
        return (<>
            <div className="relative">
                <button onClick={()=>{
                    visible? setVisible(null) : setVisible(1);
                }} className="h-[50px] overflow-hidden rounded-[50px]">
                    <img className="h-[50px] w-[50px]" src={session.user.image}></img>
                </button>
                <div ref={ref} style={{visibility:visible?'visible':'hidden'}} className="absolute top-[60px] right-[0] rounded text-gray-950 px-4 py-2 shadow-xl bg-white w-[320px]">
                    <h1>{session.user.name}</h1>
                    <button onClick={()=>{
                        route.push('/profile');
                        setVisible(null)
                    }} className="block rounded bg-indigo-950 w-full text-white p-2 my-4">Lihat dan Edit Profil</button>
                </div>
            </div>
            <Button className="bg-transparent border-[1px] mx-2 border-white" onClick={() => signOut() }>Log Out</Button>
            <Link href="/post/add" className="h-[45px] w-[45px] rounded-md text-[1.8rem] overflow-hidden flex justify-center items-center p-0 border-[2px] border-yellow-400">
                <span className="block">+</span>
            </Link>
        </>)
    }

    return (<>
        <Button className="bg-transparent border-[1px] mx-2 border-white" onClick={() => props.setOpenModal('default')  }>Login/ Daftar</Button>
    </>)
}

const AddMenu = ({props}) => {
    const { data: session } = useSession();
    if (session && session.user) {
        return (<>
            <Link href="/post/add" data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-indigo-950 rounded-full hover:bg-indigo-750 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">New item</span>
            </Link>
        </>)
    } else {
        return (<>
            <button onClick={() => signIn()  } data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-indigo-950 rounded-full hover:bg-indigo-750 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className="w-4 h-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">New item</span>
            </button>
        </>)
    }
}

export const Header = function(){
    const route = useRouter();
    const {data: session} = useSession();
    const [openModal, setOpenModal] = useState ();
    const props = { openModal, setOpenModal };
    const daftar = () =>{
        signIn();
    }
    const [callUser, setCallUser] = useState(null);

    const searchButton = function(){
        goSeach(document.getElementById("search").value)
    }

    const goSeach = function(value){
        value = encodeURI( value.toLowerCase().replace(/\ /g, '-') )
        route.push('/search/q-'+value)
    }

    const keyDownAction = function(event){
        if (event.code == 'NumpadEnter' || event.code == 'Enter'){
            goSeach(event.target.value);
        }
    }

    const ori = function(){
        let ori = location.host;
        if(ori == 'localhost:3000'){
            return 'https://app.rumahjo.com';
        }
        if (ori == 'rumahjo.vercel.app'){
            return 'https://app.rumahjo.com';
        }
        if (ori == 'rumahjo.com'){
            return 'https://app.rumahjo.com';
        }
        return '';
    }

    if(session){
        if(!callUser){
            setCallUser(1);
            postData(ori() +'/data/simpan/user', {
                uniqid: 'ID-USER-'+Date.now(),
                data: session
            }).then(function(res){
            })
        }
    }

    return (<>
        <nav style={{borderBottom:'2px solid white'}} className="shadow-lg fixed top-0 z-[999] md:h-[85px] w-[100vw] bg-indigo-950 text-white px-4 md:px-10 py-2">
            <div className="flex flex-wrap items-center justify-between mx-auto">
                <Link className="flex md:justify-center md:items-center md:block" href="/">
                    <img src="/rumahjocom.png" className="w-[200px] pt-1 md:pt-3"></img>
                </Link>
                <div className="md:hidden " id="menuLocation" style={{flexGrow:"1", maxWidth:"calc(100% - 100px)"}}>
                    <div className="flex" style={{justifyContent:"flex-end"}}>
                        <div style={{margin: "0 8px 0 0", display: "inline-block", maxWidth: "calc(100% - 28px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>Malang</div>
                        <svg width="19px" height="19px" fill="#fff" viewBox="0 0 1024 1024" data-aut-id="icon" className="text-white" fillRule="evenodd">
                            <path className="rui-w4DG7" d="M512 85.333c211.755 0 384 172.267 384 384 0 200.576-214.805 392.341-312.661 469.333v0h-142.656c-97.856-76.992-312.683-268.757-312.683-469.333 0-211.733 172.267-384 384-384zM512 170.667c-164.672 0-298.667 133.973-298.667 298.667 0 160.021 196.885 340.523 298.453 416.597 74.816-56.725 298.88-241.323 298.88-416.597 0-164.693-133.973-298.667-298.667-298.667zM512.006 298.66c94.101 0 170.667 76.565 170.667 170.667s-76.565 170.667-170.667 170.667c-94.101 0-170.667-76.565-170.667-170.667s76.565-170.667 170.667-170.667zM512.006 383.994c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.272 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[calc(100vw-320px)] flex items-center justify-end md:absolute right-[30px] h-[60px] top-[10px]">
                <div className="flex justify-end overflow-hidden rounded-md">
                    <input id="search" placeholder="Search..." onKeyDown={keyDownAction} className="p-0 m-0 inline-block w-[100vw] h-[45px] px-2 text-[1.3rem] text-gray-700" />
                    <button onClick={searchButton} className="px-4 py-2 h-[45px] bg-yellow-400">GO</button>
                </div>
                <div className="hidden md:flex min-w-[320px] w-[320px] justify-center items-center">
                    <ButtonLogin props={props} />
                </div>
            </div>
        </nav>
        <div className="fixed md:hidden z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    <span className="sr-only">Home</span>
                </button>
                <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Home
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
                        <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
                    </svg>
                    <span className="sr-only">Wallet</span>
                </button>
                <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Wallet
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <div className="flex items-center justify-center">
                    <AddMenu props={props} />
                </div>
                <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Create new item
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                    </svg>
                    <span className="sr-only">Settings</span>
                </button>
                <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Settings
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <span className="sr-only">Profile</span>
                </button>
                <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Profile
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
        {/* <nav className="px-10 py-2 bg-white shadow-md text-gray-600">
            <button className="pr-5">SEMUA KATEGORI</button>
            <Link className="pr-5 text-[14px]" href="/">Property</Link>
            <Link className="pr-5 text-[14px]" href="/">Rumah KPR</Link>
            <Link className="pr-5 text-[14px]" href="/">KPR</Link>
        </nav> */}
        
        <Modal show={props.openModal === 'default'} size="md" onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <button onClick={daftar} className="border-[1px] text-[1.1rem] cursor-pointer text-gray-700 rounded-md border-gray-400 p-2 w-full">
                        Login/Daftar dengan Google
                    </button>
                    {/* <button onClick={daftar} className="border-[2px] text-[1.1rem] cursor-pointer rounded-md border-black p-2 w-full">
                        Login/Daftar dengan email
                    </button> */}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <p className="mx-2 text-[12px] text-gray-700 text-center">Kami tidak akan membagikan detail pribadi anda dengan siapapun</p>
                    <p className="mx-2 text-[12px] text-gray-700 text-center">Jika anda login, anda menerima Syarat dan Ketentuan serta Kebijakan Privasi RumahJo</p>
                </div>
            </Modal.Footer>
        </Modal>

    </>)
}