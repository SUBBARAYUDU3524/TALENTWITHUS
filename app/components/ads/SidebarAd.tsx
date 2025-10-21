import React from "react";
const SidebarAd = ({ adSlot, ads }: { adSlot: string; ads: any[] }) => {
  if (!ads?.length) return null;
  const ad = ads[0];
  return (
    <div className="w-full my-2 flex justify-center items-center" aria-label={`Sidebar Ad ${adSlot}`}>
      {/* Replace with your ad code */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 250 }}
        data-ad-client={ad.adClient}
        data-ad-slot={ad.adSlot}
        data-ad-format={ad.adFormat || "vertical"}
      />
    </div>
  );
};
export default SidebarAd;