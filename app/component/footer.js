"use client"
import Link from "next/link"
import { useEffect } from "react"
export const Footer = function () {

    useEffect(() => {

    })

    return (<>

        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">KATEGORI POPULER</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="#" className=" hover:underline">Rumah KPR Malang</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah KPR Surabaya</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah KPR Jogja</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah KPR Banyuwangi</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">PENCARIAN POPULER</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah Malang</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah Malang Wagir</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah Solo</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumah Cempaka</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">RUMAHJO INDONESIA</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumahjo Karir</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumahjo News</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Jual Rumah Instant</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">RUMAHJO</h2>
                        <ul className="text-gray-500 dark:text-gray-400 text-[12px]">
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Pusat Bantuan</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Peta Situs</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Kebijakan Privasi</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Tips Aman</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="hover:underline">Rumahjo KPR</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center"><a href="/sitemap/most-populer">Bantuan - peta lokasi</a>
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                        <span className="text-gray-500 dark:text-gray-300">Iklan gratis di RumahJo Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}