import React, { useState, useEffect } from 'react';
import {getList} from "../api/user_api"

export default function Destinations() {
  const [hoveredId, setHoveredId] = useState(null);
    const [destination, setDestination] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchDestination() {
        try{
          setLoading(true);
          setError(null);
          const data = await getList('destinations');
          setDestination(data);
        }catch(err){
          setError(err.message || `Có lỗi xảy ra`);
        }finally{
          setLoading(false);
        }
    }
    useEffect(() => {
      fetchDestination()
    }, [])

  const destinationFeatures = destination.filter(d => (d.is_featured === true))
  return (
    <>
    {loading && <div className="flex flex-col items-center py-28 text-cyan-600 font-bold text-xl">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-cyan-200 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-t-transparent border-cyan-500 rounded-full animate-spin"></div>
      </div>
      <p className="animate-pulse">Đang khám phá các địa điểm tuyệt vời...</p>
    </div>}
    {error && <div className="text-center text-red-500 py-6">{error}</div>}
    <section className="container max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 relative inline-block">
          <span className="text-emerald-600">Điểm Đến Nổi Bật</span>
          <div className="absolute w-full h-1 bg-emerald-500 bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        </h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Khám phá những điểm đến tuyệt vời nhất tại Cà Mau với cảnh quan thiên nhiên tuyệt đẹp và trải nghiệm văn hóa độc đáo</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinationFeatures.map((destination) => (
          <div 
            key={destination.id} 
            className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onMouseEnter={() => setHoveredId(destination.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-72 overflow-hidden">
              <img 
                src={destination.image_url} 
                alt={destination.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-70"></div>
              
              <div className={`absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-300 ${hoveredId === destination.id ? 'translate-y-0' : 'translate-y-4'}`}>
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <p className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 truncate text-overflow`}>
                  {destination.description}
                </p>
                <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                  <a href={`destinations/${destination.id}`}>
                  <span>Khám phá</span>

                  </a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-emerald-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{destination.id}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex mx-auto items-center gap-2">
          <a href={`destinations/`}>
          <span>Xem tất cả điểm đến</span>
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
    </>

  );
}

