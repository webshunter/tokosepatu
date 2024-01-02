"use client"
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { getFips } from 'crypto';
import { Button, Modal } from 'flowbite-react';
import ValidasiLogin from '@/app/component/loginvalidasi';


function convertToWebP(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;

                // Mengatur ukuran gambar
                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }

                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Konversi ke format WebP
                canvas.toBlob(function (blob) {
                    if (!blob) {
                        reject(new Error('Konversi ke format WebP gagal'));
                    } else {
                        resolve(blob);
                    }
                }, 'image/webp', 0.8); // Kualitas gambar, dalam hal ini, 0.8
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            const base64String = reader.result.split(',')[1]; // Mengambil bagian base64 saja
            resolve(base64String);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
}

export default function EditProfile() {
    const [popupVisible, setPopUpVisible] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [fullname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [telp, setTelp] = useState("");
    const [password, setPassword] = useState("");
    const [dataResponse, setDataresponse] = useState(null);
    const [uniqId, setUniqId] = useState(null);
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
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
            , uniqid: uniqId
            , avatar: avatar
        }
        fetch('/api/update/profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res)=>{
            return res.json();
        })
        .then((res)=>{
            props.setOpenModal('dismissible')
            console.log(res)
        })
    }
    const { data: session } = useSession();
    if (!dataResponse){
        if(session){
            let email = session.user.email;
            //console.log(session);
            setAvatar(session.user.image);
            setDataresponse(1);
            fetch('/api/user?email='+email)
                .then((res)=>{
                    return res.json()
                })
                .then((res)=>{
                    let [data] = res.message;
                    setUniqId(data.uniqid)
                    setName(data.fullname)
                    setEmail(data.email)
                    setAbout(data.about)
                    setPassword(data.password)
                    setTelp(data.telp)
                    if (data.avatar!=='' && data.avatar!==null) {
                        setAvatar(data.avatar)
                    }
                })
        }
    }

    const uploadChange = async function(e){
        let el = e.target.files[0];
        let webp = await convertToWebP(el, 720, 720);
        let base64 = await blobToBase64(webp);
        const formData = new FormData();
        formData.append("content", base64);
        formData.append("uniq", uniqId);
        fetch("/api/profile", { method: 'POST', body: formData })
        .then(function(r){
            return r.json()
        }).then(function(r){
            window.location.reload();
        })
        .catch(function(o){
            console.log(o)
        })
    }

    return (<>
        <ValidasiLogin>
        <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header>Success</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Data telah diupdate
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
        <div className="grid grid-cols-6 gap-4">
            <div className="col-start-auto lg:col-start-2 col-span-6 lg:col-span-4 mt-14 md:mt-5">
                <div className="bg-white shadow-md md:mb-2 px-5 md:p-5 rounded-xm">
                    <div className="hidden md:block pb-[16px]">
                        <h3 className="text-[20px] font-bold text-gray-800">Edit Profil</h3>
                    </div>
                    <div className="pt-[16px] border-b border-gray-400">
                        <div className="text-[16px] leading-[24px] font-bold py-[8px] text-gray-800 border-0 md:border-t border-gray-400">Informasi Dasar</div>
                        <div className="pb-[16px]">
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap">
                                <div className="basis-[27.5%] md:basis-[15%]">
                                    <input 
                                        type="hidden"
                                        value={avatar?avatar:''}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        name="avatar"
                                    />
                                    <figure 
                                    style={{
                                        backgroundImage: "url("+`${avatar}`+")"
                                    }}
                                    className="relative overflow-hidden w-[96px] md:w-[120px] h-[96px] md:h-[120px] bg-[50%] bg-cover rounded-full m-0">
                                        <div onClick={openPopUp} className="flex md:hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,47,52,.7)] h-[32px] justify-center items-center cursor-pointer">
                                            <svg className="w-[24px] h-[24px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M670.72 128l42.667 128h182.613l42.667 42.667v554.667l-42.667 42.667h-768l-42.667-42.667v-554.667l42.667-42.667h182.613l42.667-128h317.44zM609.28 213.333h-194.56l-42.667 128h-201.387v469.333h682.667v-469.333h-201.387l-42.667-128zM512 341.333c117.632 0 213.333 95.701 213.333 213.333s-95.701 213.333-213.333 213.333-213.333-95.701-213.333-213.333 95.701-213.333 213.333-213.333zM512 426.667c-70.613 0-128 57.387-128 128s57.387 128 128 128 128-57.387 128-128-57.387-128-128-128z"></path></svg>
                                        </div>
                                    </figure>
                                </div>
                                <div className="hidden md:block basis-[22.5%] pr-2">
                                    <div className="relative">
                                        <div className="flex flex-row flex-wrap items-start relative">
                                            <div className="items-center flex w-full">
                                                <input id="upload-profile" onChange={uploadChange} className='hidden' type='file'></input>
                                                <button onClick={()=>{
                                                        let imageProfile = document.getElementById('upload-profile');
                                                        imageProfile.click();
                                                }} className="border-2 h-[48px] border-yellow-400 w-full inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md">
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
                            <div className="flex items-center md:flex-row md:justify-start box-border flex-wrap">
                                <div className="basis-[0%] md:basis-[60%] flex flex-row items-start flex-wrap my-4">
                                    
                                </div>
                                <div className="basis-[100%] md:basis-[40%] md:h-[10px] flex flex-row items-start flex-wrap">
                                    <div className="md:relative md:bottom-[465px] justify-center m-0 md:ml-[8px]">
                                        <div className="max-w-full text-center text-[15px] leading-[20px] md:mt-[20px]">
                                        <span className="max-w-full text-center font-bold leading-[20px]">Donasi sekarang dan bantu kami mewujudkan impian Anda</span>
                                            <center className="md:pt-14 lg:pt-7">
                                                <img className="w-[75%]" src="/qris.jpeg" />
                                            </center>
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
        </ValidasiLogin>
    </>)
}