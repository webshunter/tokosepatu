"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Modal } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { dataWilayah } from "@/app/library/loadJson";
import PhoneInput from "react-phone-number-input";

const wilayah = dataWilayah();

  
// const  CommentTag = ({text, children}) => {
//     const ref = useRef();
//     useEffect(() => {
//         let d = document.createElement('div')
//         let g = ref.current
//         console.log(g)
//     }, [text]);
//     return (<>
//     <div ref={ref}>
//         <div className="container-panel">
//             {children}
//         </div>
//     </div>
//     </>
//     );
// };

export default function HTMLComment({ children }) {
    return (<>
        <div className="tag-off"></div>
        {children}
        <div className="tag-on"></div>
    </>)
}

export const Toolbar = function () {
    const [openModal, setOpenModal] = useState(false);
    const route = useRouter();

    const searchButton = function(){
        goSeach(document.getElementById("cari").value);
    }

    const goSeach = function(value){
        value = encodeURI( value.toLowerCase().replace(/\ /g, '-') )
        route.push('/search/q-'+value)
    }

    const keyDownAction = function(event){
        if (event.code == 'NumpadEnter' || event.code == 'Enter'){
            goSeach(event.target.value);
        }
    }

    useEffect(() => {
        (function callingBack(){
            let timeout = document.querySelector('.tag-off');
            let timein = document.querySelector('.tag-on');
            if(timein){
                if(timeout){
                    timeout.outerHTML = '<!--googleoff: index-->'
                    timein.outerHTML = '<!--googleon: index-->'
                }
            }else{
                setTimeout(()=>{
                    callingBack();
                },500)
            }
        })()
    })

    return(<>
    <div className="px-4 md:px-10 mb-2 md:mb-4">
        <div className="flex justify-center items-center h-full">
            <div className="rounded-lg bg-primary overflow-hidden shadow-lg w-full md:w-[750px]">
                <div className="my-3 pt-1">
                    <div id="tablist" className="hidden">
                        <div className="tabs-home flex flex-nowrap h-[33px] overflow-x-auto overflow-y-hidden whitespace-nowrap justify-center">
                            <button role="tab" aria-selected="true" aria-controls="sale" id="sale" tabIndex="0" className="tabs-home__button button--active">Dijual</button>
                            <button role="tab" aria-selected="false" aria-controls="rent" id="rent" tabIndex="1" className="tabs-home__button">Disewa</button>
                            <button role="tab" aria-selected="false" aria-controls="newLaunch" id="newLaunch" tabIndex="2" className="tabs-home__button">Properti Baru</button>
                        </div>
                    </div>
                </div>
                <div className="w-full px-3 md:px-6 pb-4">
                    <div className="p-0 m-auto">
                        <div className="relative flex h-[40px] w-full">
                            <div className="flex absolute w-full bg-white border border-current rounded-lg">
                                <div className="flex bg-white items-center " style={{minHeight:"unset",padding:"4px 0",borderRadius:"8px 0 0 8px"}}>
                                    <div className="relative justify-center items-center flex" style={{flex:"unset",minHeight:"unset",padding:"0 8px"}}>
                                        <div className="relative w-[24px] items-center flex justify-center">
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                style={{ fontSize: 20, color: "rgb(105, 118, 132)" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative inline-block w-full" style={{minHeight:"unset"}}>
                                    <div className="flex flex-row flex-wrap overflow-hidden" style={{maxWidth:"calc(100% - 10px)"}}>
                                        <div className="h-full w-full relative flex justify-between">
                                            <div className="h-full relative items-center flex border-0 w-full gap-2 flex-wrap" style={{minHeight:"unset",padding:"4px 5px !important"}}>
                                                <input id="cari" onKeyDown={keyDownAction} className="h-[30px] border-0 mb-[5px] focus:ring-0 focus:ring-offset-0 focus:outline-[0] border-0" type="text" placeholder="Lokasi, keyword, area, project, developer"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={searchButton} className="ui-atomic-button px-1 md:px-[50px] btn-primary">
                                    <span className="text-white font-semibold">Cari</span>
                                </button>
                            </div>
                        </div>
                        <HTMLComment>
                            <div className="grid grid-cols-3 gap-4 items-center pt-2 text-white">
                                <div>
                                    <a onClick={() => setOpenModal(true)} className="flex flex-col md:flex-row gap-3 h-[88px] md:h-[50px] no-underline items-center px-[4px] md:px-0 py-[16px] md:py-0">
                                        <Image className="relative" src="/toolbar/carikan-properti.svg" alt="Cari Properti di Rumahjo" width={40} height={40} />
                                        <span className="font-bold text-center md:text-left leading-4 text-[12px] md:text-[14px]">Carikan Properti</span>
                                    </a>
                                </div>
                                <div>
                                    <Link href="/cari-agen" className="flex flex-col md:flex-row gap-3 h-[88px] md:h-[50px] no-underline items-center px-[4px] md:px-0 py-[16px] md:py-0">
                                        <Image className="relative" src="/toolbar/cari-agen.svg" alt="Cari Agen di Rumahjo" width={40} height={40} />
                                        <span className="font-bold text-center md:text-left leading-4 text-[12px] md:text-[14px]">Carikan Agen</span>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/simulasi-kpr" className="flex flex-col md:flex-row gap-3 h-[88px] md:h-[50px] no-underline items-center px-[4px] md:px-0 py-[16px] md:py-0">
                                        <Image className="relative" src="/toolbar/simulasi-kpr.svg" alt="Simulasi KPR di Rumahjo" width={40} height={40} />
                                        <span className="font-bold text-center md:text-left leading-4 text-[12px] md:text-[14px]">Simulasi KPR</span>
                                    </Link>
                                </div>
                            </div>
                        </HTMLComment>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal id="propertiModal" className="" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Spesifikasi properti seperti apa yang ingin kamu cari?</Modal.Header>
        <Modal.Body>
            <div className="w-full">
                <form className="w-full h-full" style={{overflowY:"auto"}}>
                    <div className="mb-[40px]">
                        <div className="mb-[16px]">
                            <div className="relative items-center flex">
                                <span className="pr-1">Tipe Properti</span>
                                <span className="text-[#c30000]">*</span>
                            </div>
                            <div className="pt-0 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-[50%] md:w-[75%]">
                                        <select id="filter" className="border mt-0 rounded-lg cursor-pointer" >
                                            <option value="rumah">Rumah</option>
                                            <option value="apartement">Apartemen</option>
                                            <option value="tanah">Tanah</option>
                                            <option value="indekos">Indekos</option>
                                            <option value="komersil">Bangunan Komersil</option>
                                        </select>
                                    </li>
                                    <li>
                                        <input type="radio"
                                            id="jual"
                                            name="type"
                                            value="0"
                                            selected="true"
                                            className="hidden peer"
                                            required />
                                        <label htmlFor="jual" className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div className="block">
                                                <div className="w-full">Dijual</div>
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="sewa"
                                            name="type"
                                            value="1"
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor="sewa"
                                            className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            <div className="block">
                                                <div className="w-full">Disewakan</div>
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-2 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-[50%]">
                                        <div className="relative items-center flex">
                                            <span className="pr-1">Harga Minimal</span>
                                            <span className="text-[#c30000]">*</span>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-shrink-0 z-10 max-h-[42px] mt-[5px] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                                <span>Rp</span>
                                            </div>
                                            <select id="min" name="min" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Berapapun</option>
                                                <option value="50">50Jt</option>
                                                <option value="100">100Jt</option>
                                                <option value="150">150Jt</option>
                                                <option value="200">200Jt</option>
                                                <option value="300">300Jt</option>
                                                <option value="400">400Jt</option>
                                                <option value="500">500Jt</option>
                                                <option value="600">600Jt</option>
                                                <option value="700">700Jt</option>
                                                <option value="800">800Jt</option>
                                                <option value="900">900Jt</option>
                                                <option value="1000">1M</option>
                                                <option value="1200">1.2M</option>
                                                <option value="1400">1.4M</option>
                                                <option value="1600">1.6M</option>
                                                <option value="1800">1.8M</option>
                                                <option value="2000">2M</option>
                                                <option value="3000">3M</option>
                                                <option value="4000">4M</option>
                                                <option value="5000">5M</option>
                                                <option value="10000">10M</option>
                                                <option value="20000">20M</option>
                                                <option value="50000">50M</option>
                                                <option value="100000">100M</option>
                                                <option value="500000">500M</option>
                                                <option value="1000000">1T</option>
                                                <option value="10000000">10T</option>
                                                <option value="100000000">100T</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li className="w-[50%]">
                                        <div className="relative items-center flex">
                                            <span className="pr-1">Harga Maksimal</span>
                                            <span className="text-[#c30000]">*</span>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-shrink-0 z-10 max-h-[42px] mt-[5px] inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                                <span>Rp</span>
                                            </div>
                                            <select id="max" name="max" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Berapapun</option>
                                                <option value="50">50Jt</option>
                                                <option value="100">100Jt</option>
                                                <option value="150">150Jt</option>
                                                <option value="200">200Jt</option>
                                                <option value="300">300Jt</option>
                                                <option value="400">400Jt</option>
                                                <option value="500">500Jt</option>
                                                <option value="600">600Jt</option>
                                                <option value="700">700Jt</option>
                                                <option value="800">800Jt</option>
                                                <option value="900">900Jt</option>
                                                <option value="1000">1M</option>
                                                <option value="1200">1.2M</option>
                                                <option value="1400">1.4M</option>
                                                <option value="1600">1.6M</option>
                                                <option value="1800">1.8M</option>
                                                <option value="2000">2M</option>
                                                <option value="3000">3M</option>
                                                <option value="4000">4M</option>
                                                <option value="5000">5M</option>
                                                <option value="10000">10M</option>
                                                <option value="20000">20M</option>
                                                <option value="50000">50M</option>
                                                <option value="100000">100M</option>
                                                <option value="500000">500M</option>
                                                <option value="1000000">1T</option>
                                                <option value="10000000">10T</option>
                                                <option value="100000000">100T</option>
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-3 relative items-center flex">
                                <span className="pr-1">Lokasi</span>
                                <span className="text-[#c30000]">*</span>
                            </div>
                            <div className="pt-0 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-full">
                                        <select name="lokasi" className="border mt-0 rounded-lg cursor-pointer">
                                            <option key={0} value={""}>Pilih Kota</option>
                                            {wilayah.kota.map(function(w, i){
                                                return <option key={i+1} value={w.id}>{w.name}</option>
                                            })}
                                        </select>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-3 relative items-center flex">
                                <span className="pr-1">Nama</span>
                                <span className="text-[#c30000]">*</span>
                            </div>
                            <div className="pt-0 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-full">
                                        <input type="text" name="judul" className="bg-white border rounded-lg" placeholder="Tulis Nama"/>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-3 relative items-center flex">
                                <span className="pr-1">Nomor Telepon</span>
                                <span className="text-[#c30000]">*</span>
                            </div>
                            <div className="pt-0 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-full">
                                        <PhoneInput
                                            className=""
                                            defaultCountry="ID"
                                            placeholder="Telepon"
                                             />
                                    </li>
                                </ul>
                            </div>
                            <div class="pt-2 flex items-center">
                                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 ml-[4px] mt-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="link-checkbox" className="ms-3 font-medium text-gray-900 dark:text-gray-300">Saya tertarik untuk KPR.</label>
                            </div>
                        </div>
                    </div>
                        <button className="w-full h-[3rem] btn-primary rounded-lg">Carikan Saya Properti</button>
                </form>
            </div>
        </Modal.Body>
    </Modal>
    <style jsx global>
        {`
            #propertiModal #propertiModal {
                max-width: 520px;
            }
            #propertiModal #propertiModal .relative.rounded-lg{
                margin-top:27.55px;
            }
            #propertiModal #propertiModal .overflow-auto {
                max-height: calc(100vh - 270px);
            }
            @media only screen and (max-width: 767px) {
                #propertiModal #propertiModal .relative.rounded-lg{
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    margin-top: 0px;
                }
                #propertiModal #propertiModal .overflow-auto {
                    max-height: auto;
                }
            }
            .PhoneInputCountry {
                margin-left: 2px;
            }
            .PhoneInputInput {

            }
        `}
    </style>
    </>)
}