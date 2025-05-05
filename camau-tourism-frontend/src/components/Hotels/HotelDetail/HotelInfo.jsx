import {
  FaWifi, FaEdit, FaTrash, FaCar, FaSwimmingPool, FaUtensils, FaDumbbell, FaConciergeBell,
  FaBroom, FaBell, FaSpa, FaGlassMartiniAlt, FaTree, FaLock, FaSnowflake, FaUmbrellaBeach,
  FaShuttleVan, FaChalkboardTeacher, FaTv, FaIceCream, FaWind, FaMugHot, FaSoap, FaClock,
  FaBreadSlice, FaChild, FaSuitcaseRolling, FaCarSide, FaMoneyBillWave, FaSmokingBan
} from "react-icons/fa";
import React from "react";
const AMENITY_ICONS = {
  "fa-wifi": FaWifi,
  "fa-car": FaCar,
  "fa-swimming-pool": FaSwimmingPool,
  "fa-utensils": FaUtensils,
  "fa-dumbbell": FaDumbbell,
  "fa-concierge-bell": FaConciergeBell,
  "fa-broom": FaBroom,
  "fa-bell": FaBell,
  "fa-spa": FaSpa,
  "fa-glass-martini-alt": FaGlassMartiniAlt,
  "fa-tree": FaTree,
  "fa-lock": FaLock,
  "fa-snowflake": FaSnowflake,
  "fa-umbrella-beach": FaUmbrellaBeach,
  "fa-shuttle-van": FaShuttleVan,
  "fa-chalkboard-teacher": FaChalkboardTeacher,
  "fa-tv": FaTv,
  "fa-ice-cream": FaIceCream,
  "fa-wind": FaWind,
  "fa-mug-hot": FaMugHot,
  "fa-soap": FaSoap,
  "fa-clock": FaClock,
  "fa-bread-slice": FaBreadSlice,
  "fa-child": FaChild,
  "fa-suitcase-rolling": FaSuitcaseRolling,
  "fa-car-side": FaCarSide,
  "fa-money-bill-wave": FaMoneyBillWave,
  "fa-ban-smoking": FaSmokingBan,
};
import { FaElevator } from "react-icons/fa6";
const ICON_OPTIONS = [
  { id: 1, label: "Wifi miễn phí", value: "fa-wifi", icon: FaWifi, description: "Kết nối Internet tốc độ cao miễn phí toàn khách sạn" },
  { id: 2, label: "Nhà hàng", value: "fa-utensils", icon: FaUtensils, description: "Phục vụ các món ăn đa dạng, buffet sáng mỗi ngày" },
  { id: 3, label: "Bể bơi ngoài trời", value: "fa-swimming-pool", icon: FaSwimmingPool, description: "Bể bơi ngoài trời cho khách thư giãn" },
  { id: 4, label: "Bãi đỗ xe miễn phí", value: "fa-car", icon: FaCar, description: "Bãi đỗ xe an toàn, miễn phí cho khách lưu trú" },
  { id: 5, label: "Phòng gym", value: "fa-dumbbell", icon: FaDumbbell, description: "Phòng tập thể dục hiện đại, trang bị đầy đủ thiết bị" },
  { id: 6, label: "Lễ tân 24/7", value: "fa-concierge-bell", icon: FaConciergeBell, description: "Dịch vụ lễ tân phục vụ 24/7" },
  { id: 7, label: "Dọn phòng hàng ngày", value: "fa-broom", icon: FaBroom, description: "Phòng được dọn dẹp, làm sạch mỗi ngày" },
  { id: 8, label: "Dịch vụ phòng (Room Service)", value: "fa-bell", icon: FaBell, description: "Gọi món, phục vụ tại phòng 24/7" },
  { id: 9, label: "Spa & Massage", value: "fa-spa", icon: FaSpa, description: "Dịch vụ spa, massage thư giãn chuyên nghiệp" },
  { id: 10, label: "Quầy bar", value: "fa-glass-martini-alt", icon: FaGlassMartiniAlt, description: "Thưởng thức đồ uống và cocktail tại quầy bar" },
  { id: 11, label: "Sân vườn", value: "fa-tree", icon: FaTree, description: "Không gian xanh, sân vườn thư giãn" },
  { id: 12, label: "Két sắt", value: "fa-lock", icon: FaLock, description: "Két sắt an toàn trong phòng" },
  { id: 13, label: "Điều hoà nhiệt độ", value: "fa-snowflake", icon: FaSnowflake, description: "Hệ thống điều hoà nhiệt độ tại phòng" },
  { id: 14, label: "Thang máy", value: "fa-elevator", icon: FaElevator, description: "Thang máy tiện lợi cho khách" },
  { id: 15, label: "Ban công", value: "fa-umbrella-beach", icon: FaUmbrellaBeach, description: "Ban công riêng với view đẹp" },
  { id: 16, label: "Dịch vụ đưa đón sân bay", value: "fa-shuttle-van", icon: FaShuttleVan, description: "Xe đưa đón sân bay tiện lợi" },
  { id: 17, label: "Phòng hội nghị", value: "fa-chalkboard-teacher", icon: FaChalkboardTeacher, description: "Phòng họp, hội nghị trang bị hiện đại" },
  { id: 18, label: "Truyền hình cáp", value: "fa-tv", icon: FaTv, description: "TV, truyền hình cáp tại phòng" },
  { id: 19, label: "Tủ lạnh mini", value: "fa-ice-cream", icon: FaIceCream, description: "Tủ lạnh mini trong phòng" },
  { id: 20, label: "Máy sấy tóc", value: "fa-wind", icon: FaWind, description: "Trang bị máy sấy tóc tại phòng tắm" },
  { id: 21, label: "Ấm siêu tốc", value: "fa-mug-hot", icon: FaMugHot, description: "Ấm đun nước siêu tốc tiện lợi" },
  { id: 22, label: "Dịch vụ giặt là", value: "fa-soap", icon: FaSoap, description: "Dịch vụ giặt là, ủi quần áo chuyên nghiệp" },
  { id: 23, label: "Phòng không hút thuốc", value: "fa-ban-smoking", icon: FaSmokingBan, description: "Phòng dành riêng cho khách không hút thuốc" },
  { id: 24, label: "Nhận/trả phòng nhanh", value: "fa-clock", icon: FaClock, description: "Nhận và trả phòng nhanh chóng" },
  { id: 25, label: "Bữa sáng miễn phí", value: "fa-bread-slice", icon: FaBreadSlice, description: "Bữa sáng miễn phí mỗi ngày" },
  { id: 26, label: "Bãi biển riêng", value: "fa-umbrella-beach", icon: FaUmbrellaBeach, description: "Bãi biển riêng cho khách nghỉ dưỡng" },
  { id: 27, label: "Sân chơi trẻ em", value: "fa-child", icon: FaChild, description: "Khu vui chơi dành cho trẻ em" },
  { id: 28, label: "Dịch vụ giữ hành lý", value: "fa-suitcase-rolling", icon: FaSuitcaseRolling, description: "Nhận giữ hành lý cho khách" },
  { id: 29, label: "Hệ thống báo cháy", value: "fa-bell", icon: FaBell, description: "Hệ thống báo cháy, an toàn phòng chống cháy nổ" },
  { id: 30, label: "Dịch vụ cho thuê xe", value: "fa-car-side", icon: FaCarSide, description: "Dịch vụ cho thuê xe tiện lợi" },
  { id: 31, label: "ATM trong khuôn viên", value: "fa-money-bill-wave", icon: FaMoneyBillWave, description: "Cây ATM ngay trong khách sạn" },
  { id: 32, label: "Wifi khu vực công cộng", value: "fa-wifi", icon: FaWifi, description: "Wifi miễn phí mọi khu vực" },
];

