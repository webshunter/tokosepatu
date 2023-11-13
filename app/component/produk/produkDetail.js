"use client"
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/app/library/rupiah";
import Map from 'react-map-gl';
import { dataWilayah } from "@/app/library/loadJson";
import { DateLabel } from "@/app/library/dateLabel";
import useSWR, { SWRConfig } from 'swr'
import { useOutsideClick } from "@/app/library/outclick";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iframe from "react-iframe";
import StickyButton from "@/app/component/sticky";

const wilayah = dataWilayah();

String.prototype.capitalize = function () {
    // Memeriksa apakah string kosong
    if (this.length === 0) {
        return this;
    }

    // Memecah string menjadi array kata
    const words = this.split(' ');

    // Mengkapitalisasi setiap kata
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    // Menggabungkan kata-kata yang sudah di-kapitalisasi
    return capitalizedWords.join(' ');
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ProdukDetail(props) {
    const [visible, setVisible] = useState()
    const ref = useOutsideClick(() => {
        setVisible(null)
    });
    const [arrImage, SetArrImage] = useState([]);
    const [data, SetData] = useState({});
    const [youtube, setYoutube] = useState(null);
    const [maps, setMaps] = useState(null);
    // [latitude,longitude]
    let log = new Date().toString();

    useEffect(() => {

        function ambilIdVideo(url) {
            var splitUrl = url.split("v=");
            if (splitUrl.length > 1) {
                var videoId = splitUrl[1];
                var ampersandPosition = videoId.indexOf('&');
                if (ampersandPosition !== -1) {
                    videoId = videoId.substring(0, ampersandPosition);
                }
                return videoId;
            } else {
                return "";
            }
        }

        function ambilIdDariYouTubeShort(url) {
            var idShort = null;
            var shortPattern = /\/shorts\/([a-zA-Z0-9_-]{11})/;
            var match = url.match(shortPattern);
            if (match !== null) {
                idShort = match[1];
            }
            return idShort;
        }

        function ambilKodeYouTube(link) {
            var kode = '';
            var url = new URL(link);
            if (url.hostname === 'youtu.be') {
                kode = url.pathname.slice(1);
                if (kode.includes('?')) {
                    kode = kode.substring(0, kode.indexOf('?'));
                }
            } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                if (url.search) {
                    var params = new URLSearchParams(url.search);
                    kode = params.get('v');
                } else {
                    kode = url.pathname.slice(1);
                    if (kode === 'watch') {
                        kode = url.searchParams.get('v');
                    }
                }
            }
            return kode;
        }

        const loadData = async function () {
            const produk = props.data;
                let dataArray;
                if(produk.length > 0){
                    dataArray = produk[0];
                }
                SetArrImage(produk);
                SetData(dataArray);
                let detectYoutube = dataArray.deskrisi.split(" ");
                detectYoutube.forEach(function (x) {
                    if (x.indexOf('youtube.com') != -1 && x.indexOf('youtube.com/shorts/') != -1) {
                        setYoutube(ambilIdDariYouTubeShort(x));
                    } else if (x.indexOf('youtube.com') != -1 || x.indexOf('youtu.be') != -1) {
                        if (ambilIdVideo(x) != '') {
                            setYoutube(ambilIdVideo(x));
                        } else {
                            setYoutube(ambilKodeYouTube(x));
                        }
                    }
                });
                const lat = (wilayah.getKecamatan(dataArray.kec) === null ? "" : wilayah.getKecamatan(dataArray.kec).lat);
                const long = (wilayah.getKecamatan(dataArray.kec) === null ? "" : wilayah.getKecamatan(dataArray.kec).long);
                const mapsRender = [lat, long];
                setMaps(mapsRender.join(","))
        }
        loadData();
    }, [setYoutube, props]);

    const kec = (wilayah.getKecamatan(data.kec) === null ? "" : wilayah.getKecamatan(data.kec).nama);
    const kota = (wilayah.getKota(data.kota) === null ? "" : wilayah.getKota(data.kota).nama);
    const prov = (wilayah.getProvinsi(data.prov) === null ? "" : wilayah.getProvinsi(data.prov).nama);
    log = data.userlog;
    return (<>
        <div className="flex justify-center items-center fixed w-[100vw] h-[100vh] top-0 left-0 z-[1500]" style={{ visibility: visible ? 'visible' : 'hidden', background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="absolute rounded bg-white z-[9] cursor-pointer top-[40px] right-[40px]">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="2em"
                    width="2em"
                >
                    <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
                </svg>
            </div>
            <div ref={ref} className="w-[100vw] h-[100vh] bg-white shadow-lg rounded">
                <Carousel className="h-[100%] bg-black">
                    {arrImage.map((s, i) => {
                        return (
                            <li key={i}>
                                <div className="flex justify-center items-center ">
                                    <img
                                        className="h-[100%]"
                                        alt="..."
                                        src={'https://app.rumahjo.com/' + s.image}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </Carousel>
            </div>
        </div>
        <div className="grid-content md:mx-[50px] gap-2 md:gap-[50px] mt-5">
            <div className="bg-white shadow-md md:mb-2 md:p-5 rounded-xm">
                <label className="align-items-center px-[12px] flex text-black bg-yellow-300 text-[12px] mt-[24px] width-[96px]" style={{ fontWeight: "400", height: "20px", justifyContent: "center", position: "absolute", textTransform: "uppercase", zIndex: "2", letterSpacing: ".5504px" }}>
                    <img className="my-[2px] mr-[8px] width-[6px]" src="https://statics.olx.co.id/external/base/img/featured.png" alt="Featured" />
                    <span>Highlight</span>
                </label>
                <Carousel onClick={(index) => {
                    if (index.target.tagName == "IMG") {
                        let indexKey = index.target.dataset.key;
                        setVisible(index);
                    }
                }} className="h-[50vh] bg-black">
                    {arrImage.map((s, i) => {
                        return (
                            <li className="image-click"
                                key={i}>
                                <div className="flex justify-center items-center ">
                                    <img
                                        data-key={i}
                                        className="h-[50vh]"
                                        alt="..."
                                        src={'https://app.rumahjo.com/' + s.image}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </Carousel>
                <section className="mb-[8px] px-5 md:px-0">
                    <div className="py-[16px]">
                        <h3 className="text-[20px] font-bold text-gray-800">Detail</h3>
                        <div className="relative my-[16px]">
                            <div className="flex w-[100%] flex-wrap justify-between">
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Tipe</span>
                                        <span className="basis-[50%] text-left text-gray-800">{(data.type === '1' ? 'Rumah' : 'Apartemen')}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Luas Bangunan</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.lbangun}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Luas Tanah</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.ltanah}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Kamar Tidur</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.ktidur}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Kamar Mandi</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.kmandi}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Hadap</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.hadap ? data.hadap : "-"}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Lantai</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.lantai}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <div className="basis-[50%] md:basis-[25%]">
                                            <span className="text-gray-500">Fasilitas</span>
                                        </div>
                                        <div className="flex basis-[50%] md:basis-[75%] flex-wrap" note="loop dari kolom facility atau tabel facility">

                                            {data.facility ? data.facility.split(',').map((d, i) => {
                                                return <span key={i} className="basis-[100%] md:basis-[33.33333%] text-left text-gray-800">{d}</span>
                                            }) : ""}

                                        </div>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Sertifikasi</span>
                                        <span className="basis-[50%] text-left text-gray-800">{(data.cert === 1 ? 'SHM - Sertifikat Hak Milik' : (data.cert === 2 ? 'HGB - Hak Guna Bangun' : 'Lainnya (PPJB, Girik, Adat, dll)'))}</span>
                                    </div>
                                </div>
                                <div className="basis-[100%] md:basis-[50%]">
                                    <div className="flex mb-[8px] w-[100%] justify-between">
                                        <span className="max-w-[50%] text-gray-500">Alamat Lokasi</span>
                                        <span className="basis-[50%] text-left text-gray-800">{data.alamat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-[20px] font-bold text-gray-800 pt-[20px] border-t border-gray-400">Deskripsi</h3>
                        {
                            youtube ?
                                <iframe width="420" height="345" src={`https://www.youtube.com/embed/` + youtube}>
                                </iframe>
                                : <></>
                        }
                        <div className="my-[16px] font-normal not-italic text-[14px] leading-[20px] text-gray-800" style={{ fontStretch: "normal", whiteSpace: "pre-line" }}>
                            {data.deskrisi}
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <div className=" rounded-sm md:rounded-md shadow-xl bg-white w-full  md-w-[400px] px-5 py-3 ">
                    <div className="flex mb-[4px]" style={{ alignItems: "center", justifyContent: "space-between" }}>
                        <span className="flex text-[20px] md:text-[2rem] font-bold">{data.price != undefined ? formatRupiah(data.price) : "Rp 0"}</span>
                        <div className="flex">
                            <button className="inline-flex w-[40px] h-[40px]" style={{ borderRadius: "50%", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <svg className="w-[24px] h-[24px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg>
                            </button>
                            <button className="inline-flex w-[40px] h-[40px]" style={{ borderRadius: "50%", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <svg className="w-[24px] h-[24px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <span className="hidden md:block text-gray-800">{data.ktidur} KT - {data.kmandi} KM - {data.lbangun} m2</span>
                    <h1 className="block text-[14px] text-gray-500" style={{ fontWeight: "400", margin: "0 0 16px", lineHeight: "24px" }}>{data.judul != undefined ? data.judul.capitalize() : data.judul}</h1>
                    <div className="flex md:border-t-0 border-t border-gray-400 pt-[8px]" style={{ alignItems: "center", justifyContent: "space-between" }}>
                        <div className="text-[12px]">
                            <span className="text-ellipsis overflow-hidden text-gray-600 capitalize">{(kec == "" ? "" : kec.toLowerCase() + ", ") + (kota == "" ? "" : kota.toLowerCase() + ", ") + (prov == "" ? "" : prov.toLowerCase())}</span>
                        </div>
                        <div className="text-right min-w-[70px] text-[12px]">
                            <span className="text-gray-600">
                                {DateLabel(log)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-2 md:mt-5 rounded-sm  md:rounded-md shadow-xl bg-white w-full  md-w-[400px] px-5 py-3 ">
                    <div className="flex flex-col">
                        <div className="flex max-w-[100%] items-center">
                            <a href={"/profile/" + data.uid_user} className="relative">
                                <figure className="relative overflow-hidden w-[70px] h-[70px] bg-[50%] bg-cover rounded-full m-0 bg-[url('https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg')]"></figure>
                            </a>
                            <div className="relative font-normal not-italic text-[14px] leading-[20px] basis-[100%] overflow-hidden">
                                <a href={"/profile/" + data.uid_user}>
                                    <div className="font-bold text-[20px] overflow-hidden whitespace-nowrap text-ellipsis text-gray-800 h-[25px]">{data.fullname}</div>
                                    <span className="absolute top-[50%] right-0" style={{ transform: "translateY(-50%)" }}>
                                        <svg className="w-[18px] h-[18px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="p-2 mt-3 mb-2 text-center w-full" style={{ borderRadius: '8px', border: "2px solid #333" }}>Chat Dengan Penjual</button>
                    </div>
                    <div className="flex h-[16px] leading-[18px] text-gray-800 text-[12px] justify-center items-center py-[28px]">
                        <span className="mx-[8px]">
                            <svg className="w-[26px] h-[26px]" viewBox="0 0 1024 1024" fillRule="evenodd"><path d="M784.555 852.395c-331.435-14.635-598.315-281.515-612.949-612.949l149.973-59.989 91.691 183.424-70.997 35.499v26.453c0 141.653 115.243 256.896 256.896 256.896h26.453l11.861-23.637 23.68-47.36 183.381 91.733-59.989 149.931zM918.101 643.456l-256.939-128.469-57.472 19.2-30.037 60.032c-74.069-11.093-132.736-69.803-143.872-143.872l60.075-30.037 19.157-57.429-128.427-256.939-54.187-20.608-214.187 85.632-26.88 39.808c0 401.365 326.571 727.893 727.936 727.893l39.765-26.88 85.632-214.187-20.608-54.187z"></path></svg>
                        </span>
                        <div>** *** ****</div>
                        <button className="mx-[8px] cursor-pointer" style={{ color: "#6c99ff", textDecoration: "underline" }}>Tampilkan nomor</button>
                    </div>
                </div>
                <div className="mt-2 md:mt-5 rounded-sm  md:rounded-md shadow-xl bg-white w-full md-w-[400px] px-5 py-3 ">
                    <div className="leading-[20px]">
                        <h3 className="text-[20px] font-bold text-gray-800 mb-[20px]">Lokasi Iklan</h3>
                    </div>
                    <div>
                        {/* <iframe 
                            src={`https://www.google.com/maps?q=${maps}&hl=es;z%3D14&amp&output=embed`} style={{width:"100%", height:"250px", border:0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                            </iframe> */}
                        {
                            maps ?
                                <Iframe url={`https://www.google.com/maps?q=${maps}&hl=es;z%3D14&amp&output=embed`}
                                    width="100%"
                                    height="320px"
                                    id=""
                                    className=""
                                    display="block"
                                    position="relative" />
                                : <></>
                        }
                    </div>
                </div>
                <div className="relative w-[100%] shadow-xl md:shadow-none bg-white md:bg-transparent overflow-hidden border-t border-gray-400 md:border-0 rounded-[4px]">
                    <div className="p-[20px] md:px-0">
                        <div>
                            <div className="flex justify-between items-center text-[14px]">
                                <strong>ID IKLAN {data.uniqid ? data.uniqid.split('-')[1] : ""}</strong>
                                <strong>LAPORKAN IKLAN INI</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-content md:mx-[50px] gap-2 md:gap-[50px] mt-5">
            <div className="bg-white shadow-md md:mb-2 md:p-5 rounded-xm">
                <div className="pb-[16px]">
                    <h3 className="text-[20px] font-bold text-gray-800">Iklan Terkait</h3>
                </div>
            </div>
        </div>
        <StickyButton />
    </>)
}