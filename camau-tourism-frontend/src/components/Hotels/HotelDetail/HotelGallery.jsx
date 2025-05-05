import React from "react";

// Ảnh mặc định
const defaultImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

function HotelGallery({ images }) {
  const galleryImages = images && images.length > 0 ? images : [defaultImage];

  const displayImages = galleryImages.slice(0, 6);
  const hasMore = galleryImages.length > 6;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-xl overflow-hidden pl-3 pr-3">
      <div className="md:col-span-4 row-span-2">
        <img
          src={displayImages[0]}
          alt="Hotel Main"
          className="h-64 w-full object-cover rounded-xl shadow-md"
        />
      </div>
      {/* Các ảnh nhỏ còn lại */}
      {displayImages.slice(1).map((img, idx) => (
        <div key={idx} className="relative">
          <img
            src={img}
            alt={`Gallery ${idx + 2}`}
            className="h-32 w-full object-cover rounded-xl shadow transition-transform hover:scale-105"
          />
          {hasMore && idx === displayImages.length - 2 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center text-white text-lg font-semibold">
              Xem tất cả hình ảnh
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HotelGallery;