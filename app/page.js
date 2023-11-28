


"use client"
import useSWR, { SWRConfig } from 'swr'
import Image from 'next/image';
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";
import { Toolbar } from "./component/toolbar";
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function LoadData(props) {
  // const { data } = useSWR('/pages/api/produk?limit=21&start=0', fetcher)
  // const [dataListing, setDataListing] = useState([]);

  // useEffect(() => {
  //   document.getElementById('search').value = '';
  //   (async function () {
  //     let data = await fetch(`/pages/api/produk?limit=21&start=0&approval=1`);
  //     data = await data.json();
  //   })()
  // }, [setDataListing])
  const [dataPremium, setPremium] = useState([]);
  const [dataPopuler, setPopuler] = useState([]);
  const [dataTerbaru, setTerbaru] = useState([]);
  const [showHome, setShowHome] = useState(null);

  useEffect(() => {
    async function getPremium() {
      const Premium = await fetch(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`);
      const ress1 = await Premium.json();
      setPremium(ress1.message);
    }
    async function getPopuler() {
      const Populer = await fetch(`/pages/api/produk?order=klik&ascdesc=DESC&limit=8&start=0&approval=1`);
      const ress2 = await Populer.json();
      setPopuler(ress2.message);
    }
    async function getTerbaru() {
      const Terbaru = await fetch(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&approval=1`);
      const ress3 = await Terbaru.json();
      setTerbaru(ress3.message);
      setShowHome(true);
    }
    getPremium();
    getPopuler();
    getTerbaru();
  }, []);

  return(<>
  {!showHome?
    <div className='px-[50px] pt-[50px] h-screen'>
        <div className="loader">Rumahjo
            <span></span>
        </div>
    </div>
  :
  <>
    <div className='my-6 md:px-10 lg:px-[135px]'>
      <Carousel className="h-[210px] md:h-[45vw] lg:h-[40vw]">
        <div className=" rounded-b-[25px]"
          style={{
            width:'100%',
            height:'100%',
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: 'url("/banner rumahjo.com_3.png")'
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
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href='dsds'>
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
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href='dsds'>
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
          <a className="absolute items-center inline-flex h-[2rem] right-0 top-0 md:top-4 bg-yellow-400 rounded-lg" href='dsds'>
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

  /* 
  let loader = [];
  for (let x = 0; x < 25; x++) {
    loader.push({
      data:'loader'
    });
  }

  if (data){
    return (
      <>
        <div className='my-5 '>
          <Carousel className="h-[240px] bg-gray-200 md:h-[420px]">
            <div
              style={{
                width:'100%',
                height:'100%',
                backgroundRepeat:'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: 'url("/Designer.png")'
              }}
            />
          </Carousel>
        </div>
        <Toolbar />
        <section className="block px-4 md:px-10">
          <div className="w-full">
            <div className="relative">
              <h2 className="font-semibold text-2xl mb-2">Properti Premium</h2>
              <p className="font-medium text-sm mb-4">Cek rekomendasi properti premium dari kami serta informasi terlengkapnya.</p>
              <a className="absolute items-center inline-flex h-[2rem] right-0 top-4 bg-yellow-400 rounded-lg" href='dsds'>
                <span className="text-white text-sm px-5 py-1">Selengkapnya</span>
              </a>
            </div>

          </div>
        </section>
        <div className='px-4 md:px-10'>
          <h1 className='text-2xl'>Rekomendasi baru</h1>
        </div>
        <div className="px-4 mt-[10px] md:px-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {data.message.map((y, i) => {
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
      </>
    )
  }else{
    return <>
      <div className='my-5 '>
        <Carousel className="h-[240px] bg-gray-200 md:h-[420px]">
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundImage: 'url("/Designer.png")'
            }}
          />
        </Carousel>
      </div>
      <Toolbar />
      <div className='px-4 md:px-10'>
        <h1 className='text-2xl'>Rekomendasi baru</h1>
      </div>
      <div className="px-4 md:px-10 mt-[10px] md:px-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {loader.map((y, i) => {
            return (
              <li className="list-none" key={i}>
                <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </li>
            )
          })}
      </div>
    </>
  }
  */

}
