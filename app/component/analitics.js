import React from "react";
import Script from "next/script";

export default function Analitic(){
    return <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FTM15M5PB8" />
        <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FTM15M5PB8');
        `}
        </Script>
    </>
}