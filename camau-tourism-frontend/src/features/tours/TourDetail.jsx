import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { getDetail, getList } from "../../api/user_api"
const TourDetail = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tour, setTour] = useState([])
  const [tourDestinations, setTourDestination] = useState([])
  const { id, slug } = useParams()

  async function fetchTourDetailData() {
    try {
      setLoading(true);
      setError(null);
      const tour = await getDetail('tours', slug);
      const tourDestinations = await getList(`tours/${slug}/tour-destination`);
      setTour(tour);
      setTourDestination(tourDestinations)
    } catch (err) {
      setError(err.message || `Có lỗi xảy ra`);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTourDetailData();
  }, [id])
  const image_destination = tourDestinations.length ? Math.min(...tourDestinations.map(r => +r.image_url)) : null;
  const tourData = {
    id: 1,
    name: "Khám phá Vịnh Hạ Long huyền bí",
    image: "/images/halong.jpg",
    description: `<p class="text-lg">Hành trình đưa bạn đến với <strong>Vịnh Hạ Long</strong> - Kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ mọc lên từ mặt biển xanh ngọc bích.</p>
    <p>Bạn sẽ được:</p>
    <ul>
      <li>Khám phá hang động tuyệt đẹp</li>
      <li>Tắm biển tại bãi tắm hoang sơ</li>
      <li>Thưởng thức hải sản tươi ngon</li>
      <li>Ngắm hoàng hôn trên vịnh</li>
    </ul>
    <p>Hãy chuẩn bị máy ảnh để lưu lại những khoảnh khắc đáng nhớ!</p>`,
    price: 2500000,
    duration: 3,
    max_people: 20,
    min_people: 1,
    available_dates: ["2025-05-10", "2025-05-15", "2025-05-22", "2025-05-30"],
    is_active: true,
    tour_guide: {
      id: 1,
      name: "Nguyễn Văn A",
      experience: 5,
      avatar: "/images/guide.jpg"
    },
    destinations: [
      {
        id: 1,
        destination: {
          id: 1,
          name: "Hang Sửng Sốt",
          location: "Đảo Bồ Hòn, Vịnh Hạ Long",
          description: "Một trong những hang động đẹp nhất Vịnh Hạ Long",
          image: "/images/sungsot.jpg"
        },
        start_time: "09:00",
        end_time: "11:00",
        note: "Mang theo giày đi bộ thoải mái",
        order_in_day: 1
      },
      {
        id: 2,
        destination: {
          id: 2,
          name: "Đảo Ti Tốp",
          location: "Vịnh Hạ Long",
          description: "Bãi tắm đẹp với tầm nhìn toàn cảnh vịnh",
          image: "/images/titop.jpg"
        },
        start_time: "13:00",
        end_time: "15:30",
        note: "Mang theo đồ bơi và kem chống nắng",
        order_in_day: 2
      },
      {
        id: 3,
        destination: {
          id: 3,
          name: "Làng chài Cửa Vạn",
          location: "Vịnh Hạ Long",
          description: "Làng chài nổi trên biển với nét văn hóa độc đáo",
          image: "/images/cuavan.jpg"
        },
        start_time: "16:00",
        end_time: "17:30",
        note: "Cơ hội tìm hiểu đời sống ngư dân",
        order_in_day: 3
      }
    ]
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  const description = tour.description || "";
  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 min-h-screen">
      <div className="relative h-[40vh] overflow-hidden rounded-b-2xl shadow-lg">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center object-cover"
              style={{ backgroundImage: `url(${tour.image})` }}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl text-center"
          >
            {tour.name}
          </motion.h1>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 flex flex-wrap justify-center items-center gap-6 text-lg md:text-xl font-medium"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{tour.duration} ngày</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{tour.min_people}-{tour.max_people} người</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatPrice(tour.price)}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Giới thiệu về tour</h2>
                <div className="prose prose-lg max-w-none text-gray-600" dangerouslySetInnerHTML={{__html:description}}>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Lịch trình chi tiết</h2>

                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-[39px] w-1 bg-gradient-to-b from-blue-500 to-teal-400 rounded-full"></div>

                  {tourDestinations.map((dest, index) => (
                    <div key={dest.id} className="relative mb-16 last:mb-0">
                      <div className="absolute top-0 left-[30px] w-[20px] h-[20px] bg-white border-4 border-blue-500 rounded-full transform translate-y-1"></div>

                      <div className="ml-20">
                        <div className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium mb-2">
                          Điểm dừng {index + 1} • {dest.start_time} - {dest.end_time}
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row items-start gap-4">
                            <div className="w-full md:w-1/3 h-48 overflow-hidden rounded-lg">
                              <img
                                src={`http://localhost:8000${dest.image_destination}`}
                                alt={dest.image_destination}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                              />
                            </div>

                            <div className="flex-1 max-w-lg bg-white rounded-xl">
                              <h3 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="inline-block w-2 h-6 bg-blue-500 rounded-r"></span>
                                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                    {dest.type_destination}
                                  </span>
                                </div>
                                {dest.destination.name}
                              </h3>
                              <div className="flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-lg text-gray-700 font-medium">{dest.name_destination}</span>
                              </div>

                              {dest.note && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg flex items-start gap-3 mt-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p className="text-sm text-yellow-800">{dest.note}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-18"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Đặt tour ngay</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Ngày khởi hành</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option value="">Chọn ngày khởi hành</option>
                        {tourData.available_dates.map(date => (
                          <option key={date} value={date}>{formatDate(date)}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Số người</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        className="flex-1 p-2 text-center focus:outline-none"
                        value={peopleCount}
                        onChange={(e) => setPeopleCount(Math.min(tourData.max_people, Math.max(1, parseInt(e.target.value) || 1)))}
                        min={1}
                        max={tourData.max_people}
                      />
                      <button
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setPeopleCount(Math.min(tourData.max_people, peopleCount + 1))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Giá gốc × {peopleCount} người</span>
                      <span className="text-gray-900">{formatPrice(tourData.price * peopleCount)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Thuế và phí</span>
                      <span className="text-gray-900">{formatPrice(tourData.price * peopleCount * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base mt-4">
                      <span>Tổng cộng</span>
                      <span className="text-blue-600">{formatPrice(tourData.price * peopleCount * 1.1)}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg hover:from-blue-600 hover:to-teal-500 transition transform hover:scale-[1.02] hover:shadow-lg">
                    Đặt tour ngay
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-2">
                    Chỉ cần đặt cọc {formatPrice(tourData.price * 0.3)} để giữ chỗ
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">Miễn phí hủy trước 7 ngày</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">Bao gồm bữa ăn và phương tiện di chuyển</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">Hướng dẫn viên chuyên nghiệp</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>



      {/* FAQ */}
      {/* <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-12">Câu hỏi thường gặp</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                  <span>Tôi nên mang theo những gì cho chuyến đi?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>Bạn nên mang theo: quần áo thoải mái, đồ bơi, kem chống nắng, mũ, kính râm, thuốc chống say tàu xe (nếu cần), máy ảnh, sạc dự phòng và một ít tiền mặt cho các chi tiêu cá nhân.</p>
                </div>
              </details>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                  <span>Chuyến đi có phù hợp với người cao tuổi không?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>Chuyến đi có thể điều chỉnh phù hợp với người cao tuổi. Tuy nhiên, một số hoạt động như leo núi, chèo thuyền kayak có thể yêu cầu sức khỏe tốt. Vui lòng thông báo trước nếu có người cao tuổi tham gia để chúng tôi sắp xếp lịch trình phù hợp.</p>
                </div>
              </details>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                  <span>Tôi có thể hủy tour và được hoàn tiền không?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>Bạn có thể hủy tour và được hoàn tiền 100% nếu hủy trước 7 ngày. Hủy từ 3-7 ngày trước chuyến đi, bạn sẽ được hoàn 50% tổng giá trị tour. Hủy dưới 3 ngày, rất tiếc chúng tôi không thể hoàn tiền.</p>
                </div>
              </details>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                  <span>Có wifi tại khách sạn và trên tàu không?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>Khách sạn có wifi miễn phí. Trên tàu tham quan cũng có wifi nhưng tín hiệu có thể không ổn định khi ở những khu vực xa bờ hoặc trong hang động. Chúng tôi khuyến khích bạn tận hưởng khung cảnh thiên nhiên và tạm gác lại các thiết bị điện tử trong chuyến đi.</p>
                </div>
              </details>
            </motion.div>
          </div>
        </div>
      </div> */}


      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button className="bg-gradient-to-r from-blue-500 to-teal-400 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-teal-500 transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </motion.div>

    </div>
  );
};

export default TourDetail;