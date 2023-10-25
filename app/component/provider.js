"use client"
const { SessionProvider } = require("next-auth/react");
import React from "react";

const Providers = (props) => {
    return (<SessionProvider>{props.children}</SessionProvider>)
}


export default Providers;