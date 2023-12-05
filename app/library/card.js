import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"
import { dataWilayah } from "@/app/library/loadJson";
import { DateLabel } from "@/app/library/dateLabel";

const wilayah = dataWilayah();

export const ProdukCard = function({data, type}){
    let { hightlight, key, uniqid, price, judul, image:images, slug, kec, kota, userlog, klik } = data
    const dataKecamatan = wilayah.getKecamatan(kec);
    const dataKota = wilayah.getKota(kota);
    return (<>
        <div key={key} className="relative bg-gray-200 w-full">
            <button className="p-1 md:p-2 z-10 shadow-md rounded-[50%] inline-block absolute bg-white top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            {type=='premium'?
            <label className="align-items-center px-[12px] flex items-center text-black bg-yellow-300 text-[12px] mt-[18px] width-[96px]" style={{ fontWeight: "400", height: "20px", justifyContent: "center", position: "absolute", textTransform: "uppercase", zIndex: "2", letterSpacing: ".5504px" }}>
                <img className="my-[2px] mr-[8px] inline-block w-[12px] h-[12px]" src="/premium.png" alt="Premium" />
                <span className="text-[12px] md:text-[14px]">Premium</span>
            </label>
            :
            type=='populer'?
            <label className="align-items-center px-[12px] flex items-center text-black bg-sky-300 text-[12px] mt-[18px] width-[96px]" style={{ fontWeight: "400", height: "20px", justifyContent: "center", position: "absolute", textTransform: "uppercase", zIndex: "2", letterSpacing: ".5504px" }}>
                <img className="my-[2px] mr-[8px] inline-block w-[12px] h-[12px]" src="/popular.png" alt="Populer" />
                <span className="text-[12px] md:text-[14px]">Populer</span>
            </label>
            :
            ''
            }
            <Link href={"/produk/" + slug} className="w-full">
                <div style={{border:'1px solid #aaa'}} className="rounded bg-white overflow-hidden shadow-lg relative">
                    <figure className="hidden p-2 overflow-hidden relative box-border bg-inherit h-[160px]">
                        <img className="max-h-full block m-auto w-full object-cover" src={`https://app.rumahjo.com/` + images}></img>
                    </figure>
                    <div style={{ backgroundSize:'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat', backgroundColor:'black', backgroundImage: `url("https://app.rumahjo.com/${images}")` }} className="p-2 relative flex items-center  justify-center h-[111px] md:h-[250px] lg:h-[150px] xl:h-[200px] overflow-hidden">
                        <label style={{fontWeight:'bold', color:`rgba(255,255,255,0.5)`, boxShadow:`0 0 5px rgba(0,0,0,0.5)`}} className="text-2xl absolute">RUMAHJO</label>
                    </div>
                    <div className="bg-yellow-400 mt-2">
                        <div className="bg-white">
                            <div className="px-2 md:px-[14px] py-2">
                                <div className="font-bold text-[12px] md:text-[1.2rem] mb-2 text-ellipsis truncate ...">{formatRupiah(price)}</div>
                                <p className="text-[13px] text-gray-700 text-base truncate ...">
                                    {judul}
                                </p>
                            </div>
                            <p className="text-[10px] px-2 md:px-[14px] max-w-full truncate ...">{(kec==""?"":dataKecamatan.nama+", ")+(kota==""?"":dataKota.nama)}</p>
                            <div className="flex justify-between px-2 md:px-[14px] py-2 text-[9px]  md:text-[12px]">
                                <p className="block text-[10px] inline-block">{ DateLabel(userlog).toUpperCase() }</p>
                                <p className="block text-[10px] inline-block float-right text-right">{klik} Views</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>)
}