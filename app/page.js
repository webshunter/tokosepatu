"use client"
import Image from 'next/image';
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';
import { Carousel } from "flowbite-react";

export default function Home() {

  const [card, addCard] = useState([]);

  useEffect(()=>{

  })

  let yh = [];
  for (let index = 0; index < 12; index++) {
    yh.push({
      data: index
    })
  }

  return (
    <>
      <div className='mx-10 my-5 '>
        <Carousel className="h-[240px] bg-gray-200 md:h-[420px]">
          <img
              alt="..."
              src="https://scontent-cgk1-1.xx.fbcdn.net/v/t39.30808-6/272992589_115122914406451_9172091399930498802_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=52f669&_nc_ohc=AmwldY2LA6cAX-MHDIy&_nc_ht=scontent-cgk1-1.xx&oh=00_AfCbzjC8yoiDsJpoNrjGWiW3z1U3pJ1NEl0NFEshGd6USQ&oe=652C53BA"
          />
          <img
              alt="..."
              src="https://scontent-cgk1-1.xx.fbcdn.net/v/t39.30808-6/272992589_115122914406451_9172091399930498802_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=52f669&_nc_ohc=AmwldY2LA6cAX-MHDIy&_nc_ht=scontent-cgk1-1.xx&oh=00_AfCbzjC8yoiDsJpoNrjGWiW3z1U3pJ1NEl0NFEshGd6USQ&oe=652C53BA"
          />
          <img
              alt="..."
              src="https://scontent-cgk1-1.xx.fbcdn.net/v/t39.30808-6/272992589_115122914406451_9172091399930498802_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=52f669&_nc_ohc=AmwldY2LA6cAX-MHDIy&_nc_ht=scontent-cgk1-1.xx&oh=00_AfCbzjC8yoiDsJpoNrjGWiW3z1U3pJ1NEl0NFEshGd6USQ&oe=652C53BA"
          />
        </Carousel>
      </div>
      <div className='mx-4 md:mx-10'>
        <h1 className='text-2xl'>Rekomendasi baru</h1>
      </div>
      <div className="mx-4 mt-2 md:mx-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {yh.map((y, i) => {
          return (<>
            <ProdukCard key={i} />
          </>)
        })}
      </div>
      <div className='text-center mt-10 mb-5'>
        <button className='border-[2px] border-black px-5 py-2 rounded-md'>Muat Lainnya</button>
      </div>
    </>
  )
}
