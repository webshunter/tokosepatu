import React from "react";
import { useRouter } from "next/navigation";


const WaVerify = (props) => {
    const route = useRouter();
    return <>
        <button onClick={()=>{
            route.push('/waverify')
        }} className="block rounded bg-yellow-500 w-full text-white p-2 ">Verify WA</button>
    </>
}

export default WaVerify;