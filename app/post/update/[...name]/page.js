"use client"
import { useEffect, useState } from 'react';
import upload from '@/app/library/upload';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faBuilding} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormPost, dataStatus } from './form';
import { ImageUpload } from "@/app/component/ImageUploadMass";
import { dataWilayah } from "@/app/library/loadJson";
import { Helper } from '@/app/library/prototype';
import ValidasiLogin from '@/app/component/loginvalidasi';
import useSWR, { SWRConfig } from 'swr'

Helper();
const wilayah = dataWilayah();
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function logTimestamp() {
    const now = new Date();

    // Get the components of the date
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Create the timestamp string
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Log the timestamp
    return timestamp;
}

export default function PostListing({params}) {
    const [uniqid] = params.name;
    const { data: Listing } = useSWR(`/pages/api/produk?order=uniqid&ascdesc=DESC&limit=8&start=0&uniqid=${uniqid}`, fetcher)
    const route = useRouter();
    const [price, setPrice] = useState("");

    const [visible, setVisible] = useState("");
    const [kota, setKota] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [properti, setProperti] = useState("Dijual: Rumah & Apartement")
    
    const [hideTanah, setHideTanah] = useState(null)
    
    const [nilaiProperti, setNilaiProperty] = useState(null)

    const provinsiChange = function(event){
        let getVal = event.target.value;
        let DataKota = wilayah.getGroupKota(getVal);
        setKota(DataKota);
    }

    const kotaChange = function(event){
        let getVal = event.target.value;
        let dataKecamatan = wilayah.getGroupKecamatan(getVal);
        setKecamatan(dataKecamatan);
    }

    const data = [
        {
            id: "01",
            text: "Dijual: Rumah & Apartement",
            status: 1,
            form: 'rumah'
        }
        ,{
            id: "02",
            text: "Disewakan: Rumah & Apartement",
            status: 2,
            form:'rumah'
        }
        ,{
            id: "03",
            text: "Tanah",
            status:'-',
            form:'tanah'
        }
        ,{
            id: "04",
            text: "Indekos",
            status:0,
            form: 'indekos'
        }
        ,{
            id: "05",
            text: "Dijual: Bangunan Komersil",
            status:1,
            form:'bangunan'
        }
        ,{
            id: "07",
            text: "Disewakan: Bangunan Komersil",
            status:2,
            form:'bangunan'
        }
    ]

    function _id(id) {
        return document.getElementById(id);
    }

    const propertiChange = function(kode, data){
        if(data){
            let cek = dataStatus.cond(data.status, 'val');
            if(cek.length > 0){
                let {text} = cek[0];
                let dataHidden = Array.from(document.querySelectorAll('div[data-hidden]'));
                dataHidden.forEach((c)=>{
                    c.style.display = 'none';
                })
                if (document.getElementById(text)){
                    document.getElementById(text).click();
                }
            }else{
                let dataHidden = Array.from(document.querySelectorAll('div[data-hidden]'));
                dataHidden.forEach((c)=>{
                    c.style.display = 'block';
                })
            }
            setProperti(data.nilai)
            hiddenForm(data)
        }
    }

    const hiddenForm = function(v){
        if(v.nilai.toLowerCase().indexOf('rumah') == -1){
            setHideTanah(1)
        }else{
            setHideTanah(null)
        };
        Array.from(document.querySelectorAll('div[data-shows]'))
        .forEach((dom)=>{
            dom.dataset.shows.indexOf(v.form) != -1 ? dom.style.display = 'block' : dom.style.display = 'none';
        })
        v.nilai.toLowerCase()
    }

    function validasiProperty(v){
        const formid = document.getElementById("formid");
        const formData = new FormData(formid);
        const formProps = Object.fromEntries(formData);
        let fileds = ["lbangun","ltanah", "ktidur", "kmandi" ,"hadap", "judul", "deskrisi"];
        if(formProps.slug2.toLowerCase().indexOf("tanah") != -1){
            fileds = ["ltanah", "judul", "deskrisi"];
        }
        if(formProps.slug2.toLowerCase().indexOf("bangunan") != -1){
            fileds = ["lbangun", "judul", "hadap", "deskrisi"];
        }
        if(formProps.slug2.toLowerCase().indexOf("indekos") != -1){
            fileds = ["lbangun", "kmandi", "judul", "deskrisi"];
        }
        let cek = 0;
        fileds.forEach((data)=>{
            if(formProps[data] == ""){
                cek++;
            }
        });
        if(cek > 0){
            backFunc(3);
            Array.from(document.querySelectorAll(".info-danger"))
            .forEach((h)=>{
                h.style.display = 'block';
            })
        }else{
            Array.from(document.querySelectorAll(".info-danger"))
            .forEach((h)=>{
                h.style.display = 'none';
            })
        };
    }

    function backFunc(a = 1, b = 6, nilai){
        let activeBefore = a;
        for (let v = 1; v <= b; v++) {
            if(v == 2){
                propertiChange(v, nilai)
            }
            if(a == v){
                if (_id('kategori' + v)){
                    _id('kategori' + v).style.display = 'block';
                }
            }else{
                if (_id('kategori' + v)){
                    _id('kategori' + v).style.display = 'none';
                }
            }
        }
        if(activeBefore == 4){
            validasiProperty(3)
        }
    }

    useEffect(()=>{
        if (Listing){
            const [dataListing] = Listing.message;
            if(dataListing){
                let prov = dataListing.prov;
                let kota = dataListing.kota;
                let kec = dataListing.kec;

                const dprovinsiChange = function (val) {
                    let getVal = val;
                    let DataKota = wilayah.getGroupKota(getVal);
                    setKota(DataKota);
                }

                const dkotaChange = function (val) {
                    let getVal = val;
                    let dataKecamatan = wilayah.getGroupKecamatan(getVal);
                    setKecamatan(dataKecamatan);
                }

                if(document.querySelector('select[name="prov"]')){
                    let nProv = document.querySelector('select[name="prov"]');
                    let nKota = document.querySelector('select[name="kota"]');
                    let nKec = document.querySelector('select[name="kec"]');
                    dprovinsiChange(prov)
                    dkotaChange(kota)
                    nProv.value = prov; 
                    setTimeout(function(){
                        nKota.value = kota; 
                        nKec.value = kec; 
                    },1000)
                }

                setPrice(dataListing.price ? dataListing.price:0);
                let getType = dataListing.slug2;
                let getData = data.filter(function (r) {
                    if (r.text == getType) {
                        return r;
                    }
                })
                .map(function (r) {
                    return {
                        form: r.form,
                        nilai: r.text,
                        status: r.status
                    }
                });
        
                let newProperty = getData.length > 0 ? getData[0] : null;
                backFunc(3, 6, newProperty)

            }

        }
    }, [Listing]);

    const summerChange = function(){

    }

    const simpanData = async function(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const image = Array.from(e.target.querySelectorAll('img'))
        let dataImage = [];
        if (formProps.judul === ""){
            alert("judul tidak boleh kosong");
        } 
        if (formProps.judul === ""){
            alert("judul tidak boleh kosong");
        } 
        image.map(function(w){
            dataImage.push({
                data: w.src,
                nama: w.alt
            });
        })
        
        let di = [];
        
        formProps.price = formProps.price.number();
        formProps.galery = dataImage;
        formProps.facility = Array.from(document.querySelectorAll('input[name="facility"]')).map((r) => {
            return r.checked ? r.value : null;
        }).filter((r) => {
            if (r != null) {
                return r;
            }
        }).join(",");

        const ori = function () {
            let ori = location.host;
            if (ori == 'localhost:3000') {
                return 'https://api-jo.indowebs.my.id/';
            }
            if (ori == 'rumahjo.vercel.app') {
                return 'https://api-jo.indowebs.my.id/';
            }
            if (ori == 'rumahjo.com') {
                return 'https://app.rumahjo.com';
            }
            return '';
        }

        let dfacility = [];
        Array.from(e.target.querySelectorAll('[name="facility"]'))
        .forEach(function(o){
            if(o.checked){
                dfacility.push(o.value);
            }
        })

        if(Listing.message){
            let [dataListing] = Listing.message.length > 0 ? Listing.message : [];
            formProps.uniqid = dataListing.uniqid;
            formProps.update = true;
            formProps.userlog = logTimestamp();
            formProps.approval = 0;
        }

        let b64Data = btoa(JSON.stringify(formProps));

        // validasi
        let fileds = ["prov", "kota", "kec"];
        let cek = 0;
        fileds.forEach((data) => {
            if (formProps[data] == "") {
                cek++;
            }
        });

        if (cek > 0) {
            alert("Pastikan lokasi sudah terisi dengan benar");
            throw "stop upload";            
        }

        setVisible(!visible);
        upload(ori() + '/data/simpan/posting', '', 'qr.data', b64Data, (a) => { }, (b) => {
            setVisible(visible);
            window.history.back()
        });
    }
    if(!Listing){
        return <>
            <div className='px-[50px] pt-[50px] h-screen'>
                <div className="loader">Rumahjo
                    <span></span>
                </div>
            </div>
        </>
    } else{
        const [listingData] = Listing.message; 
        return (
            <ValidasiLogin>
                <form id="formid" onSubmit={simpanData} className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500">
                    <h1 className="text-2xl font-bold dark:text-gray-50">Pasang Iklan Anda</h1>
                    <label htmlFor="type" className="text-gray-500 font-light mt-8 dark:text-gray-50">
                        Tipe<span className="text-red-500 dark:text-gray-50">*</span>
                    </label>
                    <div id="kategori1" style={{ paddingTop: '60px', overflowY: 'scroll' }} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <div className='fixed w-full top-0 py-2 h-[50px] flex items-center' style={{borderBottom: '1px solid #ddd'}}>
                            <Link href={'/'} type="button" className='px-5' style={{fontSize: '16px'}}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </Link><h1 className='inline-block px-2'>Mau jual apa hari ini?</h1>
                        </div>
                        <div className='h-[calc(100vh-50px)]'>
                            <div className="grid gap-5 p-10 grid-cols-1 md:grid-cols-2">
                                <button data-nilai="0" onClick={(w)=>{
                                    backFunc(2);
                                }} type="button" className='text-center p-2 shadow-md'>
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        style={{ fontSize: 25, color: "black" }}
                                    />
                                    <h1 className='text-[12px] mt-2 mb-3'>Properti</h1>
                                </button>
                                <button data-nilai="1" type="button" className='text-center p-2 shadow-md'>
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        style={{ fontSize: 25, color: "black" }}
                                    />
                                    <h1 className='text-[12px] mt-2 mb-3'>Bahan Bangunan (Coming Soon)</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="kategori2" style={{ paddingTop: '60px', display: "none", overflowY: 'scroll' }} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <input type='hidden' name='slug2' value={properti}  />
                        <div className='fixed w-full top-0 py-2 h-[50px] flex items-center' style={{borderBottom: '1px solid #ddd'}}>
                            <button onClick={(w) => {
                                backFunc(1);
                            }} type="button" className='px-5' style={{fontSize: '16px'}}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </button><h1 className='inline-block px-2'>Properti</h1>
                        </div>
                        <div className='h-[calc(100vh-50px)]'>
                            <div className="grid p-5 grid-cols-1 md:grid-cols-1">
                                {data.map((q, i)=>{
                                    return (<li className='list-none' key={i}>
                                        <button onClick={(w) => {
                                            let nilai = w.target.dataset
                                            backFunc(3, 6, nilai);
                                        }} type='button' data-form={q.form} data-status={q.status} data-nilai={q.text} style={{ borderBottom: '1px solid #ddd' }} className='kategori w-full text-left px-5 py-3'>{q.text}</button>
                                    </li>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div id="kategori3" style={{paddingTop:'60px',display:"none", overflowY:'scroll'}} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <div className='fixed top-0 bg-white w-full py-2 h-[50px] flex items-center' style={{ borderBottom: '1px solid #ddd' }}>
                            <button onClick={(w) => {
                                backFunc(2);
                            }} type="button" className='px-5' style={{ fontSize: '16px' }}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </button><h1 className='inline-block px-2'>Include Some Details</h1>
                        </div>
                        <div className='px-5'>
                            <FormPost edit={listingData} hidetanah={hideTanah} />
                            <button onClick={(w) => {
                                backFunc(4);
                            }} type='button' className='w-full bg-gray-950 text-white py-3 rounded-md'>Next</button>
                        </div>
                    </div>
                    <div id="kategori4" style={{paddingTop:'60px',display:"none", overflowY:'scroll'}} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <div className='fixed top-0 bg-white w-full py-2 h-[50px] flex items-center' style={{ borderBottom: '1px solid #ddd' }}>
                            <button onClick={(w) => {
                                backFunc(3);
                            }} type="button" className='px-5' style={{ fontSize: '16px' }}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </button><h1 className='inline-block px-2'>Upload Your Photos</h1>
                        </div>
                        <div className='px-5'>
                            <ImageUpload data={Listing} />
                        </div>
                        <div className='w-full fixed bottom-0'>
                            <button onClick={(w) => {
                                backFunc(5);
                            }} className='w-full flex items-center justify-center bg-gray-950 text-white h-[50px]' type='button'>Next</button>
                        </div>
                    </div>
                    <div id="kategori5" style={{paddingTop:'60px',display:"none", overflowY:'scroll'}} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <div className='fixed top-0 bg-white w-full py-2 h-[50px] flex items-center' style={{ borderBottom: '1px solid #ddd' }}>
                            <button onClick={(w) => {
                                backFunc(4);
                            }} type="button" className='px-5' style={{ fontSize: '16px' }}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </button><h1 className='inline-block px-2'>Set Your Price</h1>
                        </div>
                        <div className='px-5'>
                            <h1 className="text-sm dark:text-gray-50 pt-8">Price</h1>
                            <input
                                value={Number(price).currency()}
                                onChange={(e) => {
                                    let h = e.target.value.number().toString();
                                    setPrice(h);
                                }}
                                type='text'
                                name="price"
                                className="bg-transparent text-right border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
                            />
                        </div>
                        <div className='w-full fixed bottom-0'>
                            <button onClick={(w) => {
                                backFunc(6);
                            }} className='w-full flex items-center justify-center bg-gray-950 text-white h-[50px]' type='button'>Next</button>
                        </div>
                    </div>
                    <div id="kategori6" style={{ paddingTop: '60px', paddingBottom: '60px', display:"none", overflowY:'scroll'}} className="fixed w-[100%] h-full bg-white top-0 z-[2000] left-0">
                        <div className='fixed top-0 bg-white w-full py-2 h-[50px] flex items-center' style={{ borderBottom: '1px solid #ddd' }}>
                            <button onClick={(w) => {
                                backFunc(5);
                            }} type="button" className='px-5' style={{ fontSize: '16px' }}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </button><h1 className='inline-block px-2'>Confirm Your Location</h1>
                        </div>
                        <div className='px-5'>
                            <select name='prov' onChange={provinsiChange}>
                                <option key={0} value={""}>Pilih Provinsi</option>
                                {wilayah.provinsi.map(function(w, i){
                                    return <option key={i+1} value={w.id}>{w.name}</option>
                                })}
                            </select>
                            <select name="kota" onChange={kotaChange}>
                                <option key={0} value={""}>Pilih Kota</option>
                                {kota.map(function(w, i){
                                    return <option key={i+1} value={w.id}>{w.name}</option>
                                })}
                            </select>
                            <select name='kec'>
                                <option key={0} value={""}>Pilih Kecamatan</option>
                                {kecamatan.map(function(w, i){
                                    return <option key={i+1} value={w.id}>{w.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="fixed bottom-0 w-full flex flex-row items-center justify-start">
                            <button
                                type="submit"
                                className="px-10 w-full mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row  justify-center items-center"
                            >
                                Submit
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="text-cyan-500 ml-2"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                                    fill="currentColor"
                                />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 z-[2050] h-full w-full bg-white opacity-75" style={{display: visible ? 'block' : 'none'}}>
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </form>
            </ValidasiLogin>
        )
    }
}