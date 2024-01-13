import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"
import { DateLabel } from "./dateLabel";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import DropdownIlkan from "../component/dropdownIklan";

export const ProdukCard = function ({ data }) {
    const route = useRouter();
    let { key, uniqid, price, judul, image: images, slug, slug2, klik, fav, userlog, approval , laku } = data
    return (<>
        <div key={key} className="relative mb-[12px] bg-white flex-col flex border rounded border-inherit">
            <div className="flex text-[14px]">
                {laku=="0"
                ?
                    approval=="0"
                    ?
                        <span className="bg-amber-500 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                    :
                    approval=="1"
                    ?
                        <span className="bg-blue-600 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                    :
                    approval=='2'
                    ?
                        <span className="bg-red-500 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                    :
                    approval=='3'
                    ?
                        <span className="bg-neutral-400 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                    :
                        <span className="bg-green-700 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                :
                    <span className="bg-green-700 h-full absolute w-[5px]" style={{borderRadius:"4px 0 0 4px"}}></span>
                }
                <div className="block lg:flex w-full">
                    <div className="flex items-center w-full lg:w-[222px] mt-[12px] mb-[16px] ml-[8px] md:ml-[12px]">
                        <div className="flex flex-row w-full ml-[4px]">
                            <span>Dari : <strong className="font-semibold">{ DateLabel(userlog).toUpperCase() }</strong></span>
                        </div>
                    </div>
                    <div className="block md:flex w-full">
                        <div className="pl-[16px] pb-[16px] lg:pb-0 pr-[12px] md:pr-0 flex min-h-[84px] w-full md:w-[405px] lg:w-full">
                            <div className="mr-[12px] flex items-center h-full">
                                <figure className="h-[76px] w-[76px] md:h-[100px] md:w-[100px] lg:h-[123px] lg:w-[123px] rounded border">
                                    <img className="block w-full h-full object-cover" src={`https://app.rumahjo.com/` + images}></img>
                                </figure>
                            </div>
                            <div className="w-full md:w-[375px] relative">
                                <div className="pr-[16px] pt-0 lg:pt-[10px]">
                                    <div className="w-[full] leading-5 flex-col flex">
                                        <span className="font-bold text-ellipsis truncate ...">{judul}</span>
                                        <span className="font-semibold text-ellipsis truncate ...">{slug2}</span>
                                    </div>
                                    <span className="font-bold">{formatRupiah(price)}</span>
                                    <div className="mt-[4px]">
                                        <div className="h-full text-[10px] flex items-center">
                                            <div className="h-[16px] pr-[8px] flex justify-start flex-[0]">
                                                <svg className="pr-[4px] pb-[4px]" width="20px" height="20px" viewBox="0 0 1024 1024" fillRule="evenodd">
                                                    <path d="M704.513 661.64c29.609-37.702 47.362-84.191 47.362-134.622 0-48.419-16.283-93.219-43.764-130.097 85.421 34.203 130.676 81.878 145.81 100.257l0.425 51.617c-14.943 19.685-63.092 75.565-149.833 112.844v0zM169.462 547.167v-47.092c18.030-18.801 67.796-65.41 143.788-99.915-26.011 36.214-41.21 79.888-41.21 126.86 0 47.314 15.475 91.268 41.828 127.644-84.25-37.521-129.952-88.976-144.405-107.496v0zM511.957 673.222c-85.358 0-154.772-65.592-154.772-146.203 0-80.632 69.415-146.203 154.772-146.203 85.336 0 154.772 65.571 154.772 146.203 0 80.612-69.435 146.203-154.772 146.203v0zM938.852 474.095l-4.917-8.706c-1.001-1.81-114.924-179.763-420.68-186.539-270.739-5.791-420.85 182.96-422.148 184.87l-6.791 9.933v93.823l3.384 7.541c0.894 1.97 118.543 196.312 424.532 202.545 4.279 0.081 8.493 0.12 12.708 0.12 286.066 0 409.461-197.74 410.505-199.79l4.236-8.385-0.83-95.411z"></path>
                                                </svg>
                                                <span className="font-bold pr-[8px] text-ellipsis truncate ...">Dilihat : {klik}</span>
                                            </div>
                                            <div className="h-[16px] pr-[8px] flex justify-start flex-[0]">
                                                <svg className="pr-[4px] pb-[4px]" width="20px" height="20px" viewBox="0 0 1024 1024" fillRule="evenodd">
                                                    <path d="M705.941 124.121c-80.853 0-152.204 41.445-193.939 104.204-41.736-62.759-113.086-104.204-193.939-104.204-128.33 0-232.727 104.398-232.727 232.727 0 50.657 16.194 98.967 47.806 140.916l328.766 402.114h100.189l329.716-403.355c30.662-40.708 46.856-89.018 46.856-139.675 0-128.33-104.398-232.727-232.727-232.727z"></path>
                                                </svg>
                                                <span className="font-bold pr-[8px] text-ellipsis truncate ...">Disukai : {fav}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pl-[16px] md:pl-0 pr-[12px] md:pr-4 flex flex-col min-h-[100px] w-full md:w-full lg:w-[120px] border-t md:border-0 border-inherit">
                            <div className="pt-[12px] md:pt-0 lg:pt-[14px] pb-0 md:pb-[12px] pr-[16px] md:pr-0 text-start md:text-right">
                            {laku=="0"
                            ?
                                approval=="0"
                                ?
                                    <label className="bg-amber-500 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Tertunda</label>
                                :
                                approval=="1"
                                ?
                                    <label className="bg-blue-600 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Tayang</label>
                                :
                                approval=="2"
                                ?
                                    <label className="bg-red-500 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Ditolak</label>
                                :
                                approval=="3"
                                ?
                                    <label className="bg-neutral-400 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Non Aktif</label>
                                :
                                    <label className="bg-green-700 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Laku</label>

                            :
                                <label className="bg-green-700 text-white font-semibold rounded-[4px] w-fit min-w-[88px] h-[25px] px-[4px] py-2 inline-flex flex-col justify-center text-center">Laku</label>
                            }
                            </div>
                            {laku=='0'
                            ?
                            <div className="flex self-end mt-[8px] md:mt-[12px] pb-4 md:pb-0 gap-4">
                                <DropdownIlkan data={[uniqid, approval, laku]} />
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}