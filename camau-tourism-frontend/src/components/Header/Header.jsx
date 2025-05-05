import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import {getAvatarUrl} from '../../api/user_api'
import defaultAvatar from "../../assets/images/avatar/man-profile_1083548-15963.jpg";
import logo from '../../assets/images/logos/logo.png';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const { user,clientProfile, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = () => {
    if (!user) return "";
    if (user.avatar) return "";
    if (user.first_name || user.last_name)
      return (user.first_name?.[0] || user.last_name?.[0] || '').toUpperCase();
    return (user.username?.[0] || user.email?.[0] || '').toUpperCase();
  };

  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (!clientProfile?.avatar) {
        setAvatarUrl(defaultAvatar);
      } else {
        const url = await getAvatarUrl(clientProfile.avatar);
        setAvatarUrl(url || defaultAvatar);
      }
    };
    fetchAvatarUrl();
  }, [clientProfile]);

  return (
    <header className="bg-gradient-to-r from-cyan-900 via-blue-700 to-blue-900 text-white r-b4qz5r sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8 max-w-[1310px]">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-10 rounded-full shadow-lg" />
          <span className="text-2xl font-black tracking-wider bg-gradient-to-br from-cyan-300 to-yellow-100 bg-clip-text text-transparent">
            Cà Mau <span className="text-yellow-200">Tourism</span>
          </span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex space-x-6 font-semibold text-lg items-center">
            <li><a href="/" className="hover:text-cyan-200 transition">Trang chủ</a></li>
            <li><a href="/danh-sach-chuyen-du-lich" className="hover:text-cyan-200 transition">Tour du lịch</a></li>
            <li><a href="/danh-sach-dia-diem" className="hover:text-cyan-200 transition">Địa điểm</a></li>
            <li><a href="/tim-khach-san" className="hover:text-cyan-200 transition">Khách sạn</a></li>
            <li><a href="/danh-sach-le-hoi" className="hover:text-cyan-200 transition">Lễ Hội</a></li>
            <li><a href="/am-thuc" className="hover:text-cyan-200 transition">Ẩm Thực</a></li>
            <li><a href="/tin-tuc-su-kien" className="hover:text-cyan-200 transition">Tin Tức</a></li>
          </ul>
        </nav>
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label htmlFor="menu-toggle" className="md:hidden cursor-pointer p-2 rounded hover:bg-cyan-800 transition">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <div className="absolute md:hidden left-0 right-0 top-16 bg-cyan-900/95 shadow-2xl rounded-b-xl transition-all duration-300 max-h-0 overflow-hidden peer-checked:max-h-[500px] z-40" id="mobile-menu">
          <ul className="flex flex-col text-lg font-semibold divide-y divide-cyan-950">
            <li><a href="/" className="block px-6 py-3 hover:bg-cyan-800">Trang chủ</a></li>
            <li><a href="/danh-sach-chuyen-du-lich" className="block px-6 py-3 hover:bg-cyan-800">Tour du lịch</a></li>
            <li><a href="/danh-sach-dia-diem" className="block px-6 py-3 hover:bg-cyan-800">Địa điểm</a></li>
            <li><a href="/tim-khach-san" className="block px-6 py-3 hover:bg-cyan-800">Khách sạn</a></li>
            <li><a href="/danh-sach-le-hoi" className="block px-6 py-3 hover:bg-cyan-800">Lễ Hội</a></li>
            <li><a href="/am-thuc" className="hover:text-cyan-200 transition">Ẩm Thực</a></li>
            <li><a href="/tin-tuc-su-kien" className="block px-6 py-3 hover:bg-cyan-800">Tin Tức</a></li>
          </ul>
        </div>
        <div className="relative flex items-center space-x-4">
          {!user ? (
            <>
              <a href="/login" className='px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-300 text-blue-900 font-bold shadow transition'>Đăng nhập</a>
              <a href="/register" className='px-4 py-2 rounded-full border border-cyan-300 hover:bg-cyan-500 hover:text-blue-900 transition'>Đăng ký</a>
            </>
          ) : (
            <div className="relative" ref={accountRef}>
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-cyan-800 transition font-bold"
                onClick={() => setAccountOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={accountOpen}
              >
                  <img src={avatarUrl || '/default-avatar.png'} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-cyan-200 shadow" />

                <span className="hidden sm:inline">{user.last_name || user.username || user.email}</span>
                <FaChevronDown className={classNames("ml-1 transition-transform", accountOpen ? "rotate-180" : "")} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-cyan-900 shadow-xl rounded-xl py-2 z-50 animate-fadeIn">
                  <a href="/user-profile" className="flex items-center px-5 py-3 hover:bg-cyan-100 transition">
                    <FaUserCog className="mr-2 text-cyan-600" /> Quản lý tài khoản
                  </a>
                  <a href="/personaltrip" className="flex items-center px-5 py-3 hover:bg-cyan-100 transition">
                    <FaUserCircle className="mr-2 text-cyan-600" /> Lộ trình cá nhân
                  </a>
                  <button
                    onClick={logout}
                    className="flex items-center px-5 py-3 w-full hover:bg-red-100 text-left text-red-600 transition"
                  >
                    <FaSignOutAlt className="mr-2" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>
        {`
        @media (max-width: 768px) {
          #mobile-menu {
            display: block;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </header>
  );
}

export default Header;