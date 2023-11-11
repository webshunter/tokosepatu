"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Toolbar = function () {

    useEffect(() => {

    })

    return(<>
    <div className="px-4 md:px-10">
        <div className="relative flex justify-center items-center h-full md:h-4">
            <div className="absolute bottom-0 md:bottom-20 rounded-lg bg-indigo-950 md:bg-indigo-950/[.9] overflow-hidden shadow-lg relative w-full md:w-[750px]">
                <div className="w-full p-4">
                    <div><p className="mb-2.5 text-white text-[24px] text-center">Jual Beli Properti Jadi Mudah</p></div>
                </div>
                <div className="mb-2">
                    <div id="tablist">
                        <div className="tabs-home flex flex-nowrap h-[33px] overflow-x-auto overflow-y-hidden whitespace-nowrap justify-center">
                            <button role="tab" aria-selected="true" aria-controls="sale" id="sale" tabIndex="0" className="tabs-home__button button--active">Dijual</button>
                            <button role="tab" aria-selected="false" aria-controls="rent" id="rent" tabIndex="1" className="tabs-home__button">Disewa</button>
                            <button role="tab" aria-selected="false" aria-controls="newLaunch" id="newLaunch" tabIndex="2" className="tabs-home__button">Properti Baru</button>
                        </div>
                    </div>
                </div>
                <div className="w-full px-6 pb-10">
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
                                                <input className="h-[24px] border-0 mb-[5px]" type="text" placeholder="Lokasi, keyword, area, project, developer"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="ui-atomic-button px-1 md:px-[50px] bg-yellow-400">
                                    <span className="text-white">Cari</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="px-4 md:px-10 py-4 md:py-5">
        <div className="rounded-lg bg-white overflow-hidden shadow-lg relative pb-4 md:pb-0">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center">
                <div>
                    <Link href="/1" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/carikan-properti.svg" alt="Cari Properti di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Carikan Properti</span>
                    </Link>
                </div>
                <div>
                    <Link href="/2" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/cari-agen.svg" alt="Cari Agen di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Cari Agen</span>
                    </Link>
                </div>
                <div>
                    <Link href="/3" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/simulasi-kpr.svg" alt="Simulasi KPR di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Simulasi KPR</span>
                    </Link>
                </div>
                <div>
                    <Link href="/4" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/pindah-kpr.svg" alt="Pindah KPR di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Pindah KPR</span>
                    </Link>
                </div>
                <div>
                    <Link href="/5" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/iklankan-properti.svg" alt="Iklankan Properti di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Iklankan Properti</span>
                    </Link>
                </div>
                <div>
                    <Link href="/6" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/explore-area.svg" alt="Explore Area di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Explore Area</span>
                    </Link>
                </div>
                <div>
                    <Link href="/7" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/jual-propertimu.svg" alt="Jual Propertimu di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Jual Propertimu</span>
                    </Link>
                </div>
                <div>
                    <Link href="/8" className="flex flex-col gap-3 h-[100px] no-underline items-center px-[8px] py-[16px]">
                        <Image className="relative" src="/toolbar/quick-menu-others-icon.svg" alt="Lainnya di Rumahjo" width={40} height={40} />
                        <span className="font-bold text-center leading-4 text-[12px] md:text-[14px]">Lainnya</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>)
}