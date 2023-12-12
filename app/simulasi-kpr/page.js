"use client"
import React, { useState } from "react";
import { Helper } from "../library/prototype";
Helper();
const formatter = new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
});

const toNumber = function (formattedString){
    return Number(
        formattedString.replace(/[^0-9.-]+/g, '')
    );
}

const num = function(a){
    let n = formatter.format(a);
    return n.replace(/\Rp /g, '')
}

export default function SimulasiKPR(){

    const [harga , setHarga] = useState(500000000);
    const [uangmuka , setUangMuka] = useState(10);
    const [jangkawaktu , setJangkaWaktu] = useState(10);
    const [sukubunga , setSukuBunga] = useState(10);


    return (<>
        <div className="p-10">
            <div className="my-5">
                <h1 className="text-center text-2xl">Simulasi KPR - Kalkulator Kredit Rumah</h1>
                <p className="text-center">Gunakan kalkulator KPR untuk mendapatkan kemudahan pinjaman kredit rumah, perbandingan suku bunga cicilan bank di Indonesia</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white">
                    <div className="p-5">
                        <label className="block my-2">Harga Properti</label>
                        <div style={{overflow:'hidden', borderRadius:'8px', display:'grid', gridTemplateColumns:'50px auto', border:'1px solid #ddd'}}>
                            <div className="h-full flex justify-center items-center bg-gray-200">Rp</div>
                            <div className="h-full px-5">
                                <input type="text" value={harga.currency()} onChange={(e)=>{
                                    setHarga(e.target.value.number())
                                }} className="h-[28px] w-full" style={{border:'none',outline:'none'}} />
                            </div>
                        </div>
                        <label className="block my-2">Uang Muka</label>
                        <div className="mb-3" style={{overflow:'hidden', borderRadius:'8px', display:'grid', gridTemplateColumns:'auto 50px', border:'1px solid #ddd'}}>
                            <div className="h-full px-5">
                                <input value={uangmuka} onChange={(e) => {
                                    setUangMuka(e.target.value)
                                }} type="number" className="h-[28px] w-full" style={{border:'none',outline:'none'}} />
                            </div>
                            <div className="h-full flex justify-center items-center bg-gray-200">%</div>
                        </div>
                        <div style={{overflow:'hidden', borderRadius:'8px', display:'grid', gridTemplateColumns:'50px auto', border:'1px solid #ddd'}}>
                            <div className="h-full flex justify-center items-center bg-gray-200">Rp</div>
                            <div className="h-full px-5 bg-gray-100">
                                <input value={(harga * uangmuka / 100).currency()} disabled={true} type="text" className="bg-gray-100 h-[28px] w-full" style={{border:'none',outline:'none'}} />
                            </div>
                        </div>
                        <label className="block my-2">Jangka Waktu</label>
                        <div style={{overflow:'hidden', borderRadius:'8px', display:'grid', gridTemplateColumns:'auto 80px', border:'1px solid #ddd'}}>
                            <div className="h-full px-5">
                                <input value={jangkawaktu} onChange={(e) => {
                                    setJangkaWaktu(e.target.value)
                                }} type="number" className="h-[28px] w-full" style={{border:'none',outline:'none'}} />
                            </div>
                            <div className="h-full flex justify-center items-center bg-gray-200">Tahun</div>
                        </div>
                        <label className="block my-2">Suku Bunga Fix</label>
                        <div style={{overflow:'hidden', borderRadius:'8px', display:'grid', gridTemplateColumns:'auto 50px', border:'1px solid #ddd'}}>
                            <div className="h-full px-5">
                                <input value={sukubunga} onChange={(e) => {
                                    setSukuBunga(e.target.value)
                                }} type="number" className="h-[28px] w-full" style={{border:'none',outline:'none'}} />
                            </div>
                            <div className="h-full flex justify-center items-center bg-gray-200">%</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-200 p-3 text-center rounded">
                            <h1>Angsuran / Bulan</h1>
                            <p>{(function(){
                                    let pinjaman_pokok = harga - (uangmuka * harga / 100);
                                    let jangkawaktu_bulan = jangkawaktu * 12;
                                    let sukubunga_bulan = (sukubunga / 100) / 12;
                                    let a = pinjaman_pokok * sukubunga_bulan;
                                    let b = Math.pow((1 + sukubunga_bulan), jangkawaktu_bulan);
                                    let angsuranPerBulan = a * (b / (b - 1));
                                    return formatter.format( Math.round(angsuranPerBulan,0));
                                })()}</p>
                        </div>
                        <div className="bg-gray-200 p-3 text-center rounded">
                            <h1>Pinjaman Pokok</h1>
                            <p>{(function () {
                                let pinjaman_pokok = harga - (uangmuka * harga / 100);
                                let jangkawaktu_bulan = jangkawaktu * 12;
                                let sukubunga_bulan = (sukubunga / 100) / 12;
                                let a = pinjaman_pokok * sukubunga_bulan;
                                let b = Math.pow((1 + sukubunga_bulan), jangkawaktu_bulan);
                                let angsuranPerBulan = a * (b / (b - 1));
                                return formatter.format(Math.round(pinjaman_pokok, 0));
                            })()}</p>
                        </div>
                        <div className="bg-gray-200 p-3 text-center rounded">
                            <h1>Pembayaran Pertama</h1>
                            <p>{(function () {
                                let uang_muka = (uangmuka * harga / 100);
                                let pinjaman_pokok = harga - (uangmuka * harga / 100);
                                let jangkawaktu_bulan = jangkawaktu * 12;
                                let sukubunga_bulan = (sukubunga / 100) / 12;
                                let a = pinjaman_pokok * sukubunga_bulan;
                                let b = Math.pow((1 + sukubunga_bulan), jangkawaktu_bulan);
                                var angsuranPerBulan = a * (b / (b - 1));
                                var pembayaranPertama = uang_muka + angsuranPerBulan + ((6 / 100) * pinjaman_pokok); 
                                return formatter.format(Math.round(pembayaranPertama, 0));
                            })()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}