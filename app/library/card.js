import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"
import { dataWilayah } from "@/app/library/loadJson";
import { DateLabel } from "@/app/library/dateLabel";

const wilayah = dataWilayah();

export const ProdukCard = function({data, type}){
    let { hightlight, key, uniqid, price, judul, image:images, slug, kec, kota, userlog, klik, laku, tgllaku } = data
    const dataKecamatan = wilayah.getKecamatan(kec);
    const dataKota = wilayah.getKota(kota);
    return (<>
        <div key={key} className="relative bg-gray-200 w-full">
            {/* <button className="p-1 md:p-2 z-10 shadow-md rounded-[50%] inline-block absolute bg-white top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button> */}
            {type=='premium'?
            <div>
                <div className="absolute z-10 left-1 md:left-2 top-1 md:top-2">
                    <img className="w-[27.5px] md:w-[40px]" src="/3.png" style={{filter:"drop-shadow(2px 4px 8px hsla(0deg, 0%, 0%, 0.5))"}} />
                </div>
                <label className="hidden align-items-center px-[12px] flex items-center text-[#d50000] font-semibold bg-amber-500 text-[12px] mt-[18px] width-[96px]" style={{ height: "20px", justifyContent: "center", position: "absolute", textTransform: "uppercase", zIndex: "2", letterSpacing: ".5504px" }}>
                    <div className="premium my-[2px] mr-[8px] inline-block w-[12px] h-[12px] bg-[#d50000]"></div>
                    <span className="text-[12px] md:text-[14px]">Premium</span>
                </label>
            </div>
            :
            type=='populer'?
            <div>
                <div className="absolute z-10 left-1 md:left-2 top-1 md:top-2">
                    <img className="w-[27.5px] md:w-[40px]" src="/2.png" style={{filter:"drop-shadow(2px 4px 8px hsla(0deg, 0%, 0%, 0.5))"}} />
                </div>
                <label className="hidden align-items-center px-[12px] flex items-center text-[#fff] font-semibold bg-[#34a853] text-[12px] mt-[18px] width-[96px]" style={{ height: "20px", justifyContent: "center", position: "absolute", textTransform: "uppercase", zIndex: "2", letterSpacing: ".5504px" }}>
                    <div className="my-[2px] mr-[8px] inline-block w-[12px] h-[12px] popular bg-[#fff]"></div>
                    <span className="text-[12px] md:text-[14px]">Populer</span>
                </label>
            </div>
            :
            ''
            }
            <Link href={"/produk/" + slug} className="w-full">
                <div style={{border:'1px solid #aaa'}} className="rounded bg-white overflow-hidden shadow-lg relative">
                    <figure className="hidden p-2 overflow-hidden relative box-border bg-inherit h-[160px]">
                        <img className="max-h-full block m-auto w-full object-cover" src={`https://app.rumahjo.com/` + images}></img>
                    </figure>
                    <div style={{ backgroundSize:'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat', backgroundColor:'black', backgroundImage: `url("https://app.rumahjo.com/${images}")` }} className="p-2 relative flex items-center  justify-center h-[111px] md:h-[250px] lg:h-[150px] xl:h-[200px] overflow-hidden">
                        <label style={{fontWeight:'bold', color:`rgba(255,255,255,0.5)`, textShadow:`0 0 5px rgba(0,0,0,0.5)`}} className="text-2xl absolute">RUMAHJO</label>
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
                    {laku=='1'
                    ?
                    <>
                        <div className="absolute w-[75%] flex items-center justify-center capitalize" style={{top:'45%',left:'50%',transform:'translate(-50%,-50%)'}}>
                            <div className="flex flex-col justify-center items-center w-[100%] border-[3px] border-green-700 rounded-xl text-green-700 text-[20px]" style={{transform:"rotate(-15deg) translateY(15px)",opacity:"0.8",backgroundColor:'rgba(255,255,255,.8)'}}>
                                <div className="text-[120%] font-bold">SOLD!</div>
                                <div className="h-[2px] w-[98%] bg-green-700"></div>
                                <div className="text-[75%]">{DateLabel(tgllaku).toUpperCase()}</div>
                                <div className="h-[2px] w-[98%] bg-green-700"></div>
                                <div className="text-[100%] font-bold text-[#c30000]">RUMAHJO.COM</div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
                    }
                </div>
            </Link>
        </div>
    </>)
}