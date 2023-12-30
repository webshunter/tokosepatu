"use client"
import useSWR, { SWRConfig } from 'swr'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LoaderJo } from '../component/loader';
import { NotFound } from '../component/notFound';
import { ProdukCard } from '../library/card';
import { capitalize } from '@/app/library/global';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Search({ params }) {
    const Allowed = ['sale', 'rent', 'indekost'];
    let slug = params.name;
    const pageAllow = slug.some((url) => Allowed.includes(url));
    if (!pageAllow) {
        return <NotFound/>;
    } else {        
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();
        const keyword = (searchParams.get('keyword') ? searchParams.get('keyword') : '');
        const type = (searchParams.get('type') ? searchParams.get('type') : '');
        const order = (searchParams.get('order') ? searchParams.get('order') : '');
        const [Label, setLabel] = useState('');
        const [Keyword, setKeyword] = useState(keyword);
        const [Type, setType] = useState(type);
        const [Order, setOrder] = useState(order);
        const keyDownAction = function(event){
            if (event.code == 'NumpadEnter' || event.code == 'Enter'){
                goSeach();
            }
        }
        let search = '?status='+(slug[0]==='sale' ? '1' : slug[0]==='rent' ? '2' : '0')+'&';
        searchParams.forEach((value, key) => {
            search=search+key+'='+value+'&';
        });
        let url = '';
        const goSeach = function(){
            if (Keyword!=='' || Type!=='' || Order!=='') {
                url = '?' + 
                    (Keyword!=='' ? 'keyword='+Keyword+'&' : '') + 
                    (Type!=='' ? 'type='+Type+'&' : '') + 
                    (Order!=='' ? 'order='+Order+'&' : '');
                url = url.slice(0, -1)
            }
            router.push(pathname + url);
        }
        const searchButton = function(){
            goSeach();
        }
        const fillterButton = function(){
            setOrder(document.getElementById("filter").value);
            //goSeach();
        }
        const { data : dListing } = useSWR(`/api/listing`+search.slice(0, -1), fetcher);
        const [dataListing, setListing] = useState([]);
        useEffect(() => {
            if(dListing){
              setListing(dListing.message)
            }
          }, [dListing]);
        return (
            <>
                <div className="my-5">
                    <div className="box-border">
                        <div className="bg-[url('/bgcari.jpg')] bg-cover bg-center h-[calc(30vw)] max-h-[calc(30vw)] min-h-[320px] mb-[20px] flex justify-start flex-col items-center py-[0px] px-[6%]">
                            <div className="flex items-start whitespace-nowrap w-full" style={{marginTop:"calc(20px + 4vw)",marginBottom:"calc(8px + 0.8vw)"}}>
                                <h1 className="text-[220%] font-normal text-white leading-tight" style={{textShadow:"rgba(0, 0, 0, 0.6) 0px 2px 4px"}}>Cari Properti {slug[0]==='sale' ? 'Dijual' : slug[0]==='rent' ? 'Disewa' : 'Indekost'}</h1>
                            </div>
                            <div className="w-full rounded" style={{backgroundColor:"rgba(0, 0, 0, 0.6)",padding:"calc(8px + 0.4vw) calc(16px + 0.8vw)"}}>
                                <div className="block md:flex items-center" style={{marginBottom:"calc(5px + .5vw)",marginTop:"calc(5px + 0.5vw)"}}>
                                    <div className="block md:flex items-center md:bg-white rounded max-w-full md:max-w-auto" style={{flex:"1 1 0%",}}>
                                        <div id="search" className="flex items-center bg-white max-h-[40.8px] md:max-h-[55.5px]" style={{flex:"1 1 0%"}}>
                                            <div className="h-full flex items-center pl-2 md:pl-4" style={{ width:"calc(35px + 1vw)", color:"rgba(0, 0, 0, 0.25)",fontSize:"120%" }}>
                                                <FontAwesomeIcon className=""
                                                    icon={faSearch}/>
                                            </div>
                                            <div className="flex flex-wrap w-full md:w-[83%] mt-[3px]" style={{flex:"1 1 0%",fontSize:"115%",lineHeight:"1", outline:"none"}}>
                                                <input 
                                                    onChange={(e) => {
                                                        setKeyword(e.target.value);
                                                    }}
                                                    value={Keyword.replace(/\-/g, ' ')} type="text" className="h-[33px] md:h-auto outline-none border-0 placeholder-shown:text-ellipsis" placeholder="Cari properti"></input>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <ul className="flex w-full">
                                                <li className="w-full">
                                                    <select
                                                        value={Type}
                                                        onChange={(e) => {
                                                            setType(e.target.value);
                                                        }}
                                                        name="Type"
                                                        id="order" className="border-0 cursor-pointer" >
                                                        <option value="">Tipe</option>
                                                        <option value="rumah">Rumah</option>
                                                        <option value="apartemen">Apartemen</option>
                                                        <option value="tanah">Tanah</option>
                                                        <option value="indekos">Indekos</option>
                                                        <option value="komersil">Bangunan Komersil</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div id="btn-search" className="w-full">
                                        <button onClick={searchButton} className="w-full text-white text-[90%] md:text-[105%] rounded bg-yellow-400" style={{padding:"calc(7px + 0.5vw) calc(12px + 1.2vw)",minWidth:"calc(100px + 7vw)"}}>Cari</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block px-4 md:px-10 mb-[16px]">
                        <div className="grid grid-cols-[auto 18rem] py-8 md:flex md:justify-between justify-items-start">
                            <div className="text-center md:text-left flex pt-3">
                                <h1 className="text-lg">{capitalize(keyword=='' ? 'Cari Properti' : Keyword.replace(/\-/g, ' '))} - RumahJo Cara Tepat Jual Cepat</h1>
                            </div>
                            <div className="grid text-right w-full md:w-auto lg:w-auto">
                                <div className="text-center">
                                    <select
                                        value={Order}
                                        onChange={ fillterButton }
                                        onClick={ searchButton }
                                        name="Order"
                                        id="filter" className="border rounded-lg cursor-pointer" >
                                        <option value="">Urutkan</option>
                                        <option value="1">Termahal</option>
                                        <option value="2">Termurah</option>
                                        <option value="3">Terbaru</option>
                                        <option value="4">Terlama</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                            {dataListing.map((z, k) => {
                                z.key = k;
                                return (
                                <li className="list-none" key={k}>
                                    <ProdukCard data={z} />
                                </li>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx global>
                    {`
                    #search {
                        max-width: 100%;
                    }
                    #btn-search {
                        max-width: 100%;
                        margin-left: 0;
                        margin-right: calc(5px + 0.5vw);
                    }
                    @media (min-width: 600px) {
                        #search {
                            max-width: calc(100% - 110px - 5vw);
                        }
                        #btn-search {
                            max-width: calc(50px + 9vw);
                            margin-left: calc(5px + 0.5vw);
                            margin-right: calc(5px + 0.5vw);
                        }
                    }
                    `}
                </style>
            </>
        )
    }
}