"use client"
import React from "react";
import { useSession } from "next-auth/react";

const ValidasiLogin = ( props ) => {
    const { data: session } = useSession();
    if(session){
        return (<>
                {props.children}
        </>)
    }else{
        return (<div className="block mt-10 text-center p-10">
            <h2 className="block text-2xl mb-5">Silakan login atau daftar</h2>
            <p className="block">Anda harus login atau daftar terlebih dahulu untuk melanjutkan.</p>
        </div>)
    }
}

export default ValidasiLogin;