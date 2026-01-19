import React, { useState } from 'react';

interface Notice {
    id: number;
    title: string;
    category: string;
    date: string;
    views: number;
}

const mockNotices: Notice[] = [
    { id: 1, title: '2026학년도 1학기 수강신청 안내', category: '학사', date: '2026-01-05', views: 1234 },
    { id: 2, title: '장학금 신청 기간 연장 공지', category: '장학', date: '2026-01-04', views: 856 },
    { id: 3, title: 'IT 캠퍼스 Wi-Fi 공사 안내', category: '시설', date: '2026-01-03', views: 432 },
    { id: 4, title: '취업 박람회 개최 안내', category: '취업', date: '2026-01-02', views: 678 },
];

function Notices() {
    const [category, setCategory] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['전체', '학사', '장학', '취업', '시설'];

    const filteredNotices = mockNotices.filter(notice => {
        const matchesCategory = category === '전체' || notice.category === category;
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">공지사항</h1>

            {/* 카테고리 필터 */}
            <div className="flex gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg transition ${category === cat
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 검색 */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="공지사항 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            {/* 공지사항 목록 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium dark:text-gray-300">분류</th>
                            <th className="px-6 py-3 text-left text-sm font-medium dark:text-gray-300">제목</th>
                            <th className="px-6 py-3 text-left text-sm font-medium dark:text-gray-300">날짜</th>
                            <th className="px-6 py-3 text-left text-sm font-medium dark:text-gray-300">조회수</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {filteredNotices.map(notice => (
                            <tr key={notice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                        {notice.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 dark:text-white">{notice.title}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{notice.date}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{notice.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notices;
