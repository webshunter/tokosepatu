"use client"
const { SessionProvider } = require("next-auth/react");

import React, { useEffect } from "react";


const Providers = ({children}) => {
    const p = process.env.NODE_ENV
    
    useEffect(()=>{
        console.log(p)
        // if(p==='production'){
        //     if (window.location.protocol.indexOf('http:') != -1 && window.location.hostname === 'rumahjo.com'){
        //         window.location.href = 'https://rumahjo.com/';
        //     }
        // }
    },[p]);

    return (<SessionProvider>{children}</SessionProvider>)
}

export default Providers;