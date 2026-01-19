import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, MapPin, Bell, FileText } from 'lucide-react';

interface Course {
    id: string;
    name: string;
    professor: string;
    room: string;
    unreadNotices: number;
    pendingAssignments: number;
    isMajor: boolean; // 전공 여부
}

function EClass() {
    const navigate = useNavigate();

    const courses: Course[] = [
        {
            id: '1',
            name: '웹프로그래밍',
            professor: '김교수',
            room: 'IT관 301호',
            unreadNotices: 2,
            pendingAssignments: 1,
            isMajor: true
        },
        {
            id: '2',
            name: '데이터베이스',
            professor: '이교수',
            room: 'IT관 302호',
            unreadNotices: 0,
            pendingAssignments: 2,
            isMajor: true
        },
        {
            id: '3',
            name: '캡스톤디자인',
            professor: '박교수',
            room: 'IT관 401호',
            unreadNotices: 1,
            pendingAssignments: 0,
            isMajor: true
        },
        {
            id: '4',
            name: '알고리즘',
            professor: '최교수',
            room: 'IT관 303호',
            unreadNotices: 3,
            pendingAssignments: 1,
            isMajor: true
        },
        {
            id: '5',
            name: '교양영어',
            professor: '정교수',
            room: 'A관 201호',
            unreadNotices: 0,
            pendingAssignments: 1,
            isMajor: false
        },
        {
            id: '6',
            name: '체육',
            professor: '강교수',
            room: '체육관',
            unreadNotices: 0,
            pendingAssignments: 0,
            isMajor: false
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    E-클래스
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    수강 중인 강의를 확인하고 학습 자료를 다운로드하세요
                </p>
            </div>

            {/* 강의 카드 그리드 */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden cursor-pointer group relative"
                        onClick={() => navigate(`/eclass/${course.id}`)}
                    >
                        {/* 왼쪽 포인트 바 */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${course.isMajor ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`} />

                        {/* 카드 내용 */}
                        <div className="p-6 pl-8">
                            {/* 상단: 과목명 + 배지 */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition">
                                            {course.name}
                                        </h3>
                                    </div>
                                    {course.isMajor && (
                                        <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                                            전공
                                        </span>
                                    )}
                                </div>

                                {/* 우측 배지 (심플) */}
                                <div className="flex gap-2">
                                    {course.unreadNotices > 0 && (
                                        <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {course.unreadNotices}
                                            </span>
                                        </div>
                                    )}
                                    {course.pendingAssignments > 0 && (
                                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {course.pendingAssignments}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 정보 */}
                            <div className="space-y-3 mb-6">
                                {/* 교수 */}
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm">{course.professor} 교수님</span>
                                </div>

                                {/* 강의실 */}
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{course.room}</span>
                                </div>
                            </div>

                            {/* 하단 배지 요약 */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4 text-sm">
                                    {course.unreadNotices > 0 && (
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-error rounded-full" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                공지 {course.unreadNotices}
                                            </span>
                                        </div>
                                    )}
                                    {course.pendingAssignments > 0 && (
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                과제 {course.pendingAssignments}
                                            </span>
                                        </div>
                                    )}
                                    {course.unreadNotices === 0 && course.pendingAssignments === 0 && (
                                        <span className="text-gray-500 dark:text-gray-400">
                                            모든 활동 완료
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default EClass;
