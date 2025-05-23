import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../api/user_api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventHeroSection({ title, image }) {
  return (
    <div className="relative min-h-[300px] md:min-h-[400px] rounded-3xl overflow-hidden shadow-xl flex items-end">
      <img
        src={image || "/default-event-banner.jpg"}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full z-0"
        style={{ filter: "brightness(0.7)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-5"></div>
      <div className="relative z-10 px-6 py-10 md:py-16 w-full">
        <div className="inline-block bg-cyan-600 text-white text-xs px-3 py-1 rounded-full shadow mb-3">
          Sự kiện nổi bật
        </div>
        <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-1">{title}</h1>
      </div>
    </div>
  );
}

function CountdownTimer({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({});
  
  useEffect(() => {
    try {
      const calculateTimeLeft = () => {
        const targetDate = new Date(eventDate.split('-')[0].trim());
        const now = new Date();
        
        if (isNaN(targetDate.getTime())) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
        }
        
        const difference = targetDate - now;
        const isPast = difference < 0;
        
        if (isPast) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
        }
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isPast: false
        };
      };
      
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      
      setTimeLeft(calculateTimeLeft());
      
      return () => clearInterval(timer);
    } catch (error) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
  }, [eventDate]);
  
  if (!eventDate || timeLeft.isPast) {
    return null;
  }
  
  return (
    <div className="flex flex-col items-center mt-4">
      <h3 className="text-lg text-gray-700 mb-2">Sự kiện bắt đầu sau:</h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg shadow-md">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-cyan-100">Ngày</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg shadow-md">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-cyan-100">Giờ</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg shadow-md">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-cyan-100">Phút</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg shadow-md">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-cyan-100">Giây</div>
        </div>
      </div>
    </div>
  );
}

function EventInfoCard({ icon, title, value }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-md transition-all hover:shadow-lg">
      <div className="bg-cyan-100 p-3 rounded-full mr-4 text-cyan-700">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function FestivalDetail() {
  const { id, slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getDetail("festivals", slug)
      .then(setEvent)
      .catch(() => toast.error("Không tìm thấy sự kiện!"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Khám phá sự kiện: ${event.title}`,
        url: window.location.href,
      })
      .catch((error) => toast.error("Không thể chia sẻ: " + error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép liên kết vào clipboard!");
    }
  };

  const handleAddToCalendar = () => {
    try {
      // Extract date from event_date string (assuming format like "15/05/2023 - Starts at 08:00")
      let dateStr = event.event_date;
      let dateObj = null;
      
      // Try to extract a date from the string
      const dateMatch = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (dateMatch) {
        // Format: DD/MM/YYYY
        dateObj = new Date(`${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`);
      }
      
      // Try to extract time if available
      let timeStr = "";
      const timeMatch = dateStr.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        timeStr = `T${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}:00`;
      } else {
        timeStr = "T090000"; // Default to 9 AM if no time specified
      }
      
      if (dateObj && !isNaN(dateObj)) {
        const formattedDate = dateObj.toISOString().split('T')[0] + timeStr;
        const endTime = new Date(dateObj.getTime() + 2 * 60 * 60 * 1000).toISOString().split('T')[0] + timeStr.replace(/\d{2}:/, (h) => {
          const hour = parseInt(h) + 2;
          return `${hour.toString().padStart(2, '0')}:`;
        });
        
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formattedDate.replace(/[-:]/g, '')}/${endTime.replace(/[-:]/g, '')}&details=${encodeURIComponent(event.description ? event.description.replace(/<[^>]*>/g, '') : '')}&location=${encodeURIComponent(event.address || '')}`;
        window.open(calendarUrl, '_blank');
      } else {
        toast.warning("Không thể xác định ngày chính xác. Vui lòng thêm thủ công vào lịch.");
      }
    } catch (error) {
      toast.error("Không thể thêm vào lịch!");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></span>
      </div>
    );

  if (!event)
    return (
      <div className="text-center py-20">
        <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-red-500">Không tìm thấy sự kiện</h2>
        <p className="text-gray-500 mt-2">Sự kiện có thể đã bị xóa hoặc không tồn tại</p>
      </div>
    );

  const eventImage = event.image_url || "/default-event-image.jpg";
  const address = event.address || "";
  const hasAddress = address && address.trim().length > 4;
  const mapSrc = hasAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`
    : null;

  // Format event date for display
  let formattedDate = event.event_date || "Đang cập nhật";
  // Try to extract and beautify the date format if possible
  if (formattedDate.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/)) {
    // Already in a readable format, keep as is
  } else if (formattedDate.match(/\d{4}-\d{2}-\d{2}/)) {
    // ISO format, convert to DD/MM/YYYY
    const parts = formattedDate.split('-');
    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 md:p-7">
        <EventHeroSection title={event.title} image={eventImage} />
        
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 border-b pb-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {event.is_featured && (
                  <span className="inline-block bg-cyan-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    Sự kiện nổi bật
                  </span>
                )}
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full shadow-sm">
                  {formattedDate}
                </span>
              </div>
              
              <CountdownTimer eventDate={formattedDate} />
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <button 
                onClick={handleAddToCalendar}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Thêm vào lịch
              </button>
              
              <button 
                onClick={handleShareEvent}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Chia sẻ
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thông tin sự kiện
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <EventInfoCard 
                    icon={
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    } 
                    title="Thời gian" 
                    value={formattedDate} 
                  />
                  
                  <EventInfoCard 
                    icon={
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    } 
                    title="Địa điểm" 
                    value={address || "Đang cập nhật"} 
                  />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Chi tiết sự kiện
                  </h2>
                  
                  <div className="bg-white rounded-xl overflow-hidden transition-all">
                    <div className="p-1">
                      <div 
                        className="prose max-w-none prose-img:rounded-xl prose-img:shadow-md prose-headings:text-cyan-700 
                        prose-a:text-cyan-600 prose-a:underline prose-table:rounded-lg prose-table:shadow"
                        dangerouslySetInnerHTML={{ __html: event.description || '<p>Chưa có thông tin chi tiết.</p>' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <img 
                    src={eventImage} 
                    alt={event.title} 
                    className="w-full h-[200px] object-cover" 
                  />
                </div>
                
                {mapSrc && (
                  <div>
                    <h2 className="text-lg font-bold text-cyan-900 mb-3 flex items-center">
                      <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Vị trí
                    </h2>
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <iframe
                        src={mapSrc}
                        className="w-full h-[250px]"
                        frameBorder="0"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex="0"
                        title="Google Map"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                
                <div className="bg-cyan-50 p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-cyan-800 mb-2">Lưu ý quan trọng:</h3>
                  <ul className="text-sm text-cyan-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-1 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Vui lòng kiểm tra thời gian sự kiện trước khi tham gia</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-1 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Đến sớm để có vị trí thuận lợi</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-1 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Sự kiện có thể thay đổi nếu có thông báo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}