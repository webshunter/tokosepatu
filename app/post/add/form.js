import { useState, useEffect } from "react";
import facility from '../../wilayah/facility.json';



export const FormPost = () => {
    const [lbangun, setLBangun] = useState("");
    const [ltanah, setLTanah] = useState("");
    const [ktidur, setKTidur] = useState("");
    const [kmandi, setKMandi] = useState("");
    const [lantai, setLantai] = useState("");
    const [alamat, setAlamat] = useState("");
    const [judul, setJudul] = useState("");
    const [deskrisi, setDeskrisi] = useState("");

    var rows = [], i = 0, len = 10;
    while (++i <= len) rows.push(i);

    useEffect(()=>{
        document.querySelector('input#apartement').click();
        document.getElementById('cert1').click();
    }, [])

    return (<>
        <input type='hidden' name='uniqid' className='none' defaultValue={'produk-' + Date.now()}></input>
        <ul className="p-3 grid w-full gap-6 grid-cols-2">
            <li>
                <input type="radio"
                    id="apartement"
                    name="type"
                    value="0"
                    className="hidden peer"
                    required />
                <label htmlFor="apartement" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full">Apartemen</div>
                    </div>
                </label>
            </li>
            <li>
                <input
                    type="radio"
                    id="rumah"
                    name="type"
                    value="1"
                    className="hidden peer"
                />
                <label
                    htmlFor="rumah"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <div className="block">
                        <div className="w-full">Rumah</div>
                    </div>
                </label>
            </li>
        </ul>
        <label htmlFor="lbangun" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Luas Bangunan<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <input type="number"
            value={lbangun}
            onChange={(e) => {
                setLBangun(e.target.value);
            }}
            name="lbangun"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        />
        <label htmlFor="ltanah" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Luas Tanah<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <input type="number"
            value={ltanah}
            onChange={(e) => {
                setLTanah(e.target.value);
            }}
            name="ltanah"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        />
        <label htmlFor="ktidur" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Kamar Tidur<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <select
            value={ktidur}
            onChange={(e) => {
                setKTidur(e.target.value);
            }}
            name="ktidur"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        >
            <option value=""></option>
            {rows.map(function (i, x) {
                return <option key={x} value={i}>{i}</option>;
            })}
            <option value={11}>&gt;10</option>
        </select>
        <label htmlFor="kmandi" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Kamar Mandi<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <select
            value={kmandi}
            onChange={(e) => {
                setKMandi(e.target.value);
            }}
            name="kmandi"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        >
            <option value=""></option>
            {rows.map(function (i, x) {
                return <option key={x} value={i}>{i}</option>;
            })}
            <option value={11}>&gt;10</option>
        </select>
        <label htmlFor="lantai" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Lantai<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <input type="number"
            value={lantai}
            onChange={(e) => {
                setLantai(e.target.value);
            }}
            name="lantai"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        />
        <label htmlFor="facility" className="text-gray-500 font-light mt-8 dark:text-gray-50">Fasilitas</label>
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {facility.data.map((d, i) => {
                return (
                    <li key={i} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input name="facility" id={d.toLowerCase().replace(/\ /g, '-') + i} type="checkbox" value={d} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor={d.toLowerCase().replace(/\ /g, '-') + i} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{d}</label>
                        </div>
                    </li>
                )
            })}
        </ul>
        <label htmlFor="cert" className="text-gray-500 font-light mt-8 dark:text-gray-50">Sertifikat</label>
        <ul className="grid w-full gap-3 md:grid-cols-3">
            <li>
                <input type="radio" id="cert1" name="cert" value="1" className="hidden peer" required />
                <label htmlFor="cert1" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full">SHM - Sertifikat Hak Milik</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="cert2" name="cert" value="2" className="hidden peer" />
                <label htmlFor="cert2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full">HGB - Hak Guna Bangun</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="cert3" name="cert" value="3" className="hidden peer" />
                <label htmlFor="cert3" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full">Lainnya (PPJB, Girik, Adat, dll)</div>
                    </div>
                </label>
            </li>
        </ul>
        <label htmlFor="alamat" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Alamat
        </label>
        <input type="text"
            value={alamat}
            onChange={(e) => {
                setAlamat(e.target.value);
            }}
            name="alamat"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        />
        <label htmlFor="judul" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Judul Iklan<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <input type="text"
            value={judul}
            onChange={(e) => {
                setJudul(e.target.value);
            }}
            name="judul"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        />
        <label htmlFor="deskrisi" className="text-gray-500 font-light mt-8 dark:text-gray-50">
            Deskripsi<span className="text-red-500">*</span>
        </label>
        <textarea
            name="deskrisi"
            value={deskrisi}
            onChange={(e) => {
                setDeskrisi(e.target.value);
            }}
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
        ></textarea>
        
    </>)
}