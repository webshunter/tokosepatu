"use client"

export const NotFound = function() {
    return (
        <>
            <div className="my-5 px-4 md:px-6 lg:px-10">
                <div className='flex flex-col md:flex-row'>
                    <div className="mt-[24px]">
                        <div className="mb-[32px] font-semibold leading-[1.875rem] text-[1.625rem]">
                            <h1>Sepertinya kami tidak bisa menemukan halaman yang Anda cari</h1>
                        </div>
                        <div className="mb-[32px]">
                            Berikut beberapa tautan yang bisa membantu:
                            <ul className="list-none pt-4">
                                <li className="pb-2">
                                    <a className="font-bold underline" href="./">Beranda</a>
                                </li>
                                <li className="pb-2">
                                    <a className="font-bold underline" href="sale">Dijual</a>
                                </li>
                                <li className="pb-2">
                                    <a className="font-bold underline" href="rent">Disewakan</a>
                                </li>
                                <li className="pb-2">
                                    <a className="font-bold underline" href="indekost">Indekos</a>
                                </li>
                                <li className="pb-2">
                                    <a className="font-bold underline" href="cari-agen">Cari Agen</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden md:block w-full md:w-[321px] lg:w-[500px] relative">
                        <img className="absolute md:top-[50%] lg:top-[15%]" src="/404.webp"></img>
                    </div>
                </div>
            </div>
        </>
    )
}