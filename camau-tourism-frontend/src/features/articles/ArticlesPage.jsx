import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getList } from "../../api/user_api";
import ArticleFilter from "../../components/Articles/ArticleFilter"
import LatestArticles from "../../components/Articles/LatestArticles"
import FeaturedEvent from "../../components/Articles/FeaturedEvents"
import ArticleCard from "../../components/Articles/ArticleCard"
import FilterBar from "../../components/Articles/FilterBar"

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [view, setView] = useState("list");
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;

    async function fetchArticles() {
        try {
            setLoading(true);
            setError(null);
            const data = await getList('articles');
            setArticles(data);
            setFilteredArticles(data);

            const typeParam = searchParams.get('type');
            if (typeParam) {
                setActiveFilter(typeParam);
            }

            const searchParam = searchParams.get('search');
            if (searchParam) {
                setSearchQuery(searchParam);
            }

            const pageParam = searchParams.get('page');
            if (pageParam) {
                setCurrentPage(parseInt(pageParam, 10));
            }

        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        let filtered = [...articles];

        // Type filter
        if (activeFilter) {
            filtered = filtered.filter(article => article.type === activeFilter);
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredArticles(filtered);
        setCurrentPage(1);

        // Update URL params
        const params = new URLSearchParams();
        if (activeFilter) params.set('type', activeFilter);
        if (searchQuery) params.set('search', searchQuery);
        if (currentPage > 1) params.set('page', currentPage.toString());
        setSearchParams(params);

    }, [activeFilter, searchQuery, articles]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (currentPage > 1) {
            params.set('page', currentPage.toString());
        } else {
            params.delete('page');
        }
        setSearchParams(params);
    }, [currentPage]);


    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const handleTypeChange = (type) => {
        setActiveFilter(type);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const SkeletonCard = ({ viewType }) => {
        if (viewType === "grid") {
            return (
                <div className="bg-white rounded-lg shadow overflow-hidden h-full animate-pulse">
                    <div className="h-48 w-full bg-gray-200"></div>
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="bg-white rounded-lg shadow overflow-hidden flex animate-pulse">
                    <div className="w-1/3 md:w-1/4 bg-gray-200"></div>
                    <div className="p-4 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                </div>
            );
        }
    };
    const events = articles.filter(article => article.type === 'event');

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="w-full h-full md:h-96 relative overflow-hidden mb-10">
                <img
                    src="https://fileapidulich.surelrn.vn/Upload/Banner/undefined/30/Picture/R637946840470742404.png"
                    alt="Cà Mau"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tin tức & Sự kiện</h1>
                    <p className="text-gray-600 mt-2">Cập nhật những thông tin và sự kiện mới nhất</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                        <div className="sticky top-20">
                            <ArticleFilter
                                activeType={activeFilter}
                                onTypeChange={handleTypeChange}
                            />

                            <LatestArticles articles={articles} />

                            <FeaturedEvent events={events} />
                        </div>
                    </div>

                    <div className="md:w-3/4">

                        <FilterBar
                            onViewChange={handleViewChange}
                            count={filteredArticles.length}
                            view={view}
                        />

                        {loading ? (
                            <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                                {[...Array(6)].map((_, index) => (
                                    <SkeletonCard key={index} viewType={view} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                                {error}
                            </div>
                        ) : filteredArticles.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-gray-600">Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc hiện tại.</p>
                                {(activeFilter || searchQuery) && (
                                    <button
                                        onClick={() => {
                                            setActiveFilter(null);
                                            setSearchQuery("");
                                        }}
                                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                                    {currentArticles.map(article => (
                                        <ArticleCard key={article.id} article={article} viewType={view} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}