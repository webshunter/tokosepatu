"use client"
import { Header } from "@/app/component/header";
import { Carousel } from "flowbite-react";

export default function Page({params}) {

    let [slug] = params.name; 

    return (<>
        <Header />
        <div className="relative my-5 mx-[50px]">
            <div className="max-w-[calc(100%-450px)] bg-yellow-100">
                <div className="bg-white shadow-md p-5 rounded-xm">
                <Carousel className="h-[320px] bg-gray-700">
                    <img
                        alt="..."
                        src="https://img.iproperty.com.my/angel-legacy/1110x624-crop/static/2020/12/1.-Desain-Rumah-Minimalis-dengan-Atap-Pelana.jpg"
                    />
                    <img
                        alt="..."
                        src="https://img.iproperty.com.my/angel-legacy/1110x624-crop/static/2020/12/1.-Desain-Rumah-Minimalis-dengan-Atap-Pelana.jpg"
                    />
                    <img
                        alt="..."
                        src="https://img.iproperty.com.my/angel-legacy/1110x624-crop/static/2020/12/1.-Desain-Rumah-Minimalis-dengan-Atap-Pelana.jpg"
                    />
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
                    <h1 className="text-[1.3rem] font-bold">Rumah Tidar</h1>
                    <p className="py-2 text-[14px]">Luas dan nyaman untuk keluarga.</p>
                    <div className="grid grid-cols-3 text-gray-700 text-[12px] text-center mt-2">
                        <div className="border-x-[1px] border-gray-400 px-2">3 kamar</div>
                        <div className="px-2">2 kamar mandi</div>
                        <div className="border-x-[1px] border-gray-400 px-2">2 kamar tamu</div>
                    </div>
                </div>
                <div className="rounded-sm shadow-xl bg-white w-[400px] px-5 py-3 ">
                    <h1 className="text-[2rem] font-bold">Rp 200.000.000</h1>
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
                            <p>Dijual Rumah Second, Single House. Lokasi Strategis. Dekat Pondok Indah.</p>
                            <p>LB.: 275m2</p>
                            <p>KT : 3 + 1</p>
                            <p>
                                KM : 3 + 1
                            </p>
                            <p>
                                Garasi : 1 mobil
                            </p>
                            <p>
                                Carport : 1 mobil
                            </p>
                            <p>
                                SHM
                            </p>
                            <p>
                                Harga : 5.1M nego
                            </p>
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