'use client'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Indexing = () => {
    const pathName = usePathname();
    const [nn, setNn] = useState(null);

    useEffect(()=>{
        const getStatus = async function(){
            if (pathName.indexOf('/produk/') != -1) {
                let q = pathName.split('/produk/')[1];
                let data = await fetch('/api/indexing/produk?slug='+q);
                let dataJSON = await data.json();
                let [dataMessage] = dataJSON.message;
                setNn(Number(dataMessage.total))
            }else{
                setNn(Number(1))
            }
        }
        getStatus();
    }, [pathName])

    if(pathName){
        return <>
            <meta name="robots" content="index, follow" />
        </>
    }
    return <></>
}

export default Indexing;