import Image from "next/image";

const locations = [
  { name: "HQ: McKinney, TX", top: "48%", left: "33%", color: "text-blue-600" },
  { name: "Atlanta, GA", top: "44%", left: "35%", color: "text-blue-600" },
  {
    name: "Mexico City, Mexico",
    top: "55%",
    left: "30%",
    color: "text-blue-600",
  },
  {
    name: "Vantaa, Finland",
    top: "28%",
    left: "63%",
    color: "text-orange-500",
  },
  { name: "Riga, Latvia", top: "32%", left: "64%", color: "text-orange-500" },
  {
    name: "Vilnius, Lithuania",
    top: "36%",
    left: "65%",
    color: "text-orange-500",
  },
  { name: "Warsaw, Poland", top: "39%", left: "61%", color: "text-orange-500" },
  {
    name: "Riyadh, Saudi Arabia",
    top: "50%",
    left: "68%",
    color: "text-green-700",
  },
  { name: "Fujairah, UAE", top: "52%", left: "70%", color: "text-green-700" },
  { name: "YSR Kadapa, India", top: "57%", left: "78%", color: "text-red-600" },
];

export default function Location() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      {/* Header Content */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-3xl font-bold text-blue-800">Our Geography</h1>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700">
          <strong>Headquartered in the US and operating internationally</strong>
          , our team drives digital transformation for businesses globally. We
          ensure on-site presence to deliver services to our{" "}
          <strong>major target markets</strong> in:
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-6 text-sm">
          <div>
            <h3 className="text-blue-600 font-semibold">North America</h3>
            <p>
              Office locations: USA, Mexico
              <br />
              Number of clients: ~510
            </p>
          </div>
          <div>
            <h3 className="text-orange-500 font-semibold">Europe and the UK</h3>
            <p>
              Office locations: Finland, Latvia, Lithuania, Poland
              <br />
              Number of clients: ~360
            </p>
          </div>
          <div>
            <h3 className="text-green-700 font-semibold">The Gulf</h3>
            <p>
              Office locations: KSA, UAE
              <br />
              Number of clients: ~50
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="relative w-full h-[600px] mt-10">
        <Image
          src="/assets/ERRTEKNALOZY.jpg"
          alt="Map Background"
          layout="fill"
          objectFit="contain"
          className="pointer-events-none"
        />

        {locations.map((loc, index) => (
          <div
            key={index}
            className={`absolute ${loc.color} text-sm font-semibold bg-white bg-opacity-80 px-2 py-1 rounded shadow whitespace-nowrap`}
            style={{
              top: loc.top,
              left: loc.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-2 h-2 bg-current rounded-full inline-block mr-1"></div>
            {loc.name}
          </div>
        ))}
      </section>
    </main>
  );
}
