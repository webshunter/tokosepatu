import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { dataWilayah } from "@/app/library/loadJson";
import { DateLabel } from "@/app/library/dateLabel";

const wilayah = dataWilayah();

export const ProdukCard = function ({ data }) {
    let { key, uniqid, price, judul, image: images, slug, kec, kota, kmandi, ktidur, lbangun, userlog, klik } = data
    const dataKecamatan = wilayah.getKecamatan(kec);
    const dataKota = wilayah.getKota(kota);
    return (<>
        <div key={key} className="relative bg-gray-200 w-full">
            <button className="p-1 md:p-2 z-10 md:shadow-md md:rounded-[50%] inline-block absolute bg-transparent md:bg-white top-1 md:top-4 right-1 md:right-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <Link href={"/produk/" + slug} className="w-full">
                <div style={{ border: '1px solid #aaa' }} className="flex md:block rounded bg-white overflow-hidden shadow-lg relative">
                    <div className="h-[130px] min-w-[130px] max-w-[130px] md:min-w-full md:max-w-full md:w-full md:p-2 flex items-start justify-center h-[100px] md:h-[180px] lg:h-[150px] xl:h-[140px] overflow-hidden">
                        <img className="w-full w-auto block " src={`https://app.rumahjo.com/` + images} alt="Sunset in the mountains"></img>
                    </div>
                    <div className="w-[calc(100%-120px)] md:w-auto px-auto">
                        <div className="bg-white">
                            <div className="px-2 md:px-6 md:py-2">
                                <div className="font-bold text-[20px] md:text-[1.2rem] mb-1 text-ellipsis truncate ...">{formatRupiah(price)}</div>
                                <p className="text-[14px] text-gray-700 md:text-base truncate ...">
                                    {judul}
                                </p>
                                <div className="flex md:hidden">
                                    <div className="pr-4">
                                        <FontAwesomeIcon
                                            icon={faBath}
                                            style={{ fontSize: 14, color: "#333f48" }}
                                        />
                                        <span className="pl-2">{kmandi}</span>
                                    </div>
                                    <div className="pr-4">
                                        <FontAwesomeIcon
                                            icon={faBed}
                                            style={{ fontSize: 14, color: "#333f48" }}
                                        />
                                        <span className="pl-2">{ktidur}</span>
                                    </div>
                                    <div className="pr-4">
                                        <FontAwesomeIcon
                                            icon={faHouse}
                                            style={{ fontSize: 14, color: "#333f48" }}
                                        />
                                        <span className="pl-2">{lbangun} m²</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-2 md:px-4 py-1 text-[9px]  md:text-[12px]">
                                <p className="max-w-full truncate ...">{(kec==""?"":dataKecamatan.nama+", ")+(kota==""?"":dataKota.nama)}</p>
                            </div>
                            <div className="flex justify-between px-2 md:px-[14px] py-1 mr-2 md:mr-0 text-[9px]  md:text-[12px]">
                                <p className="block text-[12px] inline-block">{ DateLabel(userlog).toUpperCase() }</p>
                                <p className="block text-[12px] inline-block float-right text-right">{klik} Views</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </>)
}