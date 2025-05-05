import React, { useEffect, useState } from "react";
import {getList, getDetail} from "../../api/user_api"
import { useParams } from "react-router-dom";
import HotelGallery from "../../components/Hotels/HotelDetail/HotelGallery"
import HotelInfo from "../../components/Hotels/HotelDetail/HotelInfo"
import RoomList from "../../components/Hotels/HotelDetail/RoomList";
import LocationMap from "../../components/Hotels/HotelDetail/LocationMap";
export default function HotelDetailPage({}) {
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hotelId, slug } = useParams();
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const hotelData = await getDetail("hotels", slug);
          const roomList = await getList(`hotels/${slug}/rooms`);
          setRooms(roomList);
          setHotel(hotelData);
          let imgArr = [];
          if (hotelData.image_cover) imgArr.push(hotelData.image_cover);
          setGalleryImages([...new Set(imgArr)]);
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [slug]);
    if (loading) {
      return <div className="min-h-screen flex justify-center items-center text-xl text-blue-700">Đang tải dữ liệu...</div>
    }
    if (!hotel) return <div className="min-h-screen flex justify-center items-center text-red-700">Không tìm thấy khách sạn</div>;
    const minPrice = rooms.length ? Math.min(...rooms.map(r => +r.price)) : null;
    const mapSrc = (hotel.latitude && hotel.longitude) ? `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=16&output=embed`: `https://maps.google.com/maps?q=${encodeURIComponent(hotel.address)}&z=16&output=embed`

    return (
      
      <div className="bg-gradient-to-b min-h-screen font-sans r-1ihkh82">
        <div className="max-w-7xl mx-auto px-4 flex-col flex pt-8">
          <HotelGallery images={galleryImages} />
            <div className="r-cqzzvf r-f1w8kp r-3mtglp r-1yos0t3 shadow">
            <HotelInfo hotel={hotel} minPrice={minPrice}/>
            <div className="w-full"><span className="py-2 px-4 text-2xl font-bold">Những phòng trống tại {hotel.name}</span></div>
            <RoomList rooms={rooms}/>
            <LocationMap hotel={hotel.name} mapSrc={mapSrc}/>
            </div>
        </div> 
        
      </div>
    );
}