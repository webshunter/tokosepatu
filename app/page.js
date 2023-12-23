"use client"
import useSWR, { SWRConfig } from 'swr'
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';
import { Toolbar } from "./component/toolbar";
import { useRouter } from "next/navigation";
import HomeBanner from './component/banner/homeBanner';

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function LoadData(props) {
  const { data : dPremium } = useSWR(`/api/premium?limit=8`, fetcher)
  const { data : banner } = useSWR(`/api/banner`, fetcher)
  const { data : dPopuler } = useSWR(`/pages/api/produk?order=klik&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)
  const { data: dBaru } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`, fetcher)
  const route = useRouter();
  
  const [dataPremium, setPremium] = useState([]);
  const [dataPopuler, setPopuler] = useState([]);
  const [dataTerbaru, setTerbaru] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
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
    if(banner){
      setDataBanner(banner.message)
    }
    if (dPremium != undefined && dPopuler != undefined && dBaru != undefined){
      setShowHome(true)
    }
  }, [dPremium,dPopuler, dBaru, banner]);

  return(<>
  {!showHome?
    <div className='px-[50px] pt-[50px] h-screen'>
        <div className="loader">Rumahjo
            <span></span>
        </div>
    </div>
  :
  <>
        <HomeBanner data={dataBanner} />
    
    <Toolbar />

    <section className="block px-4 md:px-10 my-[16px]">
      <div className="w-full">
        <div className="relative">
          <h2 className="font-semibold text-2xl mb-2">Properti Premium</h2>
          <p className="font-medium text-sm mb-4">Cek rekomendasi properti premium dari kami serta informasi terlengkapnya.</p>
              <button className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-[#db9233] rounded-lg" onClick={() => {
                route.push('/listing/premium')
              }}>
            <span className="text-white font-semibold text-sm px-5 py-1" >Selengkapnya</span>
          </button>
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
          <button className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-[#db9233] rounded-lg" onClick={()=>{
            route.push('/listing/populer')
          }}>
            <span className="text-white font-semibold text-sm px-5 py-1">Selengkapnya</span>
          </button>
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
              <button className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-[#db9233] rounded-lg" onClick={() => {
                route.push('/listing/terbaru')
              }}>
            <span className="text-white font-semibold text-sm px-5 py-1">Selengkapnya</span>
              </button>
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
