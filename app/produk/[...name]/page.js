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
        <div className="relative my-5 mx-[50px]">
            <div className="max-w-[calc(100%-450px)] bg-yellow-100">
                <div className="bg-white shadow-md p-5 rounded-xm">
                <Carousel className="h-[320px] bg-gray-700">
                        {arrImage.map((s, i)=>{
                            return (
                                <li key={i}>
                                    <div className="flex justify-center">
                                        <img
                                            alt="..."
                                            src={'https://app.rumahjo.com/'+s.image}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
            <div className="h-[360px] absolute grid gap-5 top-0 right-0 ">
                <div className=" rounded-sm shadow-xl bg-white w-[400px] px-5 py-3 ">
                    <div className="mb-2">
                        <button className="bg-yellow-400 p-2 rounded-md text-white">
                            HIGHTLIGHT
                        </button>
                        <button className="mx-2 bg-blue-400 p-2 rounded-md text-white">
                            Penjual terverifikasi
                        </button>
                    </div>
                    <h1 className="text-[1.3rem] font-bold">{data.judul != undefined ? data.judul.capitalize() : data.judul}</h1>
                    <p className="py-2 text-[14px]">Luas dan nyaman untuk keluarga.</p>
                    <div className="grid grid-cols-2 text-gray-700 text-[12px] text-center mt-2">
                        <div className="border-x-[1px] border-gray-400 px-2">{data.ktidur} kamar</div>
                        <div className="px-2">{data.kmandi} kamar mandi</div>
                    </div>
                </div>
                <div className="rounded-sm shadow-xl bg-white w-[400px] px-5 py-3 ">
                    <h1 className="text-[2rem] font-bold">{formatRupiah(data.price)}</h1>
                    <button className="w-full bg-gray-700 text-white px-8 py-3 rounded-md text-[1.3rem] mt-[20px]">Buat Penawaran</button>
                </div>
            </div>
        </div>
        <div className="grid-content mx-[50px] gap-[50px]">
            <div className="content-area">
                <div className="relative mb-10">
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
                            <button className="block w-full relative">
                                <h1 className="float-right w-[calc(100%-60px)] text-gray-700 text-left text-[1.3rem] font-bold mt-2">Syariah Property</h1>
                                <div className="rounded-[50%] border-gray-700 border-[2px] bg-gray-700 w-[50px] h-[50px] overflow-hidden flex items-center justify-center">
                                    <img className="h-full" src="https://forged4x4.com/wp-content/uploads/2021/07/hateMugs_6.jpg"></img>
                                </div>
                            </button>
                            <button className="w-full border-gray-700 border-[2px] bg-white-700 text-gray-700 px-8 py-2 rounded-md font-bold text-[1.1rem] mt-[20px]">Chat dengan penjualan</button>
                            <div className="text-center mt-2">
                                *** *** ***<button className="mx-2">Tampilkan Nomor</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mb-5">
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