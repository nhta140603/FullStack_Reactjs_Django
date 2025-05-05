import React,{useState, useEffect} from "react";
import {getAvatarUrl} from '../../api/user_api'
import {
  FaUser, FaSuitcaseRolling, FaHotel, FaCar, FaStar,
  FaHeart, FaBlog, FaTicketAlt, FaBell, FaHeadset
} from "react-icons/fa";

const menuItems = [
  { key: "profile", icon: <FaUser />, label: "Thông tin cá nhân" },
  { key: "trips", icon: <FaSuitcaseRolling />, label: "Đơn tour" },
  { key: "hotels", icon: <FaHotel />, label: "Đặt phòng" },
  { key: "transport", icon: <FaCar />, label: "Phương tiện" },
  { key: "reviews", icon: <FaStar />, label: "Đánh giá của tôi" },
  { key: "wishlist", icon: <FaHeart />, label: "Wishlist" },
  { key: "blog", icon: <FaBlog />, label: "Blog cá nhân" },
  { key: "tickets", icon: <FaTicketAlt />, label: "Vé & Đặt chỗ" },
  { key: "notifications", icon: <FaBell />, label: "Thông báo" },
  { key: "support", icon: <FaHeadset />, label: "Hỗ trợ" },
];

export default function ProfileSidebar({ selected, onSelect, avatar, name }) {
  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      const url = await getAvatarUrl(avatar);
      setAvatarUrl(url);
    };

    fetchAvatarUrl();
  }, [avatar]);
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-teal-400 text-white flex flex-col min-h-screen shadow-xl">
      <div className="flex flex-col items-center py-8">
        <img
          className="w-20 h-20 rounded-full border-4 border-white"
          src={avatarUrl}
          alt="avatar"
        />
        <div className="mt-4 font-bold">{name}</div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map(item => (
          <button
            key={item.key}
            className={`flex items-center gap-3 px-8 py-3 text-left font-medium hover:bg-white/20 rounded-l-full transition ${
              selected === item.key ? 'bg-white/20 font-bold' : ''
            }`}
            onClick={() => onSelect(item.key)}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}