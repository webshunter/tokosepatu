"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const StickyButton = (props) => {
    const route = useRouter();
    const { data: session } = useSession();
    const { data: dataRender } = props.data
    const pathname = usePathname();

    let data = [];
    if(dataRender.length > 0){
        data = dataRender[0];
    }
    return (<>
<div style={{boxShadow: '0px 0px 2px #333', zIndex: '999'}} className="fixed grid grid-cols-2 bg-white bottom-0 w-full h-50px">
            <button>
                <div className="text-left flex justify-center border-2 border-indigo-950 items-center p-3 m-2 rounded-xl bg-white bg-indigo-950">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.032.653-.048.851-.162a1.06 1.06 0 00.402-.432c.099-.206.099-.446.099-.926v-2.817c0-.404 0-.606-.067-.779a.999.999 0 00-.277-.396c-.14-.122-.33-.191-.71-.329l-3.206-1.166c-.441-.16-.662-.24-.872-.227a1 1 0 00-.513.182c-.171.121-.292.322-.534.725L14 16a12.1 12.1 0 01-6-6l1.369-.821c.402-.242.604-.363.725-.534a1 1 0 00.182-.513c.014-.21-.066-.43-.227-.872L8.883 4.053c-.138-.38-.207-.569-.329-.709a1 1 0 00-.396-.278C7.985 3 7.783 3 7.379 3H4.562c-.48 0-.72 0-.926.1a1.06 1.06 0 00-.432.401c-.114.198-.13.416-.162.85C3.014 4.732 3 5.115 3 5.5z"
                        ></path>
                    </svg>
                    +6209090****
                </div> 
             </button>
            <button onClick={()=>{
                if(session){
                    let text = `Hai, saya ${session.user.name} tertarik dengan informasi mengenai ${data.judul} Mohon informasi terkait unit tersebut: ${`https://rumahjo.com`+pathname}`
                    window.open('https://api.whatsapp.com/send?phone=' + data.phone + '&text=' + text, '_blank');
                }else{
                    route.push('/login')
                }
            }}>
                <div className="text-left text-white flex justify-center items-center p-3 m-2 rounded-xl bg-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="#fff"
                        version="1.1"
                        viewBox="0 0 308 308"
                        xmlSpace="preserve"
                    >
                        <g>
                            <path d="M227.904 176.981c-.6-.288-23.054-11.345-27.044-12.781-1.629-.585-3.374-1.156-5.23-1.156-3.032 0-5.579 1.511-7.563 4.479-2.243 3.334-9.033 11.271-11.131 13.642-.274.313-.648.687-.872.687-.201 0-3.676-1.431-4.728-1.888-24.087-10.463-42.37-35.624-44.877-39.867-.358-.61-.373-.887-.376-.887.088-.323.898-1.135 1.316-1.554 1.223-1.21 2.548-2.805 3.83-4.348a140.77 140.77 0 011.812-2.153c1.86-2.164 2.688-3.844 3.648-5.79l.503-1.011c2.344-4.657.342-8.587-.305-9.856-.531-1.062-10.012-23.944-11.02-26.348-2.424-5.801-5.627-8.502-10.078-8.502-.413 0 0 0-1.732.073-2.109.089-13.594 1.601-18.672 4.802C90 87.918 80.89 98.74 80.89 117.772c0 17.129 10.87 33.302 15.537 39.453.116.155.329.47.638.922 17.873 26.102 40.154 45.446 62.741 54.469 21.745 8.686 32.042 9.69 37.896 9.69h.001c2.46 0 4.429-.193 6.166-.364l1.102-.105c7.512-.666 24.02-9.22 27.775-19.655 2.958-8.219 3.738-17.199 1.77-20.458-1.348-2.216-3.671-3.331-6.612-4.743z"></path>
                            <path d="M156.734 0C73.318 0 5.454 67.354 5.454 150.143c0 26.777 7.166 52.988 20.741 75.928L.212 302.716a3.998 3.998 0 004.999 5.096l79.92-25.396c21.87 11.685 46.588 17.853 71.604 17.853C240.143 300.27 308 232.923 308 150.143 308 67.354 240.143 0 156.734 0zm0 268.994c-23.539 0-46.338-6.797-65.936-19.657a3.996 3.996 0 00-3.406-.467l-40.035 12.726 12.924-38.129a4.002 4.002 0 00-.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 0-65.543 53.754-118.867 119.826-118.867 66.064 0 119.812 53.324 119.812 118.867.001 65.535-53.746 118.851-119.811 118.851z"></path>
                        </g>
                    </svg>
                    +6209090****
                </div> 
             </button>
        </div>
    </>)
}

export default StickyButton;