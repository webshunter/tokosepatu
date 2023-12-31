"use client"
import useSWR, { SWRConfig } from 'swr'
import React, { useState } from "react";
import { ProdukCard } from '@/app/library/card';
import { useOutsideClick } from '@/app/library/outclick';
import { 
    WhatsappIcon
    , WhatsappShareButton
    , FacebookIcon
    , FacebookShareButton
    , InstapaperIcon
    , InstapaperShareButton, 
    EmailIcon,
    EmailShareButton,
    TelegramIcon,
    TelegramShareButton,
    PocketIcon,
    PocketShareButton,
    LineIcon,
    LineShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon
} from 'react-share';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ShareButton = ({ data, url, deskripsi, children }) => {
    const [visible, setVisible] = useState(null);
    let properti = data? data.data.length > 0 ? data.data[0] : null:null;
    const ref = useOutsideClick(() => {
        setVisible(null)
    });
    return <>
        <div className='relative'>
            {children?
                <button className='w-full' onClick={() => {
                    setVisible(1);
                }}>
                    {children}
                </button>
                :
                <button onClick={()=>{
                    setVisible(1);
                }} className="inline-flex w-[40px] h-[40px]" style={{ borderRadius: "50%", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                    <svg className="w-[24px] h-[24px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg>
                </button>
            }
            <div ref={ref} style={{ zIndex:'9999', visibility: visible ? 'visible' : 'hidden' }} className="absolute top-[60px] right-[0] h-[100px] rounded text-gray-950 px-4 py-2 shadow-xl bg-white w-[320px]">
                <WhatsappShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/'+properti.slug}
                    quote={deskripsi?deskripsi: properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/'+properti.slug}
                    quote={deskripsi?deskripsi: properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TwitterShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/'+properti.slug}
                    quote={deskripsi?deskripsi:  properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/'+properti.slug}
                    quote={deskripsi?deskripsi: properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/' + properti.slug}
                    quote={deskripsi?deskripsi: properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
                <LinkedinShareButton
                    className='mx-[5px]'
                    url={url?url:'https://rumahjo.com/produk/'+properti.slug}
                    quote={deskripsi?deskripsi: properti? properti.deskrisi: ''}
                    hashtag="#muo"
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
        </div>
    </>
}

export default ShareButton;