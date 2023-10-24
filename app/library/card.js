import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"

export const ProdukCard = function({data}){
    let { key, uniqid, price, judul, image:images, slug} = data
    return (<>
        <div key={key} className="relative bg-gray-200 w-full">
            <button className="p-1 md:p-2 z-10 shadow-md rounded-[50%] inline-block absolute bg-white top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <Link href={"produk/" + slug} className="w-full">
                <div style={{border:'1px solid #aaa'}} className="rounded bg-white overflow-hidden shadow-lg relative">
                    <div className="p-2 flex items-start justify-center h-[100px] md:h-[250px] lg:h-[150px] xl:h-[200px] overflow-hidden">
                        <img className="w-full w-auto block " src={`https://app.rumahjo.com/` + images} alt="Sunset in the mountains"></img>
                    </div>
                    <div className="px-2 bg-yellow-400 mt-2">
                        <div className="bg-white">
                            <div className="px-2 md:px-6 py-2">
                                <div className="font-bold text-[12px] md:text-[1.2rem] mb-2 text-ellipsis truncate ...">{formatRupiah(price)}</div>
                                <p className="text-[13px] text-gray-700 text-base truncate ...">
                                    {judul}
                                </p>
                            </div>
                            <div className="mx-2 md:px-4 py-2 text-[9px]  md:text-[12px]">
                                <p className="inline-block float-right w-[50px] md:w-[80px] text-right">HARI INI</p>
                                <p className="max-w-[calc(100%-50px)] md:max-w-[calc(100%-80px)]  truncate ...">Pasar Minggu, Jakarta Selatan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>)
}