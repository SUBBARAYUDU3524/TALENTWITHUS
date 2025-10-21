import React, { useEffect, useRef } from "react";

// Example: Google AdSense, Amazon Native, etc.
const BannerAd = ({ adSlot, ads }: { adSlot: string; ads: any[] }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On mount, (re)load ad script (enterprise: prevent duplicate loads)
    if (window && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [adSlot, ads]);

  if (!ads?.length) return null;

  // Choose best ad for slot
  const ad = ads[0];

  return (
    <div
      ref={adRef}
      className="w-full my-4 flex justify-center items-center"
      aria-label={`Ad slot ${adSlot}`}
    >
      {/* Replace with your ad provider code */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ad.adClient}
        data-ad-slot={ad.adSlot}
        data-ad-format={ad.adFormat || "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
};
export default BannerAd;