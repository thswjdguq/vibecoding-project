import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, CheckCircle } from 'lucide-react';
import { ClassInfo } from '../../types/home';

interface TimelineItemProps {
    classItem: ClassInfo;
    isCurrentClass: boolean;   // 현재 진행 중인 수업인지
    isCompleted: boolean;       // 종료된 수업인지
    isFirst: boolean;           // 첫 번째 수업인지
    isLast: boolean;            // 마지막 수업인지
}

/**
 * 타임라인 개별 수업 항목 컴포넌트
 * 세로 타임라인 형태로 수업 정보를 표시
 */
const TimelineItem: React.FC<TimelineItemProps> = ({
    classItem,
    isCurrentClass,
    isCompleted,
    isFirst,
    isLast
}) => {
    return (
        <div className="relative pl-8">
            {/* 타임라인 세로선 */}
            {!isLast && (
                <div className={`absolute left-2 top-8 bottom-0 w-0.5 ${isCompleted ? 'bg-gray-300' : 'bg-primary-300'
                    }`} />
            )}

            {/* 타임라인 점 */}
            <div className={`absolute left-0 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCurrentClass
                    ? 'bg-primary-500 border-primary-500 shadow-lg shadow-primary-500/50'
                    : isCompleted
                        ? 'bg-gray-300 border-gray-300'
                        : 'bg-white border-primary-500'
                }`}>
                {isCompleted && (
                    <CheckCircle className="w-3 h-3 text-white" />
                )}
                {isCurrentClass && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
            </div>

            {/* 수업 정보 카드 */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-6 p-4 rounded-2xl transition-all ${isCurrentClass
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                        : isCompleted
                            ? 'bg-gray-50 dark:bg-gray-800 opacity-40'
                            : 'bg-gray-50 dark:bg-gray-700'
                    }`}
            >
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-1 ${isCurrentClass ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                            }`}>
                            {classItem.name}
                        </h4>
                        {isCurrentClass && (
                            <span className="inline-block px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                                수업 중
                            </span>
                        )}
                        {isCompleted && (
                            <span className="inline-block px-2 py-0.5 bg-gray-400 text-white text-xs font-bold rounded-full">
                                종료
                            </span>
                        )}
                    </div>
                </div>

                {/* 수업 상세 정보 */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                            {classItem.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{classItem.professor} 교수님</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TimelineItem;
