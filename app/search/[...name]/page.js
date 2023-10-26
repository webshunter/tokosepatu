"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";
import { ProdukCard } from '@/app/library/card2';
import { capitalize } from '@/app/library/global';

export default function Search({params}) {
    let [slug] = params.name; 
    const [nama, setNama] = useState('');
    const [dataListing, setDataListing] = useState([]);
    const [card, addCard] = useState([]);

    useEffect(() => {
        let [status, getSlug] = slug.split('q-');
        let search = decodeURI(getSlug).replace(/\-/g, ' ');
        document.getElementById('search').value = search;
        setNama(capitalize(search))
        if (localStorage.getItem('produkstart') != undefined) {
            setDataListing(JSON.parse(localStorage.getItem('produkstart')));
        }

        (async function () {
            let data = await fetch('https://app.rumahjo.com/data/listing/0/100');
            data = await data.json();
            localStorage.setItem('produkstart', JSON.stringify(data));
            setDataListing(data);
        })()
    }, [setDataListing, setNama])

    let yh = [];
    for (let index = 0; index < 12; index++) {
        yh.push({
            data: index
        })
    }

    return (
        <>
            <div className='mt-5 mx-5'>
                <h1 className={`py-[20px] font-bold text-gray-900 block text-[1.2rem]`}>{nama} - RumahJo Cara Tepat Jual Cepat</h1>
            </div>
            <div className='search-menus'>
                <div>

                </div>
                <div>
                    <div className='mx-[20px] xl:mx-[60px]'>
                        <h1 className='text-2xl'>Rekomendasi baru</h1>
                    </div>
                    <div className="mx-[20px] mt-[10px] md:mx-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                        {dataListing.map((y, i) => {
                            y.key = i;
                            return (
                                <li className="list-none" key={i}>
                                    <ProdukCard data={y} />
                                </li>
                            )
                        })}
                    </div>
                    <div className='text-center mt-10 mb-5'>
                        <button className='border-[2px] border-black px-5 py-2 rounded-md'>Muat Lainnya</button>
                    </div>
                </div>
            </div>
        </>
    )
}
