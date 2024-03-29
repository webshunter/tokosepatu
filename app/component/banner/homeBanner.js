"use client"
import React, { useEffect } from "react";
import { Carousel } from "flowbite-react";

const HomeBanner = ({data}) => {

    return (<>
        <div className='my-6 md:px-10 lg:px-[100px]'>
            <Carousel className="w-full h-[50vw] md:h-[21vw] lg:h-[21vw]">
                {data.map((d,i) => {
                    return <li key={i} link={d.backlink} onClick={(e)=>{
                        let w = e.target.getAttribute('link');
                        if(w){
                            window.location.href = w;
                        }else{
                            window.location.href = '/';
                        }
                    }} id={`data-` + d.kode} className={`lg:rounded-b-[25px] `}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain'
                        }}
                    ></li>
                })}
            </Carousel>
            <style jsx>{`
                ${data.map(function(o){
                    return ` 
#data-${o.kode}{
    background-image: url("${o.img1}");
    background-size: contain;
}
@media (min-width: 768px) {
  #data-${o.kode}{
    background-image: url("${o.img2}");
    background-size: contain;
  } 
}
                    `
                }).join("\n")}
            `}</style>
        </div>
    </>)
}

export default HomeBanner