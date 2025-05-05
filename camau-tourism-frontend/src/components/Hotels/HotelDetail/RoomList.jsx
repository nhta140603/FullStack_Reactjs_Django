import React, { useState } from "react";

export default function RoomList({ rooms }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!rooms.length) return null;

  const room = rooms[activeIndex];

  return (
    <div className="w-full">
      <div className="flex border-b mb-4 gap-2">
        {rooms.map((r, i) => (
          <button
            key={i}
            className={
              `px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-200 ` +
              (activeIndex === i
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-500")
            }
            onClick={() => setActiveIndex(i)}
          >
            {r.room_type}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 w-full flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center">
          <img
            src={`http://localhost:8000//${room.image_url}`}
            alt={room.room_type}
            className="rounded-lg w-full object-cover h-40 mb-2"
          />
          <h2 className="text-lg font-semibold mb-2">{room.room_type}</h2>
          <div className="flex flex-col gap-1 text-sm text-gray-700 w-full">
            <div className="flex items-center gap-2">
              <span>📏</span>
              <span>
                {room.floor ? `${room.floor} tầng` : "Diện tích tiêu chuẩn"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{room.capacity} khách</span>
            </div>
            <div className="flex items-center gap-2">
              <span>❄️</span>
              <span>Máy lạnh</span>
            </div>
          </div>
          <a
            href="#"
            className="text-blue-500 text-sm mt-2 hover:underline"
          >
            Xem chi tiết phòng
          </a>
        </div>

        <div className="md:w-2/3 w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-800 text-sm">
                <th className="text-left p-2 font-semibold border-b">
                  Lựa chọn phòng
                </th>
                <th className="text-center p-2 font-semibold border-b">
                  Khách
                </th>
                <th className="text-center p-2 font-semibold border-b">
                  Giá/phòng/đêm
                </th>
                <th className="border-b"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 align-top">
                  <div className="text-xs text-gray-600">{room.room_type}</div>
                  {room.facilities && (
                    <div className="text-xs text-gray-500">
                      {room.facilities.join(", ")}
                    </div>
                  )}
                </td>
                <td className="text-center align-top p-2">
                  <div className="flex items-center justify-center gap-1">
                    <span>👤</span>
                    <span>{room.capacity}</span>
                  </div>
                </td>
                <td className="text-center align-top p-2">
                  <div className="text-xs line-through text-gray-400">
                    {(room.price * 1.1).toLocaleString()} VND
                  </div>
                  <div className="text-red-500 font-bold text-lg">
                    {Number(room.price).toLocaleString()} VND
                  </div>
                  <div className="text-xs text-gray-500">
                    Chưa bao gồm thuế và phí
                  </div>
                </td>
                <td className="text-center align-top p-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded font-semibold">
                    Chọn
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}