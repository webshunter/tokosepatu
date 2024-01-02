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
import OtpInput from 'react-otp-input';

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
    const [find, setfind] = useState("sale");
    const [fTipe, setfTipe] = useState("rumah");
    const [fJual, setfJual] = useState(0);
    const [fMin, setfMin] = useState("0");
    const [fMax, setfMax] = useState("0");
    const [fLokasi, setfLokasi] = useState("");
    const [fNama, setfNama] = useState("");
    const [fHP, setfHP] = useState("");
    const [fKPR, setfKPR] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const route = useRouter();
    const [showWa, setShowWa] = useState(false);
    const [showSuc, setshowSuc] = useState(false);
    const [otp, setOtp] = useState('');
    let [countDown, setCountDown] = useState(0);

    const searchButton = function(){
        goSeach(document.getElementById("cari").value);
    }

    const goSeach = function(value){
        value = encodeURI( value.toLowerCase().replace(/\ /g, '-') );
        if (value!=='') {
            route.push('/'+find+'?keyword='+value);
        } else {
            route.push('/'+find);
        }
    }

    const findClick = (label) => {
        setfind(label);
    };

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
        const intervalId = setInterval(() => {
            if (countDown > -1) {
                countDown--;
                setCountDown(countDown);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    })

    const cariPro = async (e) => {
        e.preventDefault();
        try {
            const ress = await fetch('/api/finding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({fTipe,fJual,fMin,fMax,fLokasi,fNama,fHP,fKPR}),
            });
            if (ress.ok) {
                let data = await fetch('https://app.rumahjo.com/token/request/' + fHP.replace(/\+/g, ""));
                let dataJson = await data.json();
                if (dataJson.status) {
                    setCountDown(60);
                }
                if (dataJson.message==='user verified') {
                    setshowSuc(true);
                }
                setShowWa(true);
            } else {
                console.error('Error menyimpan data.');
            }
        } catch (error) {
            console.error('Error menyimpan data :', error);
        }
    }

    return(<>
    <div className="px-4 md:px-10 mb-2 md:mb-4">
        <div className="flex justify-center items-center h-full">
            <div className="rounded-lg bg-[#2951a3] overflow-hidden shadow-lg w-full md:w-[750px]">
                <div className="my-3 pt-1">
                    <div id="tablist" className="">
                        <div className="tabs-home flex flex-nowrap h-[33px] overflow-x-auto overflow-y-hidden whitespace-nowrap justify-center">
                            <button onClick={() => findClick("sale")} role="tab" id="sale" tabIndex="0" className={`tabs-home__button ${find==='sale' ? 'button--active' : ''}`}>Dijual</button>
                            <button onClick={() => findClick("rent")} role="tab" id="rent" tabIndex="1" className={`tabs-home__button ${find==='rent' ? 'button--active' : ''}`}>Disewa</button>
                            <button onClick={() => findClick("indekos")} role="tab" id="indekos" tabIndex="2" className={`tabs-home__button ${find==='indekos' ? 'button--active' : ''}`}>Indekos</button>
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
                                        <Image className="relative" src="/toolbar/cariproperti.png" alt="Cari Properti di Rumahjo" width={40} height={40} />
                                        <span className="font-bold text-center md:text-left leading-4 text-[12px] md:text-[14px]">Carikan Properti</span>
                                    </a>
                                </div>
                                <div>
                                    <Link href="/cari-agen" className="flex flex-col md:flex-row gap-3 h-[88px] md:h-[50px] no-underline items-center px-[4px] md:px-0 py-[16px] md:py-0">
                                        <Image className="relative" src="/toolbar/cariagen.png" alt="Cari Agen di Rumahjo" width={40} height={40} />
                                        <span className="font-bold text-center md:text-left leading-4 text-[12px] md:text-[14px]">Cari Agen</span>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/simulasi-kpr" className="flex flex-col md:flex-row gap-3 h-[88px] md:h-[50px] no-underline items-center px-[4px] md:px-0 py-[16px] md:py-0">
                                        <Image className="relative" src="/toolbar/calculation.png" alt="Simulasi KPR di Rumahjo" width={40} height={40} />
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
                {
                !showWa ?
                <form onSubmit={cariPro} className="w-full h-full" style={{overflowY:"auto"}}>
                    <div className="mb-[40px]">
                        <div className="mb-[16px]">
                            <div className="relative items-center flex">
                                <span className="pr-1">Tipe Properti</span>
                                <span className="text-[#c30000]">*</span>
                            </div>
                            <div className="pt-0 relative items-center flex">
                                <ul className="flex w-full gap-4">
                                    <li className="w-[50%] md:w-[75%]">
                                        <select
                                            value={fTipe}
                                            onChange={(e) => {
                                                setfTipe(e.target.value);
                                            }}
                                            name="fTipe"
                                            id="filter" className="border mt-0 rounded-lg cursor-pointer" >
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
                                            className="hidden peer"
                                            checked={fJual === 0}
                                            onChange={()=>{
                                                setfJual(0);
                                            }}
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
                                            checked={fJual === 1}
                                            onChange={()=>{
                                                setfJual(1);
                                            }}
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
                                            <select 
                                                value={fMin}
                                                onChange={(e) => {
                                                    setfMin(e.target.value);
                                                }}
                                                name="fMin"
                                                id="min" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="0">Berapapun</option>
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
                                            <select 
                                                value={fMax}
                                                onChange={(e) => {
                                                    setfMax(e.target.value);
                                                }}
                                                name="fMax"
                                                id="max" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="0">Berapapun</option>
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
                                        <select 
                                            value={fLokasi}
                                            onChange={(e) => {
                                                setfLokasi(e.target.value);
                                            }}
                                            name="lokasi" className="border mt-0 rounded-lg cursor-pointer"
                                            required={true}>
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
                                        <input type="text" 
                                            value={fNama}
                                            onChange={(e) => {
                                                setfNama(e.target.value);
                                            }}
                                            name="nama" className="bg-white border rounded-lg" placeholder="Tulis Nama"
                                            required={true}/>
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
                                            value={fHP}
                                            onChange={setfHP}
                                            required={true} />
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-2 flex items-center">
                                <input 
                                    checked={fKPR == 1? true:false}
                                    value={fKPR}
                                    onChange={(e)=>{
                                        e.target.checked ? setfKPR(1):setfKPR(0);
                                    }}
                                    id="link-checkbox" type="checkbox" className="w-4 h-4 ml-[4px] mt-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="link-checkbox" className="ms-3 font-medium text-gray-900 dark:text-gray-300">Saya tertarik untuk KPR.</label>
                            </div>
                        </div>
                    </div>
                        <button type="submit" className="w-full h-[3rem] btn-primary rounded-lg">Carikan Saya Properti</button>
                </form>
                :
                    !showSuc ?
                    <>
                        <div className='flex my-4 justify-center py-3'>
                            <div className='w-full text-center border-2 border-indigo-950 p-10 shadow-md'>
                                <div className="token inline-block">
                                    <OtpInput
                                        className="text-gray-700 "
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                                {otp.length == 6 ?
                                    <button onClick={() => {
                                        let awl = otp.substring(0, 3);
                                        let akhir = otp.substring(3, 6);
                                        let getOtp = awl + '-' + akhir;
                                        fetch('https://app.rumahjo.com/token/cek/' + getOtp)
                                        .then(function( w ){
                                            setshowSuc(true)
                                        })
                                        .then(function(res){
                                            console.log(res)
                                        })
                                    }} className='w-full btn-primary text-white p-1 rounded mb-2'>Submit</button>
                                    :
                                    <></>
                                }
                                {countDown > 0 ?
                                    <div className='p-2 text-center'>
                                        <span>Silahkan inputkan token yang dikirim ke WA anda sebelum {countDown} Detik</span>
                                    </div>
                                :
                                    <button onClick={setShowWa(false)} className="w-full bg-white border-2 border-indigo-950 p-1 rounded mb-2">Minta Ulang Token</button>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center">
                            <span className="text-[20px] font-semibold">Terimakasih telah menggunakan fitur carikan properti,<br/>kami akan menghubungi anda di jam operasional Rumahjo</span>
                            <img src="/logo-h.png" className="w-full pt-2"></img>
                            <button onClick={()=>{
                                    setShowWa(false),setshowSuc(false),setOpenModal(false)
                                }} className="w-full btn-primary text-white p-1 rounded mb-2">Kembali</button>
                        </div>
                    </>
                }
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
            .token input{
                min-width: 40px;
            }
        `}
    </style>
    </>)
}