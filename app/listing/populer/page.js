"use client"
import React from "react";
import useSWR, { SWRConfig } from 'swr'
import { useEffect, useState } from 'react';
import { ProdukCard } from "@/app/library/card";
import { LoaderJo } from "@/app/component/loader";
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const DaftarPremium = () => {
  const [count, setCount] = useState(0);
  const { data: dPremium, mutate } = useSWR(`/pages/api/produk?order=klik&ascdesc=DESC&limit=24&start=${count}&approval=1`, fetcher)

  return <>
    {!dPremium ?
      <>
        <LoaderJo/>
      </>
      :
      <section className="block mt-10 px-4 md:px-10 my-[16px]">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {dPremium ? dPremium.message.map((x, i) => {
              x.key = i;
              return (
                <li className="list-none" key={i}>
                  <ProdukCard data={x} type={"premium"} />
                </li>
              )
            }) : <></>}
          </div>
          <div className="text-center">
            <button className="p-2 bg-blue-700 text-white rounded mt-10 cursor-pointer"
              onClick={() => {
                if (count != 0) {
                  setCount(count - 24);
                  mutate();
                  window.scrollTo(0, 0)
                }
              }}
            >Listing Sebelumnya</button>
            <button className="ml-2 p-2 bg-blue-700 text-white rounded mt-10 cursor-pointer"
              onClick={() => {
                let cn = dPremium ? dPremium.message.length : 0;
                setCount(count + 24);
                mutate();
                window.scrollTo(0, 0)
              }}
            >Listing Selanjutnya</button>
          </div>
        </div>
      </section>
    }
  </>
}

export default DaftarPremium;