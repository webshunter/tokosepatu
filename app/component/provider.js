"use client"
const { SessionProvider } = require("next-auth/react");
import { func } from "prop-types";
import React, { useEffect, useState } from "react";


const Providers = ({children}) => {
    const [vv, setVV] = useState(null);
    const p = process.env.NODE_ENV;
    useEffect(()=>{
        fetch('/api/productionstatus')
        .then(function(r){
            return r.json();
        })
        .then(function(r){
            let {message} = r
            setVV(message)
        })
        
    },[p]);

    return (<SessionProvider>
    <noscript id="settingProduction">{JSON.stringify(vv)}</noscript>
        {children}
    </SessionProvider>)
}

export default Providers;