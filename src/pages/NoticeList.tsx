import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Eye, ChevronRight } from 'lucide-react';

type Category = '전체' | '학사' | '장학' | '취업' | '일반';

interface Notice {
    id: number;
    category: Category;
    title: string;
    date: string;
    views: number;
    isNew: boolean;
    isPinned: boolean;
}

function NoticeList() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

    // 더미 데이터
    const allNotices: Notice[] = [
        { id: 1, category: '학사', title: '2026학년도 1학기 수강신청 안내', date: '2026-01-10', views: 523, isNew: true, isPinned: true },
        { id: 2, category: '장학', title: '2026년 국가장학금 신청 안내', date: '2026-01-09', views: 412, isNew: true, isPinned: true },
        { id: 3, category: '취업', title: '2026 상반기 채용박람회 개최 안내', date: '2026-01-08', views: 356, isNew: true, isPinned: false },
        { id: 4, category: '학사', title: '중간고사 일정 안내', date: '2026-01-07', views: 289, isNew: false, isPinned: false },
        { id: 5, category: '일반', title: '도서관 방학 중 운영시간 변경 안내', date: '2026-01-06', views: 178, isNew: false, isPinned: false },
        { id: 6, category: '학사', title: '휴학 및 복학 신청 기간 안내', date: '2026-01-05', views: 445, isNew: false, isPinned: false },
        { id: 7, category: '장학', title: '성적우수장학금 신청 안내', date: '2026-01-04', views: 321, isNew: false, isPinned: false },
        { id: 8, category: '취업', title: 'IT기업 인턴십 프로그램 안내', date: '2026-01-03', views: 267, isNew: false, isPinned: false },
        { id: 9, category: '일반', title: '학생식당 메뉴 개선 안내', date: '2026-01-02', views: 156, isNew: false, isPinned: false },
        { id: 10, category: '학사', title: '학점포기제도 운영 안내', date: '2026-01-01', views: 234, isNew: false, isPinned: false }
    ];

    const categories: Category[] = ['전체', '학사', '장학', '취업', '일반'];

    // 실시간 검색 & 카테고리 필터링
    const filteredNotices = useMemo(() => {
        return allNotices.filter(notice => {
            const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // 고정 공지와 일반 공지 분리
    const pinnedNotices = filteredNotices.filter(n => n.isPinned);
    const regularNotices = filteredNotices.filter(n => !n.isPinned);

    const getCategoryColor = (category: Category) => {
        const colors = {
            '학사': 'bg-blue-100 text-blue-700',
            '장학': 'bg-primary-100 text-primary-700',
            '취업': 'bg-purple-100 text-purple-700',
            '일반': 'bg-gray-100 text-gray-700',
            '전체': 'bg-gray-100 text-gray-700'
        };
        return colors[category];
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    공지사항
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    학교의 주요 소식을 확인하세요
                </p>
            </div>

            {/* 검색창 */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="공지사항 검색..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500 focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-800 dark:text-white text-lg"
                    />
                </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="mb-8">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition ${selectedCategory === category
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* 공지사항 리스트 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
                {/* 고정 공지 */}
                {pinnedNotices.length > 0 && (
                    <div className="border-b-4 border-primary-500">
                        {pinnedNotices.map((notice, index) => (
                            <motion.div
                                key={notice.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(`/notices/${notice.id}`)}
                                className={`relative p-6 pl-10 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 transition ${index < pinnedNotices.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                                    }`}
                            >
                                {/* 왼쪽 포인트 바 (중요 공지 강조) */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />

                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-error text-white text-xs font-bold rounded-full">
                                                중요
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(notice.category)}`}>
                                                {notice.category}
                                            </span>
                                            {notice.isNew && (
                                                <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {notice.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {notice.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {notice.views}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* 일반 공지 */}
                {regularNotices.length > 0 ? (
                    regularNotices.map((notice, index) => (
                        <motion.div
                            key={notice.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (pinnedNotices.length + index) * 0.05 }}
                            onClick={() => navigate(`/notices/${notice.id}`)}
                            className={`p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${index < regularNotices.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(notice.category)}`}>
                                            {notice.category}
                                        </span>
                                        {notice.isNew && (
                                            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {notice.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {notice.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {notice.views}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        검색 결과가 없습니다
                    </div>
                )}
            </div>
        </div>
    );
}

export default NoticeList;