export default function HotelMainInfo({ hotel, minPrice }) {
  function normalizeAmenities(amenities) {
    if (!amenities) return [];
    if (Array.isArray(amenities)) return amenities.map(Number);
    if (typeof amenities === "string") {
      try {
        if (amenities.trim().startsWith("[")) {
          return JSON.parse(amenities).map(Number);
        }
        return amenities.split(",").map(Number);
      } catch {
        return [];
      }
    }
    return [];
  }
  const normalizedAmenities = normalizeAmenities(hotel.amenities);
  const mainAmenities = ICON_OPTIONS.filter(item => normalizedAmenities.includes(item.id));
  return (
    <section className="bg-white rounded-lg p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <span className="text-blue-500 text-sm font-semibold border border-blue-400 rounded px-2">Khách Sạn</span>
            <span className="text-yellow-400 text-lg">{"⭐".repeat(hotel.star_rating || 5)}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-600 font-medium">Đã có Check-in Trực Tuyến</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Best Seller</span>
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Giá/phòng/đêm từ</span>
            <span className="text-red-500 font-bold text-lg">{minPrice ? `${minPrice.toLocaleString()} VND` : "—"}</span>
          </div>
          <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-2xl shadow">
            Chọn phòng
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5">
      {mainAmenities.length > 0 && (
            <div className="md:col-span-4 bg-blue-50 rounded-lg p-4 border flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Tiện ích chính</span>
                <a href="#" className="text-blue-500 text-xs hover:underline"></a>
              </div>
              {mainAmenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div className="flex items-center gap-2" key={item.value || idx}>
                    <Icon className="text-2xl mb-1" /> {item.label}
                  </div>
                );
              })}
            </div>
          )}
      </div>
      <div className="bg-white rounded-lg p-4 mt-4 border text-gray-700 text-sm">
        {hotel.description}
        <a href="#" className="text-blue-500 ml-2 hover:underline">Xem thêm</a>
      </div>
    </section>
  );
}