"use client"
const { SessionProvider } = require("next-auth/react");
import React from "react";

const Providers = ({children}) => {
    return (<SessionProvider>{children}</SessionProvider>)
}


export default Providers;