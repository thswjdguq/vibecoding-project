import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ClassInfo, CurrentClassStatus } from '../../types/home';

interface TodayScheduleWidgetProps {
    classInfo: CurrentClassStatus;
    todayClasses: ClassInfo[];
}

/**
 * 오늘의 수업 위젯
 * 현재 진행 중인 수업 또는 다음 수업 정보를 표시
 */
const TodayScheduleWidget: React.FC<TodayScheduleWidgetProps> = ({ classInfo, todayClasses }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">오늘의 수업</h3>
                <Clock className="w-5 h-5 text-primary-600" />
            </div>

            {/* 수업 정보가 있는 경우 */}
            {classInfo.class ? (
                <div className={`p-5 rounded-2xl mb-3 ${classInfo.status === 'ongoing'
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {classInfo.class.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {classInfo.class.professor} 교수님
                            </p>
                        </div>
                        {/* 상태 배지: 수업 중 / 다음 수업까지 */}
                        <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${classInfo.status === 'ongoing'
                            ? 'bg-primary-500 text-white'
                            : 'bg-orange-500 text-white'
                            }`}>
                            {classInfo.message}
                        </span>
                    </div>
                    {/* 수업 시간 및 장소 */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{classInfo.class.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{classInfo.class.location}</span>
                        </div>
                    </div>
                </div>
            ) : (
                /* 수업이 없는 경우: 공강 or 종료 */
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 text-center">
                    <p className="text-3xl mb-2">{classInfo.status === 'free' ? '☕' : '🎉'}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {classInfo.message}
                    </p>
                </div>
            )}

            {/* 시간표 전체 보기 버튼 */}
            {todayClasses.length > 0 && (
                <div className="text-center">
                    <button
                        onClick={() => navigate('/eclass')}
                        className="text-primary-600 font-semibold text-sm flex items-center justify-center gap-1 mx-auto hover:underline"
                    >
                        전체 시간표 보기 →
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default TodayScheduleWidget;
