"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import buttonJual from "./buttonJual"
import btn from '../component/button2.svg';
import Image from "next/image"
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { postData } from "../library/post";

const ButtonLogin = ({props}) => {
    const { data: session } = useSession();

    if(session && session.user){
        return (<>
            <h1 className="mx-4">{session.user.name}</h1>
            <Button className="bg-transparent border-[1px] mx-2 border-white" onClick={() => signOut() }>Log Out</Button>
        </>)
    }

    return (<>
        <Button className="bg-transparent border-[1px] mx-2 border-white" onClick={() => signIn()  }>Login/ Daftar</Button>
    </>)
}

export const Header = function(){

    const {data: session} = useSession();

    const [openModal, setOpenModal] = useState ();
    const props = { openModal, setOpenModal };

    const daftar = () =>{
        signIn();
    }

    useEffect(()=>{


        const ori = function(){
            let ori = location.host;
            if(ori == 'localhost:3000'){
                return 'http://localhost:5000';
            }
            if (ori == 'rumahjo.vercel.app'){
                return 'https://rumahjo.vercel.app';
            }
            if (ori == 'rumahjo.com'){
                return 'https://rumahjo.com';
            }
            return '';
        }

        postData(ori() +'/data/simpan/user', {
            uniqid: 'ID-USER-'+Date.now(),
            data: session
        }).then(function(res){
            console.log(res)
        })
    })

    return (<>
        <nav className="fixed top-0 z-[999] h-[85px] w-[100vw] bg-indigo-950 text-white px-10 py-2">
            <Link href="/">
                <img src="/rumahjocom.png" className="w-[200px] pt-3"></img>
            </Link>
            <div className="w-[calc(100vw-320px)] flex items-center justify-end absolute right-[30px] h-[60px] top-[10px]">
                <div className="flex justify-end overflow-hidden rounded-md">
                    <input placeholder="Seach..." className="h-[45px] px-2 text-[1.3rem] text-gray-700" />
                    <button className="p-2 h-[45px] bg-yellow-400">GO</button>
                </div>
                <ButtonLogin props={props} />
            </div>
        </nav>
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
                    <button onClick={daftar} className="border-[2px] text-[1.1rem] cursor-pointer rounded-md border-black p-2 w-full">
                        Login/Daftar dengan telepone
                    </button>
                    <button onClick={daftar} className="border-[1px] text-[1.1rem] cursor-pointer text-gray-700 rounded-md border-gray-400 p-2 w-full">
                        Login/Daftar dengan Google
                    </button>
                    <button onClick={daftar} className="border-[2px] text-[1.1rem] cursor-pointer rounded-md border-black p-2 w-full">
                        Login/Daftar dengan email
                    </button>
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