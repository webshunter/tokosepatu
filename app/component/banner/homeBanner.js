"use client"
import React from "react";
import { Carousel } from "flowbite-react";

export default function HomeBanner(){
    return (<>
        <div className='my-6 md:px-10 lg:px-[100px]'>
            <Carousel className="w-full h-[50vw] md:h-[21vw] lg:h-[19vw]">
                <div className=" lg:rounded-b-[25px] bg-[url('/banner.png')] md:bg-[url('/banner-long.png')]"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                />
            </Carousel>
        </div>
    </>)
}