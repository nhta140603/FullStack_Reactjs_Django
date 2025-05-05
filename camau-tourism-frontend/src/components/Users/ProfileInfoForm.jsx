import React, { useState } from "react";
import { updateInfoUser } from "../../api/user_api";
import {
  FaUser, FaEnvelope, FaVenusMars, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaExclamationTriangle
} from "react-icons/fa";

const GENDER_OPTIONS = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
  { value: "Khác", label: "Khác" },
];

export default function ProfileInfoForm({ user, onSave }) {
  const [form, setForm] = useState({
    first_name: user.user?.first_name || "",
    last_name: user.user?.last_name || "",
    email: user.user?.email || "",
    gender: user.gender || "",
    date_of_birth: user.date_of_birth || "",
    phone: user.phone || "",
    address: user.address || "",
    emergency_contact: user.emergency_contact || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const dataToSend = {
        user: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
        },
        gender: form.gender,
        date_of_birth: form.date_of_birth,
        phone: form.phone,
        address: form.address,
        emergency_contact: form.emergency_contact,
      };
      const updated = await updateInfoUser(dataToSend);
      onSave && onSave(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-50 rounded-xl shadow-xl p-8 border border-teal-100"
    >
      <h3 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-3">
        <FaUser className="text-emerald-500" /> Thông tin cá nhân
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaUser className="text-teal-400" /> Họ
          </label>
          <input
            className="input-style"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
            placeholder="Nhập họ"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaUser className="text-teal-400" /> Tên
          </label>
          <input
            className="input-style"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
            placeholder="Nhập tên"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-blue-400" /> Email
          </label>
          <input
            className="input-style bg-gray-100"
            name="email"
            type="email"
            value={form.email}
            required
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaVenusMars className="text-pink-400" /> Giới tính
          </label>
          <select
            className="input-style"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Chọn...</option>
            {GENDER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaBirthdayCake className="text-yellow-400" /> Ngày sinh
          </label>
          <input
            className="input-style"
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaPhone className="text-green-400" /> Số điện thoại
          </label>
          <input
            className="input-style"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="0123 456 789"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-400" /> Địa chỉ
          </label>
          <input
            className="input-style"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="TP Cà Mau, Cà Mau"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaExclamationTriangle className="text-orange-400" /> Liên hệ khẩn cấp
            <span className="text-xs text-gray-400 ml-2">(Tùy chọn)</span>
          </label>
          <input
            className="input-style"
            name="emergency_contact"
            value={form.emergency_contact}
            onChange={handleChange}
            placeholder="Tên & SĐT người thân"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transition"
        >
          {loading ? "Đang lưu..." : "Lưu thông tin"}
        </button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <style>
        {`
          .input-style {
            @apply w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-teal-500 outline-none shadow-sm bg-white transition;
          }
        `}
      </style>
    </form>
  );
}