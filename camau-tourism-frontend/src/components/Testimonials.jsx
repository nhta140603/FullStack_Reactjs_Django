import React from 'react';

const reviews = [
  { name: "Ngọc", review: "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình!", image: "https://i.pravatar.cc/100?img=1" },
  { name: "Minh", review: "Khách sạn sạch đẹp, dịch vụ tốt. Rất hài lòng!", image: "https://i.pravatar.cc/100?img=2" },
  { name: "Lan", review: "Trang web dễ dùng, đặt tour nhanh chóng.", image: "https://i.pravatar.cc/100?img=3" },
];

function Testimonials() {
  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8">Khách Hàng Nói Gì</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto">
            <img src={r.image} alt={r.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <p className="italic text-gray-700 mb-2">"{r.review}"</p>
            <p className="font-semibold">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;