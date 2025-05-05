import React from 'react';

function BlogSection() {
  const experiences = [
    {
      id: 1,
      title: 'Trải nghiệm sinh thái',
      icon: 'leaf',
      description: 'Khám phá hệ sinh thái rừng ngập mặn, tham quan vườn quốc gia và trải nghiệm cuộc sống hoang dã.',
      color: 'from-green-500 to-emerald-700',
      image: 'src/assets/images/experiences/eco-tour.jpg'
    },
    {
      id: 2,
      title: 'Ẩm thực đặc sắc',
      icon: 'utensils',
      description: 'Thưởng thức các món ăn truyền thống của Cà Mau như cua biển, tôm sú, mật ong rừng U Minh và nhiều hơn nữa.',
      color: 'from-orange-400 to-red-600',
      image: 'src/assets/images/experiences/food-tour.jpg'
    },
    {
      id: 3,
      title: 'Khám phá văn hóa',
      icon: 'landmark',
      description: 'Tìm hiểu về lịch sử, văn hóa và con người Cà Mau qua các lễ hội truyền thống và làng nghề địa phương.',
      color: 'from-purple-500 to-indigo-700',
      image: 'src/assets/images/experiences/cultural-tour.jpg'
    },
    {
      id: 4,
      title: 'Du lịch biển đảo',
      icon: 'umbrella-beach',
      description: 'Khám phá bãi biển hoang sơ, tham gia các hoạt động thể thao nước và thư giãn trên bờ biển.',
      color: 'from-blue-400 to-cyan-600',
      image: 'src/assets/images/experiences/beach-tour.jpg'
    }
  ];
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'leaf':
        return (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'utensils':
        return (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'landmark':
        return (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'umbrella-beach':
        return (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Trải nghiệm tuyệt vời tại Cà Mau</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Khám phá những trải nghiệm độc đáo và đáng nhớ chỉ có tại vùng đất Cà Mau. Từ thiên nhiên hoang dã đến văn hóa bản địa và ẩm thực đặc sắc.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="group relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              
              <img 
                src={exp.image} 
                alt={exp.title}
                className="w-full h-96 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${exp.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(exp.icon)}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-gray-200 opacity-90 mb-4 line-clamp-3">{exp.description}</p>
                
                <button className="text-white font-semibold group-hover:text-cyan-300 transition-colors duration-200 flex items-center">
                  Khám phá ngay
                  <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}

export default BlogSection;