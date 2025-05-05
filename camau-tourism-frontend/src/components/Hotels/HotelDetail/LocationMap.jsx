import React from "react";

export default function HotelSurroundingMap({hotel,address, mapSrc,}) {
  return (
    <section className="bg-white rounded-xl p-6 mb-10 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-5">
        Xung quanh <span className="text-indigo-700">{hotel}</span> có gì
      </h2>
      <div className="md:flex md:gap-6">
        <div className="md:w-full w-full">
          <div className="rounded-xl overflow-hidden border shadow-sm relative">
            <iframe
              title={`Bản đồ ${hotel}`}
              src={mapSrc}
              width="100%"
              height="270"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[270px]"
              style={{ border: "none" }}
            ></iframe>
            <button className="absolute left-3 bottom-3 px-4 py-2 bg-black bg-opacity-70 text-white rounded-lg flex items-center gap-2 text-sm font-medium shadow hover:bg-opacity-90 transition">
              <svg width="18" height="18" fill="none"><path d="M9 2v14M9 2l4 4M9 2l-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              Khám phá nhiều địa điểm hơn
            </button>
          </div>
          <div className="mt-3 flex items-center text-gray-500 text-sm gap-2">
            <svg width="18" height="18" fill="none"><path d="M9 2a7 7 0 017 7c0 4.5-7 9-7 9S2 13.5 2 9a7 7 0 017-7z" stroke="#6366f1" strokeWidth="1.5"/><circle cx="9" cy="9" r="2" stroke="#6366f1" strokeWidth="1.5"/></svg>
            {address}
          </div>
        </div>

        </div>
    </section>
  );
}
