import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../api/user_api";

export default function EventsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);
      const data = await getList("festivals");
      setEvents(data);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Đang cập nhật";

    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMonthFromDate = (dateString) => {
    if (!dateString) return 0;
    const [day, month] = dateString.split('/');
    return parseInt(month);
  };

  const filterEvents = (filter) => {
    setActiveFilter(filter);
  };

  const filteredEvents = events.filter(event => {
    if (activeFilter === "all") return true;

    const currentMonth = new Date().getMonth() + 1;
    const eventMonth = getMonthFromDate(event.event_date);

    if (activeFilter === "upcoming" && eventMonth >= currentMonth) return true;
    if (activeFilter === "past" && eventMonth < currentMonth) return true;
    return false;
  });

  const eventPairs = [];
  for (let i = 0; i < filteredEvents.length; i += 2) {
    if (i + 1 < filteredEvents.length) {
      eventPairs.push([filteredEvents[i], filteredEvents[i + 1]]);
    } else {
      eventPairs.push([filteredEvents[i]]);
    }
  }

  return (
    <div className="pb-16 max-w-full mx-auto">
      <div className="w-full h-full md:h-96 relative overflow-hidden mb-10">
        <img
          src="https://fileapidulich.surelrn.vn/Upload/Banner/Festival/30/Picture/R637122681115439248.png"
          alt="Cà Mau"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg">Lễ Hội Tại Cà Mau</h1>
          <p className="text-lg md:text-xl text-white text-center max-w-2xl drop-shadow-md">
            Khám phá các sự kiện văn hóa, lễ hội và hoạt động độc đáo tại vùng đất mũi
          </p>
          <div className="mt-8">
            <div className="inline-flex p-1 bg-white/20 backdrop-blur-sm rounded-full">
              <button
                onClick={() => filterEvents("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === "all" ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-white/10"}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => filterEvents("upcoming")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === "upcoming" ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-white/10"}`}
              >
                Sắp diễn ra
              </button>
              <button
                onClick={() => filterEvents("past")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === "past" ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-white/10"}`}
              >
                Đã diễn ra
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-16 max-w-7xl mx-auto">
        <div className="px-4">
          {loading && (
            <div className="flex flex-col items-center py-20 text-indigo-600 font-bold text-xl">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute top-0 left-0 w-full h-full border-8 border-indigo-200 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-0 left-0 w-full h-full border-8 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
              </div>
              <p className="animate-pulse">Đang tải các sự kiện hấp dẫn...</p>
            </div>
          )}

          {error && <div className="text-center text-red-500 py-6">{error}</div>}

          {!loading && events.length === 0 && (
            <div className="bg-indigo-50 rounded-xl p-10 text-center mt-8">
              <svg className="w-16 h-16 mx-auto text-indigo-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Hiện chưa có sự kiện nào</h3>
              <p className="text-indigo-600">Vui lòng quay lại sau để khám phá các sự kiện hấp dẫn sắp tới tại Cà Mau.</p>
            </div>
          )}

          {!loading && filteredEvents.length > 0 && (
            <div className="space-y-8">
              {eventPairs.map((pair, pairIndex) => (
                <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pair.map((event, index) => (
                    <div
                      key={event.id}
                      className={`relative overflow-hidden group cursor-pointer transition-all duration-500 rounded-2xl hover:shadow-xl ${(pairIndex + index) % 3 === 0 ? 'bg-gradient-to-r from-indigo-50 to-indigo-100' : (pairIndex + index) % 3 === 1 ? 'bg-gradient-to-r from-teal-50 to-teal-100' : 'bg-gradient-to-r from-amber-50 to-amber-100'}`}
                      onClick={() => navigate(`/le-hoi/${event.slug}`)}
                    >
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-200 to-indigo-300 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-2/5 overflow-hidden">
                          <img
                            src={event.image_url || "https://placehold.co/400x200/indigo/white?text=Sự+Kiện"}
                            alt={event.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          {(pairIndex === 0 && index === 0) && (
                            <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                              Nổi bật
                            </div>
                          )}
                        </div>

                        <div className="relative flex flex-col p-6 md:w-3/5">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 mb-3">
                            {event.title}
                          </h3>

                          <div className="flex items-center gap-3 mb-4">
                            <div className={`flex items-center justify-center p-2 rounded-full ${(pairIndex + index) % 3 === 0 ? 'bg-indigo-200' : (pairIndex + index) % 3 === 1 ? 'bg-teal-200' : 'bg-amber-200'}`}>
                              <svg className="w-5 h-5 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-indigo-700">{event.event_date}</span>
                          </div>
                          <div className="mt-auto space-y-4">
                            {event.address && (
                              <div className="flex items-start gap-2 text-gray-600 text-sm">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>{event.address}</span>
                              </div>
                            )}

                            <div className="flex justify-end">
                              <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium group-hover:scale-105 transition-all duration-300 ${(pairIndex + index) % 3 === 0 ? 'bg-indigo-600 text-white' : (pairIndex + index) % 3 === 1 ? 'bg-teal-600 text-white' : 'bg-amber-600 text-white'}`}>
                                <span>Xem chi tiết</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {!loading && filteredEvents.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/4"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">Không bỏ lỡ sự kiện nào tại Cà Mau!</h3>
                  <p className="text-indigo-100">Đăng ký nhận thông báo về các sự kiện mới và hấp dẫn nhất. Chúng tôi sẽ gửi thông tin trực tiếp đến email của bạn.</p>
                </div>
                <div className="md:w-1/3 w-full">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm p-1 rounded-full flex">
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      className="flex-1 bg-transparent px-4 py-2 text-white placeholder-indigo-200 outline-none"
                    />
                    <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-colors">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}