import React from "react";
const hotels = [
  { img: "/img1.jpg", name: "Hotel XYZ", price: "1.500.000đ" },
  { img: "/img2.jpg", name: "Hotel DEF", price: "2.000.000đ" },
];

export default function RelatedHotels() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="font-bold text-xl mb-4 border-b pb-2">Khách sạn tương tự</h2>
      <div className="grid grid-cols-2 gap-4">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="border rounded-lg p-2 flex flex-col items-center">
            <img src={hotel.img} className="h-20 w-32 object-cover rounded mb-2" alt={hotel.name} />
            <div className="font-semibold">{hotel.name}</div>
            <div className="text-blue-600 font-bold">{hotel.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}