import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetail } from "../../api/user_api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Article Reading Progress Indicator
function ReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = (currentPosition / scrollHeight) * 100;
      setReadingProgress(percentage);
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
        style={{ width: `${readingProgress}%` }}
      ></div>
    </div>
  );
}

// Article Heading Component
function ArticleHeading({ title, date, type, readTime }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          type === 'news' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {type === 'news' ? 'Tin tức' : 'Sự kiện'}
        </span>
        <span className="text-gray-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </span>
        <span className="text-gray-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {readTime} phút đọc
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>
    </div>
  );
}

function RelatedArticles({ articles }) {
  return (
    <div className="mt-12 border-t pt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            to={`/articles/${article.id}`} 
            className="group block overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.cover_image_url || "/default-article.jpg"} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  article.type === 'news' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                }`}>
                  {article.type === 'news' ? 'Tin tức' : 'Sự kiện'}
                </span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {article.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{new Date(article.created_at).toLocaleDateString('vi-VN')}</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {Math.floor(Math.random() * 1000) + 100}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TableOfContents() {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState("");
  
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.article-content h2, .article-content h3'));
    const tocItems = headings.map(heading => ({
      id: heading.id,
      text: heading.textContent,
      level: heading.tagName === 'H2' ? 2 : 3
    }));
    
    setToc(tocItems);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );
    
    headings.forEach(heading => observer.observe(heading));
    
    return () => headings.forEach(heading => observer.unobserve(heading));
  }, []);
  
  if (toc.length === 0) return null;
  
  return (
    <div className="sticky top-10 hidden lg:block">
      <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Mục lục
        </h3>
        <ul className="space-y-1.5">
          {toc.map(item => (
            <li 
              key={item.id}
              className={`text-sm transition-all duration-200 ${
                item.level === 3 ? 'ml-4' : ''
              }`}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 px-2 rounded-md hover:bg-gray-100 ${
                  activeId === item.id 
                    ? 'text-orange-600 font-medium bg-orange-50 border-l-2 border-orange-500' 
                    : 'text-gray-600'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ArticleSidebar({ article, eventDate, categoryLink, authorAvatar, authorName }) {
  const [showSticky, setShowSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowSticky(scrollPosition > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <img 
              src={authorAvatar || "https://ui-avatars.com/api/?name=Admin&background=random"} 
              alt={authorName}
              className="w-12 h-12 rounded-full mr-4 shadow-sm"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">Tác giả</p>
              <h3 className="font-bold text-gray-900">{authorName || "Admin"}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Đăng tải lúc: {format(new Date(article.created_at), 'HH:mm - dd/MM/yyyy', {locale: vi})}
            </p>
            {article.updated_at && article.updated_at !== article.created_at && (
              <p className="text-sm text-gray-500">
                Cập nhật lúc: {format(new Date(article.updated_at), 'HH:mm - dd/MM/yyyy', {locale: vi})}
              </p>
            )}
          </div>
        </div>
        
        <TableOfContents />
        
        {article.type === 'event' && eventDate && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Thời gian diễn ra
            </h3>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
              <div className="text-center w-1/4">
                <div className="text-2xl font-bold text-purple-700">
                  {format(new Date(eventDate), 'dd', {locale: vi})}
                </div>
                <div className="text-xs text-gray-500">
                  {format(new Date(eventDate), 'MMM', {locale: vi})}
                </div>
              </div>
              <div className="text-center w-1/2">
                <div className="text-sm font-medium text-gray-800">
                  {format(new Date(eventDate), 'EEEE', {locale: vi})}
                </div>
                <div className="text-base font-bold text-purple-700">
                  {format(new Date(eventDate), 'HH:mm', {locale: vi})}
                </div>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 text-xs rounded-lg transition-colors shadow-sm">
                Thêm lịch
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3">Danh mục</h3>
          <Link 
            to={categoryLink || "#"} 
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">
              {article.type === 'news' ? 'Tin tức' : 'Sự kiện'}
            </span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default function ArticleDetailPage() {
  const { slug, id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const contentRef = useRef(null);
  
  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime < 1 ? 1 : readingTime;
  };
  
  useEffect(() => {
    setLoading(true);
    
    getDetail("articles", slug)
      .then(data => {
        setArticle(data);
        
        setTimeout(() => {
          if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            headings.forEach((heading, index) => {
              heading.id = `heading-${index}`;
            });
          }
        }, 100);
        
       fetch(`/api/articles?type=${data.type}&limit=3&exclude=${id}`)
          .then(res => res.json())
          .then(setRelatedArticles)
          .catch(() => {
            setRelatedArticles([
              {
                id: 101,
                title: "Bài viết liên quan 1",
                type: data.type,
                cover_image_url: "https://source.unsplash.com/random/300x200?sig=1",
                created_at: new Date().toISOString()
              },
              {
                id: 102,
                title: "Bài viết liên quan 2",
                type: data.type,
                cover_image_url: "https://source.unsplash.com/random/300x200?sig=2",
                created_at: new Date().toISOString()
              },
              {
                id: 103,
                title: "Bài viết liên quan 3",
                type: data.type,
                cover_image_url: "https://source.unsplash.com/random/300x200?sig=3",
                created_at: new Date().toISOString()
              }
            ]);
          });
      })
      .catch(() => toast.error("Không tìm thấy bài viết!"))
      .finally(() => setLoading(false));
    
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="w-24 h-24 mb-6 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h1>
        <p className="text-gray-600 mb-6">Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
        <Link to="/news" className="px-5 py-2 bg-orange-600 text-white rounded-lg shadow-sm hover:bg-orange-700 transition-colors">
          Quay lại trang tin tức
        </Link>
      </div>
    );
  }

  const formattedDate = article.created_at ? format(new Date(article.created_at), 'dd/MM/yyyy', {locale: vi}) : "";
  const readTime = calculateReadingTime(article.content);
  const categoryLink = article.type === 'news' ? '/news' : '/events';
  const eventDate = article.event_date ? new Date(article.event_date) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <ReadingProgress />
      
      
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Link to={categoryLink} className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 mb-6 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại {article.type === 'news' ? 'tin tức' : 'sự kiện'}
          </Link>
        </div>
        
        <ArticleHeading 
          title={article.title} 
          date={formattedDate} 
          type={article.type} 
          readTime={readTime} 
        />
        
        {article.cover_image_url && (
          <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={article.cover_image_url} 
              alt={article.title}
              className="w-full object-cover h-auto md:h-[450px]"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 lg:p-10">
                <div 
                  ref={contentRef}
                  className="article-content prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t">
                  <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                  {['tin-tuc', 'su-kien', 'noi-bat'].map((tag) => (
                    <Link 
                      key={tag} 
                      to={`/tags/${tag}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                {/* <div className="flex items-center justify-center mt-8 pt-6 border-t lg:hidden">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-md"
                      aria-label="Chia sẻ lên Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success("Đã sao chép liên kết vào clipboard!"))}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-white shadow-md"
                      aria-label="Sao chép liên kết"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div> */}
              </div>
            </article>
            {/* <RelatedArticles articles={relatedArticles} /> */}
          </div>
          
          <ArticleSidebar 
            article={article} 
            eventDate={eventDate} 
            categoryLink={categoryLink}
            authorAvatar="https://ui-avatars.com/api/?name=Admin&background=f97316"
            authorName="Admin"
          />
        </div>
      </div>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}