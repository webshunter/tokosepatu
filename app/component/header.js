"use client"
import Link from "next/link"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { postData } from "../library/post";
import { encode } from "next-auth/jwt";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "../library/outclick";
import { usePathname } from 'next/navigation'

const ButtonLogin = ({props}) => {
    const route = useRouter();
    const ref = useOutsideClick(() => {
        setVisible(null)
    });
    const { data: session } = useSession();
    const [visible, setVisible] = useState();

    if(session && session.user){
        return (<>
            <div className="relative">
                <button onClick={()=>{
                    visible? setVisible(null) : setVisible(1);
                }} className="h-[50px] overflow-hidden rounded-[50px]">
                    {session?
                        <img src={session.user.image} alt="" width={50} height={50} /> 
                            :
                        <></>
                    }
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
    const [hiddenSearch, setHiddenSearch] = useState(null);
    const pathName = usePathname()
    const daftar = () =>{
        signIn();
    }
    
    useEffect(function(){
        pathName === '/'?setHiddenSearch(1): setHiddenSearch(null);
        // cari tinggi navbar       
    }, [pathName])

    const [callUser, setCallUser] = useState(null);

    const searchButton = function(){
        goSeach(document.getElementById("search").value);
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
        <nav style={{borderBottom:'2px solid #F9CC0B'}} className="shadow-lg fixed top-0 z-[999] md:h-[85px] w-[100vw] bg-indigo-950 text-white px-4 md:px-10 py-2">
            <div className="flex flex-wrap items-center justify-between mx-auto">
                <Link className="flex md:justify-center md:items-center md:block" href="/">
                    <img src="/logo.png" alt="Rumahjo - Rumah Jasa Online" className="h-[45px] md:h-[53px] pt-1 md:pt-3"></img>
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
            <div className="w-full md:w-[calc(100vw-320px)] flex items-center justify-end md:absolute right-[30px] h-[auto] top-[10px]">
                <div className={hiddenSearch?`hidden`:`flex justify-end overflow-hidden rounded-md`}>
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
                <Link href="/" data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    <span className="sr-only">Home</span>
                </Link>
                <button data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                            <path d="M575 2351 c-60 -10 -125 -50 -163 -101 l-35 -45 829 -5 829 -5 56 -26 c76 -36 129 -86 170 -161 l34 -63 3 -578 3 -577 28 14 c47 25 99 91 116 149 14 48 15 130 13 633 l-3 579 -30 54 c-32 57 -67 90 -131 118 -36 17 -96 18 -859 19 -451 1 -838 -1 -860 -5z"/>
                            <path d="M290 2091 c-50 -16 -89 -41 -124 -83 -66 -76 -66 -78 -66 -703 0 -646 -1 -635 80 -715 63 -64 117 -80 267 -80 l113 0 0 -33 c0 -18 -7 -58 -16 -88 -13 -43 -27 -65 -75 -110 -64 -61 -73 -89 -36 -114 29 -19 152 -6 246 26 125 43 246 150 302 269 l23 49 506 3 c496 3 506 3 545 25 53 28 99 78 124 133 20 44 21 63 21 631 0 418 -3 596 -12 620 -19 58 -67 115 -121 145 l-52 29 -850 2 c-467 1 -861 -2 -875 -6z"/>
                        </g>
                    </svg>
                    <span className="sr-only">Obrolan</span>
                </button>
                <div className="flex items-center justify-center">
                    <AddMenu props={props} />
                </div>
                <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="sr-only">Favorit</span>
                </button>
                <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <span className="sr-only">Profile</span>
                </button>
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