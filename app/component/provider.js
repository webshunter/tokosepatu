"use client"
const { SessionProvider } = require("next-auth/react");

import React, { useEffect } from "react";

const Providers = ({children}) => {

    let p = process.env.NODE_ENV

    useEffect(()=>{
        if(p==='production'){
            if (window.location.protocol.indexOf('http:') != 'http' && window.location.hostname === 'rumahjo.com'){
                window.location.href = 'https://rumahjo.com/';
            }
        }
    },[p]);

    return (<SessionProvider>{children}</SessionProvider>)
}

export default Providers;