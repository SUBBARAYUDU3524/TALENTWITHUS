"use client";
import { useEffect } from "react";

const VerticalAd = () => {
  useEffect(() => {
    try {
      if (window) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9174140322510860" // Replace with your client ID
      data-ad-slot="5320699690" // Replace with your ad slot
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default VerticalAd;
