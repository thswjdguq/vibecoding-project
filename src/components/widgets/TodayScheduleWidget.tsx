import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, Coffee } from 'lucide-react';
import { ClassInfo, CurrentClassStatus } from '../../types/home';
import TimelineItem from './TimelineItem';
import { calculateBreakTime, isClassCompleted, isCurrentClass } from '../../utils/homeHelpers';

interface TodayScheduleWidgetProps {
    classInfo: CurrentClassStatus;
    todayClasses: ClassInfo[];
}

/**
 * 오늘의 수업 위젯 (확장 가능)
 * - 접힘 상태: 현재 수업의 강의실과 남은 시간 강조
 * - 펼침 상태: 오늘 전체 일정을 타임라인으로 표시
 */
const TodayScheduleWidget: React.FC<TodayScheduleWidgetProps> = ({ classInfo, todayClasses }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    // 현재 시간
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6"
        >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">오늘의 수업</h3>
                <Clock className="w-5 h-5 text-primary-600" />
            </div>

            {/* 접힘 상태: 현재 수업 강조 */}
            {!isExpanded && classInfo.class && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-6 rounded-2xl mb-4 ${classInfo.status === 'ongoing'
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }`}
                >
                    {/* 강의실 번호 (가장 크게) */}
                    <div className="text-center mb-4">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                            {classInfo.class.location}
                        </p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {classInfo.class.name}
                        </p>
                    </div>

                    {/* 남은 시간 (강조) */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className={`text-2xl font-bold ${classInfo.status === 'ongoing'
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-orange-600 dark:text-orange-400'
                            }`}>
                            {classInfo.message}
                        </span>
                    </div>

                    {/* 수업 시간 */}
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        <p>{classInfo.class.time}</p>
                        <p>{classInfo.class.professor} 교수님</p>
                    </div>
                </motion.div>
            )}

            {/* 공강 상태 */}
            {!isExpanded && !classInfo.class && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 text-center mb-4">
                    <p className="text-4xl mb-2">{classInfo.status === 'free' ? '☕' : '🎉'}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {classInfo.message}
                    </p>
                </div>
            )}

            {/* 펼침 상태: 전체 타임라인 */}
            <AnimatePresence>
                {isExpanded && todayClasses.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="space-y-2">
                            {todayClasses.map((classItem, index) => {
                                const isLast = index === todayClasses.length - 1;
                                const isFirst = index === 0;

                                // 공강 시간 계산
                                const breakTime = !isLast
                                    ? calculateBreakTime(classItem, todayClasses[index + 1])
                                    : null;

                                return (
                                    <React.Fragment key={index}>
                                        {/* 수업 아이템 */}
                                        <TimelineItem
                                            classItem={classItem}
                                            isCurrentClass={isCurrentClass(classItem, currentHour, currentMinute)}
                                            isCompleted={isClassCompleted(classItem, currentHour, currentMinute)}
                                            isFirst={isFirst}
                                            isLast={isLast && !breakTime}
                                        />

                                        {/* 공강 시간 표시 */}
                                        {breakTime && (
                                            <div className="relative pl-8 mb-4">
                                                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
                                                    <Coffee className="w-4 h-4" />
                                                    <span className="font-medium">
                                                        공강 {Math.floor(breakTime / 60)}시간 {breakTime % 60}분
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 펼치기/접기 버튼 */}
            {todayClasses.length > 0 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-5 h-5" />
                            접기
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-5 h-5" />
                            오늘 전체 시간표 보기
                        </>
                    )}
                </button>
            )}

            {/* 전체 시간표 페이지로 이동 */}
            {todayClasses.length > 0 && (
                <div className="mt-3 text-center">
                    <button
                        onClick={() => navigate('/eclass')}
                        className="text-primary-600 font-semibold text-sm hover:underline"
                    >
                        주간 시간표 보기 →
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default TodayScheduleWidget;
