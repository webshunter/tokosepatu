"use client"
import { Header } from "@/app/component/header";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/app/library/rupiah";

String.prototype.capitalize = function () {
    // Memeriksa apakah string kosong
    if (this.length === 0) {
        return this;
    }

    // Memecah string menjadi array kata
    const words = this.split(' ');

    // Mengkapitalisasi setiap kata
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Menggabungkan kata-kata yang sudah di-kapitalisasi
    return capitalizedWords.join(' ');
}

export default function Page({params}) {
    const [arrImage,SetArrImage] = useState([]);
    const [data,SetData] = useState({});
    let [slug] = params.name; 
    useEffect(()=>{
        (async function(){
            let data = await fetch('https://app.rumahjo.com/data/produk/' + slug)
            let {data:dataJson, image:dataImage} = await data.json();
            let [dataArray] = dataJson;
            SetArrImage(dataImage)
            console.log(dataArray)
            SetData(dataArray)
        })();
    },[SetArrImage])

    return (<>
        <Header />
        <div className="grid-content mx-[50px] gap-2 md:gap-[50px] mt-5">
            <div className="bg-white shadow-md mb-2 p-5 rounded-xm">
                <Carousel className="h-[320px] bg-gray-700">
                    {arrImage.map((s, i) => {
                        return (
                            <li key={i}>
                                <div className="flex justify-center">
                                    <img
                                        alt="..."
                                        src={'https://app.rumahjo.com/' + s.image}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </Carousel>
            </div>
            <div>
                <div className=" rounded-sm shadow-xl bg-white w-full  md-w-[400px] px-5 py-3 ">
                    <div className="mb-2">
                        <button className="bg-yellow-400 p-2 rounded-md text-white">
                            HIGHTLIGHT
                        </button>
                        <button className="mx-2 bg-blue-400 p-2 rounded-md text-white">
                            Penjual terverifikasi
                        </button>
                    </div>
                    <h1 className="text-[2rem] font-bold">{data.price != undefined ? formatRupiah(data.price) : "Rp 0"}</h1>
                    <h1 className="text-[1rem]">{data.judul != undefined ? data.judul.capitalize() : data.judul}</h1>
                    <div className="grid grid-cols-2 text-gray-700 text-[12px] text-center mt-2">
                        <div className="border-x-[1px] border-gray-400 px-2">{data.ktidur} kamar</div>
                        <div className="px-2">{data.kmandi} kamar mandi</div>
                    </div>
                </div>
                <div className="mt-5 rounded-sm shadow-xl bg-white w-full  md-w-[400px] px-5 py-3 ">
                    <div style={{ display: 'grid', gridTemplateColumns: '80px auto' }}>
                        <div className="h-[80px]">
                            <img src="https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"></img>
                        </div>
                        <div className="flex items-center p-2">
                            <h1 className="text-2xl">Rumah Jo</h1>
                        </div>
                    </div>
                    <div>
                        <button className="p-2 mt-3 mb-2 text-center w-full" style={{ borderRadius: '10px', border: "2px solid #333" }}>Chat Dengan Penjual</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-content mx-[50px] gap-2 md:gap-[50px] mt-5 mb-5">
            <div className="content-area">
                <div className="relative mb-2">
                    <div className=" rounded-sm shadow-xl bg-white w-full py-3 ">
                        <div className="mb-2 px-5">
                            <h1 className="text-gray-400 text-[1.3rem] font-bold">Deskripsi</h1>
                        </div>
                        <hr></hr>
                        <div className="mb-2 px-5 text-[14px] text-gray-700">
                            {data.deskrisi}
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-content">
                <div className="relative mb-2">
                    <div className=" rounded-sm shadow-xl bg-white w-full py-3 ">
                        <div className="mb-2 px-5">
                            <h1 className="w-[calc(100%-60px)] text-gray-700 text-left text-[1.3rem] font-bold mt-2">Lokasi iklan</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}