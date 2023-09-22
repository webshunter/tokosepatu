"use client"
import Image from 'next/image';
import { Header } from './component/header';
import { ProdukCard } from './library/card';
import { useEffect, useState } from 'react';

export default function Home() {

  const [card, addCard] = useState([]);

  useEffect(()=>{

  })

  let yh = [];
  for (let index = 0; index < 52; index++) {
    yh.push({
      data: index
    })
  }

  return (
    <>
      <Header />
      <div className="m-10 grid grid-cols-4 gap-4">
        {yh.map((y, i) => {
          return (<>
            <ProdukCard key={i} />
          </>)
        })}
      </div>
    </>
  )
}
