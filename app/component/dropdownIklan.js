import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DropdownIlkan = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);

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
        const userConfirmed = window.confirm('Yakin ingin merubah listing?'+(laku==='1' ? '\n\n'+toUnicodeVariant('Perhatian!!!', 'bold sans', 'bold')+'\n'+toUnicodeVariant('Listing yang sudah laku tidak dapat diubah lagi.', 'italic sans', 'italic') : ''));
        if (userConfirmed) {
            listingUpdate(approval, uniqId, laku, tgllaku);
        } else {
            return false;
        }        
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const route = useRouter();

    function toUnicodeVariant(str, variant, flags) {
        const offsets = {
            m: [0x1d670, 0x1d7f6],
            b: [0x1d400, 0x1d7ce],
            i: [0x1d434, 0x00030],
            bi: [0x1d468, 0x00030],
            c: [0x1d49c, 0x00030],
            bc: [0x1d4d0, 0x00030],
            g: [0x1d504, 0x00030],
            d: [0x1d538, 0x1d7d8],
            bg: [0x1d56c, 0x00030],
            s: [0x1d5a0, 0x1d7e2],
            bs: [0x1d5d4, 0x1d7ec],
            is: [0x1d608, 0x00030],
            bis: [0x1d63c, 0x00030],
            o: [0x24B6, 0x2460],
            p: [0x249C, 0x2474],
            w: [0xff21, 0xff10],
            u: [0x2090, 0xff10]
        }
    
        const variantOffsets = {
            'monospace': 'm',
            'bold': 'b',
            'italic': 'i',
            'bold italic': 'bi',
            'script': 'c',
            'bold script': 'bc',
            'gothic': 'g',
            'gothic bold': 'bg',
            'doublestruck': 'd',
            'sans': 's',
            'bold sans': 'bs',
            'italic sans': 'is',
            'bold italic sans': 'bis',
            'parenthesis': 'p',
            'circled': 'o',
            'fullwidth': 'w'
        }
    
        // special characters (absolute values)
        var special = {
            m: {
                ' ': 0x2000,
                '-': 0x2013
            },
            i: {
                'h': 0x210e
            },
            g: {
                'C': 0x212d,
                'H': 0x210c,
                'I': 0x2111,
                'R': 0x211c,
                'Z': 0x2128
            },
            o: {
                '0': 0x24EA,
                '1': 0x2460,
                '2': 0x2461,
                '3': 0x2462,
                '4': 0x2463,
                '5': 0x2464,
                '6': 0x2465,
                '7': 0x2466,
                '8': 0x2467,
                '9': 0x2468,
            },
            p: {},
            w: {}
        }
        //support for parenthesized latin letters small cases 
        for (var i = 97; i <= 122; i++) {
            special.p[String.fromCharCode(i)] = 0x249C + (i - 97)
        }
        //support for full width latin letters small cases 
        for (var i = 97; i <= 122; i++) {
            special.w[String.fromCharCode(i)] = 0xff41 + (i - 97)
        }
    
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
    
        var getType = function (variant) {
            if (variantOffsets[variant]) return variantOffsets[variant]
            if (offsets[variant]) return variant;
            return 'm'; //monospace as default
        }
        var getFlag = function (flag, flags) {
            if (!flags) return false
            return flags.split(',').indexOf(flag) > -1
        }
    
        var type = getType(variant);
        var underline = getFlag('underline', flags);
        var strike = getFlag('strike', flags);
        var result = '';
    
        for (var k of str) {
            let index
            let c = k
            if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
            if (type && (index = chars.indexOf(c)) > -1) {
                result += String.fromCodePoint(index + offsets[type][0])
            } else if (type && (index = numbers.indexOf(c)) > -1) {
                result += String.fromCodePoint(index + offsets[type][1])
            } else {
                result += c
            }
            if (underline) result += '\u0332' // add combining underline
            if (strike) result += '\u0336' // add combining strike
        }
        return result
    }

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
                        <a href="#" onClick={() => initUpdate('3', data[0], '0', null) } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        NON AKTIF
                        </a>
                        <a href="#" onClick={() => initUpdate(data[1], data[0], '1', 'now') } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
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