"use client"
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import useSWR, { SWRConfig } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { JoinDate } from '../library/joinDate';
import indoFormatter from '../library/indoFormatter';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function CariAgen() {
    const { data: session } = useSession();
    const searchParams = useSearchParams(); 
    const router = useRouter();
    const pathname = usePathname();
    const search = searchParams.get('search');
    const find = search===null ? '' : search;
    const [name, setName] = useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    };
    const { data: dagen } = useSWR(`/api/agen?find=${find}`, fetcher);
    console.log(dagen);
    return(<>
        <div className="my-5">
            <div className="box-border">
                <div className="bg-[url('/background-mobile.webp')] md:bg-[url('/background-desktop.webp')] bg-cover bg-bottom h-[calc(41.6667vw)] max-h-[calc(41.6667vw)] min-h-[350px] mb-[20px] flex justify-start flex-col items-center py-[0px] px-[6%]">
                    <div className="flex items-start whitespace-nowrap w-full" style={{marginTop:"calc(20px + 4vw)",marginBottom:"calc(8px + 0.8vw)"}}>
                        <h1 className="text-[220%] font-normal text-white leading-tight" style={{textShadow:"rgba(0, 0, 0, 0.6) 0px 2px 4px"}}>Cari Agen Properti</h1>
                    </div>
                    <div className="w-full rounded" style={{backgroundColor:"rgba(0, 0, 0, 0.6)",padding:"calc(8px + 0.4vw) calc(16px + 0.8vw)"}}>
                        <div className="flex items-center" style={{marginBottom:"calc(5px + .5vw)",marginTop:"calc(5px + 0.5vw)"}}>
                            <div className="flex items-center bg-white rounded max-h-[40.8px] md:max-h-[55.5px] max-w-[100%] md:max-w-[90%]" style={{flex:"1 1 0%"}}>
                                <div className="hidden md:block h-full flex items-center pl-2 md:pl-4" style={{ width:"calc(35px + 1vw)", color:"rgba(0, 0, 0, 0.25)",fontSize:"120%" }}>
                                    <FontAwesomeIcon className=""
                                        icon={faSearch}/>
                                </div>
                                <div className="flex flex-wrap" style={{flex:"1 1 0%",fontSize:"115%",lineHeight:"1", outline:"none",width:"83%"}}>
                                    <input onChange={handleChange} value={name} type="text" className="h-[33px] md:h-auto outline-none border-0 placeholder-shown:text-ellipsis focus:ring-0 focus:ring-offset-0 focus:outline-[0] border-0" placeholder="Cari lokasi, nama agen, kata kunci lainnya"></input>
                                </div>
                            </div>
                            <div className="w-auto" style={{marginLeft:"calc(5px + 0.5vw)"}}>
                                <button onClick={() => {
                                    router.push(pathname + '?search=' + name);
                                }} className="block md:hidden w-full text-white text-[90%] md:text-[105%] rounded bg-yellow-400" style={{padding:"calc(7px + 0.5vw) calc(12px + 1.2vw)"}}>
                                    <FontAwesomeIcon className=""
                                        icon={faSearch}/>
                                </button>
                                <button onClick={() => {
                                    router.push(pathname + '?search=' + name);
                                }} className="hidden md:block w-full text-white text-[90%] md:text-[105%] rounded bg-yellow-400" style={{padding:"calc(7px + 0.5vw) calc(12px + 1.2vw)",minWidth:"calc(100px + 7vw)"}}>Cari</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-10 lg:px-[8%]">
                <div style={{padding:"calc(12px + 1.2vw) 0px"}}>
                    <div style={{marginBottom:"calc(6px + 0.6vw)"}}>
                        <div className="text-[24px] font-semibold leading-8 mb-4">Fitur Agen</div>
                        <div className="text-[16px] font-medium leading-6">Cari tahu info lengkap agen properti</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6">
                    {dagen ? 
                        dagen.message.map((x, i) => {
                        x.key = i;
                        return (
                            <div key={i} className="grid lg:col-span-1 md:col-span-2 col-span-3">
                                <div className="w-full rounded-lg bg-white shadow-lg shadow-black/15" style={{padding:"calc(4px + 0.4vw)"}}>
                                    <div className="flex flex-col items-center" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.2)",paddingBottom:"calc(5px + 0.5vw)"}}>
                                        <div className="flex items-center w-full">
                                            <div style={
                                                {
                                                    backgroundImage: "url('" + (x.avatar ? x.avatar :`https://ui-avatars.com/api/?size=200&background=25D366&name=`+(x.fullname?x.fullname:'').split(' ').join('+') )+"')",
                                                    minWidth:"calc(50px + 1.5vw)",
                                                    width:"calc(50px + 1.5vw)",
                                                    height:"calc(50px + 1.5vw)",
                                                    borderRadius:"6px",
                                                    backgroundSize:"contain",
                                                    backgroundPosition:"center center",
                                                    backgroundRepeat:"no-repeat",
                                                    marginRight:"calc(5px + 0.5vw)"
                                                }
                                            }></div>
                                            <div className="overflow-hidden leading-tight" style={{flex:"1 1 0%",width:"0"}}>
                                                <div className="text-[110%] font-semibold truncate ..." style={{marginBottom:"calc(2px + 0.2vw)"}}>{x.fullname}</div>
                                                <div className="text-[80%] font-medium truncate ..." style={{marginBottom:"calc(2px + 0.1vw)"}}>Anggota Sejak {JoinDate(x.tgldaftar)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid rounded-lg" style={{backgroundColor:"rgb(238, 238, 238)",gap:"calc(2px + 0.2vw)",padding:"calc(6px + 0.6vw) calc(2px + 0.2vw) calc(5px + 0.5vw)",marginTop:"calc(5px + 0.5vw)",gridTemplateColumns:"auto auto auto"}}>
                                        <div className="text-center leading-tight" style={{flex:"1 1 0%"}}>
                                            <div className="text-[100%] font-bold">{x.totlisting}</div>
                                            <div className="text-[72%] font-medium" style={{marginTop:"calc(2px + 0.2vw)"}}>Total Properti</div>
                                        </div>
                                        <div className="text-center leading-tight" style={{flex:"1 1 0%"}}>
                                            <div className="text-[100%] font-bold">{x.laku}</div>
                                            <div className="text-[72%] font-medium" style={{marginTop:"calc(2px + 0.2vw)"}}>Terjual/Tersewa</div>
                                        </div>
                                        <div className="text-center leading-tight" style={{flex:"1 1 0%"}}>
                                            <div className="text-[100%] font-bold">Rp. {indoFormatter(x.totprice/x.totlisting)}</div>
                                            <div className="text-[72%] font-medium" style={{marginTop:"calc(2px + 0.2vw)"}}>Harga Tengah</div>
                                        </div>
                                    </div>
                                    {/* <div className="text-[85%] mb-4 font-bold" style={{marginTop:"calc(5px + 0.5vw)"}}>List Iklan</div> */}
                                    <div className="grid gap-[8px] pt-4">
                                        <button onClick={() => {
                                                        router.push('profile/'+x.uniqid);
                                                    }} className="w-full btn-primary text-white p-3 rounded mb-2">Lihat Profil Agen</button>
                                        {x.telp ?
                                        <button onClick={()=>{
                                                        if(session){
                                                            window.open('https://api.whatsapp.com/send?phone=' + x.telp, '_blank');
                                                        }else{
                                                            router.push('/login')
                                                        }
                                                    }} className="w-full bg-[#50bf31] text-white p-3 rounded mb-2"><i className="fa-brands fa-whatsapp"></i> WhatsApp</button>
                                        :
                                        <></>
                                        }
                                        
                                        {/* <a className="h-[64px] min-w-[20px] bg-cover bg-center rounded" style={
                                            {
                                                backgroundImage:"url('https://picture.rumah123.com/r123-images/330x165-fit/customer/11511/2022-09-15-15-23-17-93f79b26-0b1b-4297-881f-eece131ae226.jpg')",
                                                flex:"1 1 0%",
                                                backgroundColor:"rgb(255, 244, 236)"
                                            }
                                        }></a>
                                        <a className="h-[64px] min-w-[20px] bg-cover bg-center rounded" style={
                                            {
                                                backgroundImage:"url('https://picture.rumah123.com/r123/330x165-fit/primary_property/project/2787/1636354329_16363543296188c919d712aads_images_1636354329.jpg')",
                                                flex:"1 1 0%",
                                                backgroundColor:"rgb(255, 244, 236)"
                                            }
                                        }></a>
                                        <a className="h-[64px] min-w-[20px] bg-cover bg-center rounded" style={
                                            {
                                                backgroundImage:"url('https://picture.rumah123.com/r123-images/330x165-fit/customer/715649/2023-02-03-04-58-25-ca8d9772-ac3b-4d42-82ae-351b0ebd0c45.jpg')",
                                                flex:"1 1 0%",
                                                backgroundColor:"rgb(255, 244, 236)"
                                            }
                                        }></a> */}
                                    </div>
                                </div>
                            </div>
                        )
                        })
                    :
                    <></>
                    }
                </div>
            </div>
        </div>
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