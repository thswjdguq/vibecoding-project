import React, { useState } from 'react';

interface Review {
    id: number;
    courseName: string;
    professor: string;
    rating: number;
    difficulty: number;
    workload: number;
    tags: string[];
    content: string;
    author: string;
    date: string;
}

const mockReviews: Review[] = [
    {
        id: 1,
        courseName: '자료구조',
        professor: '김교수',
        rating: 4.5,
        difficulty: 4,
        workload: 5,
        tags: ['알고리즘중요', '과제많음', '시험어려움'],
        content: '어렵지만 배울 게 많은 수업입니다. 과제가 많지만 실력 향상에 도움됩니다.',
        author: '익명',
        date: '2025-12-15'
    },
    {
        id: 2,
        courseName: '웹프로그래밍',
        professor: '이교수',
        rating: 5,
        difficulty: 2,
        workload: 3,
        tags: ['꿀강', 'ㅽ수', '과제보통'],
        content: '재미있고 실용적인 수업! HTML/CSS/JS를 차근차근 배울 수 있어요.',
        author: '익명',
        date: '2025-12-10'
    }
];

function CourseReview() {
    const [reviews] = useState<Review[]>(mockReviews);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReviews = reviews.filter(review =>
        review.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.professor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold dark:text-white">강의 리뷰</h1>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                    리뷰 작성
                </button>
            </div>

            {/* 검색 */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="과목명 또는 교수명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-6">
                {filteredReviews.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        {/* 헤더 */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold dark:text-white">{review.courseName}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{review.professor} 교수님</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-xl font-bold dark:text-white">{review.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* 상세 지표 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">난이도</span>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-2 rounded ${i < review.difficulty ? 'bg-orange-500' : 'bg-gray-300'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">과제량</span>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-2 rounded ${i < review.workload ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 태그 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {review.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* 리뷰 내용 */}
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{review.content}</p>

                        {/* 푸터 */}
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{review.author}</span>
                            <span>{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseReview;
