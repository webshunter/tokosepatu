"use client"
import useSWR, { SWRConfig } from 'swr'
import React from "react";
import { ProdukCard } from '@/app/library/card';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const IklanTerkait = ({data}) => {
    let properti = data.data.length > 0? data.data[0]: null;
    const { data: dPremium } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1&slug2=${properti.slug2.replace(/\&/g, '~')}&kec=${properti.kec}&n=${btoa(JSON.stringify([['slug',properti.slug]]))}`, fetcher)
    console.log(properti)
    return <>
    <div className='p-5'>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
            {dPremium && Array.isArray(dPremium.message) ? dPremium.message.map((x, i) => {
                x.key = i;
                return (
                    <li className="list-none" key={i}>
                        <ProdukCard data={x} type={"premium"} />
                    </li>
                )
            }) : <></>}
        </div>
    </div>
    </>
}

export default IklanTerkait;