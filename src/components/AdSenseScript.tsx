"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-9025214646389350";
const SCRIPT_ID = "adsense-script";

export default function AdSenseScript() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}
