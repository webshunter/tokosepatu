"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";
import { ProdukCard } from '@/app/library/card2';
import { capitalize } from '@/app/library/global';
import Link from 'next/link';
import MultiRangeSlider from '@/app/component/multiRangeSlider/MultiRangeSlider';
import RadioSelect from '@/app/component/radioSelect/RadioSelect';

export default function Search({ params }) {
    let slug = params.name;
    const [nama, setNama] = useState('');
    const [dataListing, setDataListing] = useState([]);
    const [card, addCard] = useState([]);

    useEffect(() => {
        const loadData = function (dataSlug) {
            const slug = [].concat(dataSlug)
            if (slug) {
                let seachSlug = slug.shift();
                let [status, getSlug] = seachSlug.split('q-');
                if (seachSlug) {
                    let search = decodeURI(getSlug).replace(/\-/g, ' ');
                    document.getElementById('search').value = search;
                    setNama(capitalize(search));
                    (async function () {
                        let data = await fetch(`/pages/api/produk?limit=21&start=0&kmandi=4&d=${search}`);
                        data = await data.json();
                        console.log(data)
                        setDataListing(data.message);
                    })()
                }
            }
        }
        loadData(slug);
    }, [setDataListing, setNama, slug])

    let yh = [];
    for (let index = 0; index < 12; index++) {
        yh.push({
            data: index
        })
    }

    const [visibility, setFilter] = useState("hidden");
    const changeFilter = () => {
        if (visibility !== "hidden") {
            setFilter("hidden");
        } else {
            setFilter("block");
        }
    };

    return (
        <>
            <div>
                <section className="hidden md:block">
                    <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}>
                        <div className="relative w-full px-4 md:px-10" style={{ marginLeft: "auto", left: "auto", right: "auto", float: "left", minHeight: "1px", boxSizing: "border-box" }}>
                            <div>
                                <div className="text-[12px] my-[8px] relative w-full box-border flex">
                                    <ol className="text-ellipsis whitespace-nowrap overflow-x-clip overflow-y-visible block p-[2px] h-full box-border">
                                        <li className="inline list-none whitespace-nowrap">
                                            <a href="/" className="cursor-pointer text-[12px]" style={{ textDecoration: "none", }}>Beranda</a>
                                            <span className="mx-[5px]">/</span>
                                        </li>
                                        <li className="inline list-none whitespace-nowrap">
                                            <a href={"/search/" + slug} className="cursor-pointer text-[12px]" style={{ textDecoration: "none", }}>Cari : {nama}</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <h1 className="my-[8px] font-bold text-gray-900 block md:text-[1.2rem] sm:text-[.5rem]">{nama} - RumahJo Cara Tepat Jual Cepat</h1>
                        </div>
                    </div>
                </section>
                <section className="block md:hidden">
                    <div style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}>
                        <div className="relative w-full" style={{ marginLeft: "auto", left: "auto", right: "auto", float: "left", minHeight: "1px", boxSizing: "border-box" }}>
                            <div className="relative mt-[-8px] flex flex-row bg-white" style={{ padding: "16px 10px 0px 10px" }}>
                                <div className="flex flex-wrap flex-1">
                                    <div onClick={changeFilter} className="capitalize border border-gray-400 bg-transparent inline-flex justify-around items-center h-[32px] mr-[8px] mb-[8px] px-[12px] rounded-[20px] text-[12px] font-normal cursor-pointer">
                                        <div className="">Harga</div>
                                        <span className="flex justify-center items-center ml-[8px]">
                                            <svg className="w-[15px] h-[15px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[20px] flex justify-center items-center bg-white" style={{ boxShadow: "0 4px 6px -3px rgba(0, 47, 52, 0.36)" }}>
                                <div className="w-[24px] h-[4px] rounded-[2.5px]" style={{ backgroundColor: "rgba(0, 47, 52, 0.64)" }}></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='my-5 bg-white'>
                        <div className="pt-5 px-4 md:px-10">
                            <div className="grid w-full grid-cols-4 gap-4">
                                <div className="col-span-4 md:col-span-1">
                                    <div className="hidden md:block w-full">
                                        <div style={{ margin: "8px 16px 0 0" }}>
                                            <div className="relative h-full">
                                                <div className="mb-[28px]">
                                                    <div>
                                                        <span className="text-[16px] leading-[24px] font-bold text-gray-800">KATEGORI</span>
                                                    </div>
                                                    <div className="block pt-[16px]">
                                                        <ul className="max-h-[166px] overflow-y-auto list-none">
                                                            <li>
                                                                <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                    <div className="flex justify-start items-center font-bold text-gray-800">
                                                                        <div className="w-[16px] mr-[16px] border border-gray-800"></div>
                                                                        Properti
                                                                    </div>
                                                                </a>
                                                                <ul className="ml-[16px] list-none">
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Dijual: Rumah & Apartemen</span>
                                                                            <span>(4)</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Disewakan: Rumah & Apartemen</span>
                                                                            <span>(4)</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Tanah</span>
                                                                            <span>(4)</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Indekos</span>
                                                                            <span>(4)</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Dijual: Bangunan Komersil</span>
                                                                            <span>(8)</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="ml-[16px] text-[14px]">
                                                                        <a className="block" style={{ padding: "8px 0 8px 20px" }}>
                                                                            <span>Disewakan: Bangunan Komersil</span>
                                                                            <span>(8)</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-white ${visibility} md:block`}>
                                        <div className="visible fixed md:relative flex bg-[rgba(0,0,0,.8)] md:bg-white top-0 md:top-auto left-0 md:left-auto bottom-0 md:bottom-auto right-0 md:right-auto z-[9999] md:z-auto justify-center items-center">
                                            <div className="h-[88vh] visible box-border md:h-auto bg-white fixed md:relative bottom-0 w-full rounded-t-[18px] md:rounded-none left-0 md:left-auto right-0 md:right-auto z-10">
                                                <button onClick={changeFilter} className="block md:hidden w-[32px] border-y md:border-0 border-[rgba(0,47,52,0.36)] rounded-[10px] my-[4px] mx-auto"></button>
                                                <div className="w-full md:w-auto box-border md:box-content block md:hidden h-[calc(100% - 10px)] md:h-auto">
                                                    <div className="p-4 h-[48px] w-full flex items-center justify-between">
                                                        <div className="font-semibold leading-[24px] text-[20px] text-gray-800">Filter & Sortir</div>
                                                        <div onClick={changeFilter} className="cursor-pointer">
                                                            <span>
                                                                <svg className="w-[14px] h-[14px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path></svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 md:p-auto">
                                                    <div className="relative border-t border-gray-400">
                                                        <div className="hidden md:flex text-[16px] text-gray-500 pt-[30px]">
                                                            <span>Filter</span>
                                                        </div>
                                                        <form>
                                                            <div className="overflow-y-auto md:overflow-y-visible max-h-[calc(100vh-200px)] md:max-h-none">
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Harga</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari rentang</div>
                                                                        <div className="my-[12px]">
                                                                            <div className="flex justify-between items-center justify-center">
                                                                                <input className="w-[74px] h-[32px]" name="min" type="text" placeholder="Min"></input>
                                                                                <span className="text-gray-800">Sampai</span>
                                                                                <input className="w-[74px] h-[32px]" name="max" type="text" placeholder="Maks"></input>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Tipe</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari pilihan di bawah</div>
                                                                        <div className="my-[12px]">
                                                                            <div className="flex items-center">
                                                                                <input name="type" id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apartemen</label>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <input name="type" id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rumah</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Luas Bangunan</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari rentang</div>
                                                                        <div className="">
                                                                            <MultiRangeSlider min={0} max={10000} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Kamar Tidur</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari pilihan di bawah</div>
                                                                        <div className="pb-[16px] md:pb-[8px]">
                                                                            <RadioSelect label={'KAMAR TIDUR'} repeat={4} name={'ktidur'} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Kamar Mandi</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari pilihan di bawah</div>
                                                                        <div className="pb-[16px] md:pb-[8px]">
                                                                            <RadioSelect label={'KAMAR MANDI'} repeat={4} name={'kmandi'} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Luas Tanah</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari rentang</div>
                                                                        <div className="">
                                                                            <MultiRangeSlider min={0} max={10000} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Tipe</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari pilihan di bawah</div>
                                                                        <div className="my-[12px]">
                                                                            <div className="flex items-center">
                                                                                <input name="cert" id="default-checkbox" type="checkbox" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">SHM - Sertifikat Hak Milik</label>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <input name="cert" id="checked-checkbox" type="checkbox" value="2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">HGB - Hak Guna Bangun</label>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <input name="cert" id="checked-checkbox" type="checkbox" value="3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lainnya (PPJB, Girik, Adat, dll)</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center flex-wrap border-b border-gray-400">
                                                                    <div className="pt-[16px] md:pt-[32px] pb-[16px] md:pb-[8px] text-gray-900 basis-[33.33%] md:basis-[100%]">
                                                                        <div className="capitalize md:uppercase font-normal md:font-bold text-[14px] md:text-[16px]">
                                                                            <span className="">Lantai</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[66.66%] box-border md:w-full">
                                                                        <div className="text-gray-600">Pilih dari pilihan di bawah</div>
                                                                        <div className="pb-[16px] md:pb-[8px]">
                                                                            <RadioSelect label={'LANTAI'} repeat={4} name={'lantai'} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="pt-4">
                                                                    <button type="submit" className="h-[48px] w-full bg-indigo-950 hover:bg-indigo-750 inline-flex justify-center items-center box-border cursor-pointer relative overflow-hidden rounded-md" style={{ color: "rgb(250 204 21)" }}>Terapkan</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-3">
                                    <div>
                                        <div className='mx-[20px] xl:mx-[60px]'>
                                            <h1 className='text-2xl'>Rekomendasi baru</h1>
                                        </div>
                                        <div className="mx-[20px] mt-[10px] md:mx-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                                            {dataListing ? Array.isArray(dataListing) ? dataListing.map((y, i) => {
                                                y.key = i;
                                                return (
                                                    <li className="list-none" key={i}>
                                                        <ProdukCard data={y} />
                                                    </li>
                                                )
                                            }) : <>{dataListing}</> : null}
                                        </div>
                                        <div className='text-center mt-10 mb-5'>
                                            <button className='border-[2px] border-black px-5 py-2 rounded-md'>Muat Lainnya</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
