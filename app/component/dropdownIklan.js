import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DropdownIlkan = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const route = useRouter();

    console.log('approval : '+data[1]);
    console.log('laku : '+data[2]);

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
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        HAPUS
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        TANDAI SEBAGAI TERJUAL
                        </a>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default DropdownIlkan;