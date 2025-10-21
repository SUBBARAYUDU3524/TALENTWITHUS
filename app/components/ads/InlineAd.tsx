import React from "react";
const InlineAd = ({ adSlot, ads }: { adSlot: string; ads: any[] }) => {
  if (!ads?.length) return null;
  const ad = ads[0];
  return (
    <div className="w-full my-4 flex justify-center items-center" aria-label={`Inline Ad ${adSlot}`}>
      {/* Replace with your ad code */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 60 }}
        data-ad-client={ad.adClient}
        data-ad-slot={ad.adSlot}
        data-ad-format={ad.adFormat || "rectangle"}
      />
    </div>
  );
};
export default InlineAd;