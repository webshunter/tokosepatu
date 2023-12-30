"use client"
import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const Footer = function () {
    const { data: dPremium } = useSWR(`/api/footer`, fetcher);
    const [populer, setPopuler] = useState([]);
    const [kat, setKat] = useState([]);
    
    useEffect(()=>{
        if (dPremium){
            let [pop, kat] = dPremium.message;
            setPopuler(pop);
            setKat(kat);
        }
    }, [dPremium])

    return (<>
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-2">
                    {/* <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">KATEGORI POPULER</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            {populer.map((q,i)=>
                                <li key={i} className="mb-1">
                                    <a href={`/search/kota-${q.kota}`} className=" hover:underline">{q.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">PENCARIAN POPULER</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            {kat.map((q, i) =>
                                <li key={i} className="mb-1">
                                    <a href={`/search/slug2-${q.slug2}`} className=" hover:underline">{q.slug2}</a>
                                </li>
                            )}
                        </ul>
                    </div> */}
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Rumahjo.com</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="/sale" className="hover:underline">Dijual</a>
                            </li>
                            <li className="mb-1">
                                <a href="/rent" className="hover:underline">Disewakan</a>
                            </li>
                            <li className="mb-1">
                                <a href="/indekos" className="hover:underline">Indekos</a>
                            </li>
                            <li className="mb-1">
                                <a href="/cari-agen" className="hover:underline">Cari Agen</a>
                            </li>
                            <li className="mb-1">
                                <a href="/simulasi-kpr" className="hover:underline">Simulasi KPR</a>
                            </li>
                        </ul>
                    </div>
                    <div className="float-right text-right">
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Hubungi Kami</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="https://www.instagram.com/rumahjo.com88/" className="hover:underline"> <i className='fab fa-instagram'></i> Instagram</a>
                            </li>
                            <li  className="mb-1">
                                <a href="tel:+62895367066866" className="hover:underline"> <i className="fa-solid fa-phone"></i> +62 895 3670 66866</a>
                            </li>                            
                            <li  className="mb-1">
                                <a href="https://wa.me/62895367066866" className="hover:underline"> <i className="fa-brands fa-whatsapp"></i> +62 895 3670 66866</a>
                            </li>
                            <li  className="mb-1">
                                <a href="mailto:rumahjo.com@gmail.com" className="hover:underline"> <i className="fa-solid fa-envelope"></i> rumahjo.com@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">Copyright © RUMAHJO — 2023 | Rumahjo.com
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                        <span className="text-gray-500 dark:text-gray-300">Iklan gratis di RumahJo Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}