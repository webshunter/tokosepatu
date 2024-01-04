import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DropdownIlkan = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [uniqId, setUniqId] = useState(data[0]);
    const [laku, setLaku] = useState(0);
    const [tgllaku, setTgllaku] = useState(null);
    const [approval, setApproval] = useState(null);

    const listingUpdate = function(app, uniq, sold, date) {
        let data = {
            laku: sold
            ,approval: app
            , tgllaku: date
            , uniqid: uniq
        }
        fetch('/api/update/listing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res)=>{
            location.reload();
        })
    };

    const initUpdate = (approval, uniqId, laku = '0', tgllaku = null) => {
        setApproval(approval);
        setUniqId(uniqId);
        setLaku(laku);
        setTgllaku(tgllaku);
        const userConfirmed = window.confirm('Yakin ingin merubah listing?');
        if (userConfirmed) {
            listingUpdate();
        } else {
            return false;
        }        
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const route = useRouter();

    return (
        <>
            <div className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                Opsi
                <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 7">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            {isOpen && (
                <div className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" onClick={() => {
                                    route.push('/post/update/' + data[0])
                            }} className="pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        EDIT
                        </a>
                        <a href="#" onClick={() => listingUpdate('3', data[0], '0', null) } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        NON AKTIF
                        </a>
                        <a href="#" onClick={() => listingUpdate('4', data[0], '1', 'now') } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        TANDAI SUDAH LAKU
                        </a>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default DropdownIlkan;