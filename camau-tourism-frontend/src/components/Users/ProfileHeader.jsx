import React, { useRef } from "react";
import Avatar from "../../components/Users/Avatar";
import { FaCamera } from "react-icons/fa";

export default function ProfileHeader({ avatar, name, bio, onAvatarChange }) {
  const fileInputRef = useRef();

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative group">
        <Avatar src={avatar} />
        <button
          type="button"
          title="Thay đổi ảnh đại diện"
          onClick={handleAvatarClick}
          className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full shadow-lg hover:bg-teal-800 text-white transition-opacity opacity-80 group-hover:opacity-100"
        >
          <FaCamera />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <h2 className="text-3xl font-extrabold text-teal-700 drop-shadow">🌴 {name}</h2>
      <p className="text-gray-700 italic max-w-sm text-center">{bio || ""}</p>
    </div>
  );
}