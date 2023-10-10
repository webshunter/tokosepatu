"use client"
import Image from 'next/image';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';

export default function Home() {

  const [card, addCard] = useState([]);

  useEffect(()=>{

  })

  let yh = [];
  for (let index = 0; index < 24; index++) {
    yh.push({
      data: index
    })
  }

  return (
    <>
      <Header />
      <div className="m-4 md:m-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {yh.map((y, i) => {
          return (<>
            <ProdukCard key={i} />
          </>)
        })}
      </div>
      <Footer />
    </>
  )
}
