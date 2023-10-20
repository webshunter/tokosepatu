"use client"
import { useEffect, useState } from 'react';
import { Header } from "@/app/component/header";
import { ImageUpload } from '@/app/component/ImageUploadMass';
import { postData } from '@/app/library/post';
import upload from '@/app/library/upload';


export default function PostListing() {
    const [lbangun, setLBangun] = useState("");
    const [ltanah, setLTanah] = useState("");
    const [ktidur, setKTidur] = useState("");
    const [kmandi, setKMandi] = useState("");
    const [lantai, setLantai] = useState("");
    const [alamat, setAlamat] = useState("");
    const [judul, setJudul] = useState("");
    const [deskrisi, setDeskrisi] = useState("");
    const [price, setPrice] = useState("");


    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector('input#apartement').click();
            document.getElementById('cert1').click();
        },10)
    })


    const simpanData = async function(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const image = Array.from(e.target.querySelectorAll('img'))
        let dataImage = [];
        if (formProps.judul === ""){
            alert("judul tidak boleh kosong");
        } 
        if (formProps.judul === ""){
            alert("judul tidak boleh kosong");
        } 
        image.map(function(w){
            dataImage.push({
                data: w.src,
                nama: w.alt
            });
        })
        
        let di = [];
        
        formProps.galery = dataImage;

        const ori = function () {
            let ori = location.host;
            if (ori == 'localhost:3000') {
                return 'https://app.rumahjo.com';
            }
            if (ori == 'rumahjo.vercel.app') {
                return 'https://app.rumahjo.com';
            }
            if (ori == 'rumahjo.com') {
                return 'https://app.rumahjo.com';
            }
            return '';
        }

        let b64Data = btoa(JSON.stringify(formProps))

        upload(ori() + '/data/simpan/posting', '', 'qr.data', b64Data, (a) => { }, (b) => {
            console.log(b)
        });
        // here unnecessary - just for testing if it can be read from local storage

    }

    var rows = [], i = 0, len = 10;
    while (++i <= len) rows.push(i);
  
    return (
        <form onSubmit={simpanData} className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500">
            <h1 className="text-2xl font-bold dark:text-gray-50">Pasang Iklan Anda</h1>
            <label htmlFor="type" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Tipe<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type='hidden' name='uniqid' className='none' defaultValue={'produk-'+Date.now()}></input>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input type="radio" 
                    id="apartement" 
                    name="type" 
                    value="0" 
                    className="hidden peer" 
                    required/>
                    <label htmlFor="apartement" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                        <div className="block">
                            <div className="w-full">Apartemen</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input 
                        type="radio" 
                        id="rumah" 
                        name="type" 
                        value="1" 
                        className="hidden peer"
                    />
                    <label 
                        htmlFor="rumah" 
                        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                        <div className="block">
                            <div className="w-full">Rumah</div>
                        </div>
                    </label>
                </li>
            </ul>
            <label htmlFor="lbangun" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Luas Bangunan<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type="number"
                value={lbangun}
                onChange={(e) => {
                    setLBangun(e.target.value);
                }}
                name="lbangun"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <label htmlFor="ltanah" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Luas Tanah<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type="number"
                value={ltanah}
                onChange={(e) => {
                    setLTanah(e.target.value);
                }}
                name="ltanah"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <label htmlFor="ktidur" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Kamar Tidur<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <select
                value={ktidur}
                onChange={(e) => {
                    setKTidur(e.target.value);
                }}
                name="ktidur"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            >
                <option value=""></option>
                {rows.map(function (i, x) {
                    return <option key={x} value={i}>{i}</option>;
                })}
                <option value={11}>&gt;10</option>
            </select>
            <label htmlFor="kmandi" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Kamar Mandi<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <select
                value={kmandi}
                onChange={(e) => {
                    setKMandi(e.target.value);
                }}
                name="kmandi"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            >
                <option value=""></option>
                {rows.map(function (i, x) {
                    return <option key={x} value={i}>{i}</option>;
                })}
                <option value={11}>&gt;10</option>
            </select>
            <label htmlFor="lantai" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Lantai<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type="number"
                value={lantai}
                onChange={(e) => {
                    setLantai(e.target.value);
                }}
                name="lantai"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <label htmlFor="facility" className="text-gray-500 font-light mt-8 dark:text-gray-50">Fasilitas</label>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="vue-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">AC</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="react-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Swimming Pool</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="angular-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Carport</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="laravel-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Garden</label>
                    </div>
                </li>
            </ul>
            <label htmlFor="cert" className="text-gray-500 font-light mt-8 dark:text-gray-50">Sertifikat</label>
            <ul className="grid w-full gap-6 md:grid-cols-3">
                <li>
                    <input type="radio" id="cert1" name="cert" value="1" className="hidden peer" required/>
                    <label htmlFor="cert1" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                        <div className="block">
                            <div className="w-full">SHM - Sertifikat Hak Milik</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="cert2" name="cert" value="2" className="hidden peer"/>
                    <label htmlFor="cert2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full">HGB - Hak Guna Bangun</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="cert3" name="cert" value="3" className="hidden peer"/>
                    <label htmlFor="cert3" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full">Lainnya (PPJB, Girik, Adat, dll)</div>
                        </div>
                    </label>
                </li>
            </ul>
            <label htmlFor="alamat" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Alamat
            </label>
            <input type="text"
                value={alamat}
                onChange={(e) => {
                    setAlamat(e.target.value);
                }}
                name="alamat"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <label htmlFor="judul" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Judul Iklan<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type="text"
                value={judul}
                onChange={(e) => {
                    setJudul(e.target.value);
                }}
                name="judul"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <label htmlFor="deskrisi" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                Deskripsi<span className="text-red-500">*</span>
            </label>
            <textarea
                name="deskrisi"
                value={deskrisi}
                onChange={(e) => {
                    setDeskrisi(e.target.value);
                }}
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            ></textarea>
            <h1 className="text-xl font-bold dark:text-gray-50 pt-8">Tentukan Harga</h1>
            <label htmlFor="price" className="text-gray-500 font-light mt-4 dark:text-gray-50">
                Harga<span className="text-red-500 dark:text-gray-50">*</span>
            </label>
            <input type="text"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
                name="price"
                className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            />
            <h1 className="text-xl font-bold dark:text-gray-50 pt-8">Unggah hingga 20 foto</h1>
            <ImageUpload />
            <h1 className="text-xl font-bold dark:text-gray-50 pt-8">Konfirmasikan lokasi iklan Anda</h1>

            <div className="flex flex-row items-center justify-start">
              <button
                type="submit"
                className="px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
              >
                Submit
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-cyan-500 ml-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
        </form>
    )
}