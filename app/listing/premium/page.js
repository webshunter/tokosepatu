"use client"
import React from "react";
import useSWR, { SWRConfig } from 'swr'
import { useEffect, useState } from 'react';
import { ProdukCard } from "@/app/library/card";
const fetcher = (...args) => fetch(...args).then((res) => res.json())
let started = 0;
const DaftarPremium = () =>{
  const { data: dPremium } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)
  const [dataPremium, setPremium] = useState([]);
  useEffect(() => {
    if (dPremium) {
      setPremium(dPremium.message)
    }
  }, [dPremium])
  return <>
    <section className="block mt-10 px-4 md:px-10 my-[16px]">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {dataPremium.map((x, i) => {
            x.key = i;
            return (
              <li className="list-none" key={i}>
                <ProdukCard data={x} type={"premium"} />
              </li>
            )
          })}
        </div>
        <div className="text-center">
          <button className="p-2 bg-blue-700 text-white rounded mt-10 cursor-pointer"
            onClick={()=>{
              fetch(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=${started + 8}&approval=1`)
              .then((r)=> {
                return r.json()
              })
              .then((w) => {
                if(w.message.length > 0){
                  started += 8;
                  setPremium( dataPremium.concat( w.message) )
                }
              })
            }}
          >Lihat Lainnya</button>
        </div>
      </div>
    </section>
  </>
}

export default DaftarPremium;