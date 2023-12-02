"use client"
import useSWR, { SWRConfig } from 'swr'
import Image from 'next/image';
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";
import { Toolbar } from "./component/toolbar";
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function LoadData(props) {
  const { data : dPremium } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)
  const { data : dPopuler } = useSWR(`/pages/api/produk?order=klik&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)
  const { data: dBaru } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)

  const [dataPremium, setPremium] = useState([]);
  const [dataPopuler, setPopuler] = useState([]);
  const [dataTerbaru, setTerbaru] = useState([]);
  const [showHome, setShowHome] = useState(null);

  useEffect(() => {
    if(dPremium){
      setPremium(dPremium.message)
    }
    if(dPopuler){
      setPopuler(dPopuler.message)
    }
    if(dBaru){
      setTerbaru(dBaru.message)
    }
    if (dPremium != undefined && dPopuler != undefined && dBaru != undefined){
      setShowHome(true)
    }
  }, [dPremium,dPopuler, dBaru]);

  return(<>
  {!showHome?
    <div className='px-[50px] pt-[50px] h-screen'>
        <div className="loader">Rumahjo
            <span></span>
        </div>
    </div>
  :
  <>
    <div className='my-6 md:px-10 lg:px-[100px]'>
      <Carousel className="w-full h-[23vw] md:h-[21vw] lg:h-[19vw]">
        <div className=" lg:rounded-b-[25px]"
          style={{
            width:'100%',
            height:'100%',
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: 'url("/banner-rumahjo.png")'
          }}
        />
      </Carousel>
    </div>
    <Toolbar />
    <section className="block px-4 md:px-10 my-[16px]">
      <div className="w-full">
        <div className="relative">
          <h2 className="font-semibold text-2xl mb-2">Properti Premium</h2>
          <p className="font-medium text-sm mb-4">Cek rekomendasi properti premium dari kami serta informasi terlengkapnya.</p>
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href=''>
            <span className="text-white text-sm px-5 py-1">Selengkapnya</span>
          </a>
        </div>
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
      </div>
    </section>
    <section className="block px-4 md:px-10 mb-[16px]">
      <div className="w-full">
        <div className="relative">
          <h2 className="font-semibold text-2xl mb-2">Properti Terpopuler</h2>
          <p className="font-medium text-sm mb-4">Properti terpopuler yang paling banyak dilihat pengunjung.</p>
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href=''>
            <span className="text-white text-sm px-5 py-1">Selengkapnya</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {dataPopuler.map((y, j) => {
            y.key = j;
            return (
              <li className="list-none" key={j}>
                <ProdukCard data={y} type={"populer"} />
              </li>
            )
          })}
        </div>
      </div>
    </section>
    <section className="block px-4 md:px-10 mb-[16px]">
      <div className="w-full">
        <div className="relative">
          <h2 className="font-semibold text-2xl mb-2">Properti Terbaru</h2>
          <p className="font-medium text-sm mb-4">Iklan properti yang baru diposting.</p>
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href=''>
            <span className="text-white text-sm px-5 py-1">Selengkapnya</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {dataTerbaru.map((z, k) => {
            z.key = k;
            return (
              <li className="list-none" key={k}>
                <ProdukCard data={z} />
              </li>
            )
          })}
        </div>
      </div>
    </section>
  </>
  }
  </>);
}
