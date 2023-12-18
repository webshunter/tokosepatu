import Image from "next/image"
import Link from "next/link"
import { formatRupiah } from "./rupiah"
import { useRouter } from "next/navigation";

export const ProdukCard = function ({ data }) {
    const route = useRouter();
    let { key, uniqid, price, judul, image: images, slug , laku } = data
    return (<>
        <div key={key} style={{
            display: 'grid',
            gridTemplateColumns: '80px auto 100px',
            borderBottom: '1px solid black',
        }} className="relative bg-gray-200 w-full">
            <div style={{display: 'hidden'}} className="flex justify-center items-center">
                <img height={`100%`} className="w-full w-auto block " src={`https://app.rumahjo.com/` + images} alt={judul}></img>
            </div>
            <div className="w-full">
                <div className="font-bold text-[12px] md:text-[1.2rem] mb-1 text-ellipsis truncate ...">{formatRupiah(price)}</div>
                <p className="text-[12px] text-gray-700 text-base truncate ...">
                    {judul}
                </p>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={() => {
                    route.push('/post/update/' + uniqid)
                }} className="p-1 md:p-2 z-10 shadow-md rounded-[8px] flex bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12.527 7.473l-4-4L1 11v4h4zM11.172.828l-1.065 1.065 4 4 1.065-1.065a2.83 2.83 0 00-4-4z"></path>
                    </svg>
                    Edit
                </button>
            </div>
        </div>
    </>)
}