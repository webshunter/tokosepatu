import Image from "next/image"
import Link from "next/link"

export const ProdukCard = function(){
    return (<>
        <div className="relative bg=gray-200 w-full">
            <button class="p-1 md:p-2 z-10 shadow-md rounded-md inline-block absolute bg-white top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <Link href="produk/rumah-indah-permai-malang" className="w-full">
                <div className="rounded overflow-hidden shadow-lg relative">
                    <img className="w-full" src="https://img.iproperty.com.my/angel-legacy/1110x624-crop/static/2020/12/1.-Desain-Rumah-Minimalis-dengan-Atap-Pelana.jpg" alt="Sunset in the mountains"></img>
                    <div className="px-2 bg-yellow-400 mt-2">
                        <div className="bg-white">
                            <div className="px-2 md:px-6 py-2">
                                <div className="font-bold text-[12px] md:text-[1.2rem] mb-2 text-ellipsis truncate ...">Rp 200.000.000</div>
                                <p className="text-[13px] text-gray-700 text-base truncate ...">
                                    Dijual rumah kpr murah di dusun gldakan...
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