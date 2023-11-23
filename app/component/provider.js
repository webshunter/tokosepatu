"use client"
const { SessionProvider } = require("next-auth/react");

import React, { useEffect } from "react";
import { statusConfig } from "../library/configDatabase";

const Providers = ({children}) => {

    console.log(statusConfig)

    useEffect(()=>{
        // if(p==='production'){
        //     if (window.location.protocol.indexOf('http:') != -1 && window.location.hostname === 'rumahjo.com'){
        //         window.location.href = 'https://rumahjo.com/';
        //     }
        // }
    });

    return (<SessionProvider>{children}</SessionProvider>)
}

export default Providers;