import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { getWeeklySchedule } from '../utils/roomHelpers';

/**
 * 주간 전체 시간표 페이지
 * 월~금 전체 일정을 그리드 형태로 표시
 */
function FullSchedule() {
    const weeklySchedule = getWeeklySchedule();
    const days = ['월', '화', '수', '목', '금'];

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-8 h-8 text-primary-600" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        전체 시간표
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    이번 주 전체 수업 일정을 확인하세요
                </p>
            </motion.div>

            {/* 시간표 그리드 (가로 스크롤) */}
            <div className="overflow-x-auto pb-4">
                <div className="inline-flex gap-4 min-w-full">
                    {days.map((day, index) => {
                        const dayNumber = index + 1;
                        const classes = weeklySchedule[dayNumber as keyof typeof weeklySchedule] || [];

                        return (
                            <motion.div
                                key={day}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm"
                            >
                                {/* 요일 헤더 */}
                                <div className="text-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                        {day}요일
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {classes.length}개 수업
                                    </p>
                                </div>

                                {/* 수업 리스트 */}
                                {classes.length > 0 ? (
                                    <div className="space-y-3">
                                        {classes.map((classItem, classIndex) => (
                                            <div
                                                key={classIndex}
                                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover-lift transition"
                                            >
                                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                                    {classItem.name}
                                                </h4>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{classItem.time}</span>
                                                    </div>
                                                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                                                        {classItem.location}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-500">
                                                        {classItem.professor} 교수님
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-400 dark:text-gray-600 text-lg">
                                            🌴
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                                            수업 없음
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* 모바일 스크롤 힌트 */}
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 md:hidden">
                ← 좌우로 스크롤하여 전체 시간표를 확인하세요 →
            </div>
        </div>
    );
}

export default FullSchedule;
