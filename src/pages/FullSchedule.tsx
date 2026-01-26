import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { ClassSchedule } from '../types/campus';
import { groupScheduleByDay, generateTimeSlots } from '../utils/campusHelpers';

/**
 * 전체 시간표 페이지
 * 월~금 그리드 레이아웃으로 전체 주간 일정을 한눈에 표시
 */
function FullSchedule() {
    // 샘플 시간표 데이터
    const [schedule] = useState<ClassSchedule[]>([
        {
            id: '1',
            name: '웹프로그래밍',
            professor: '김교수',
            room: '301',
            building: 'IT관',
            dayOfWeek: 1, // 월요일
            startTime: '09:00',
            endTime: '10:30',
            color: 'bg-blue-500'
        },
        {
            id: '2',
            name: '데이터베이스',
            professor: '이교수',
            room: '401',
            building: 'IT관',
            dayOfWeek: 2, // 화요일
            startTime: '10:00',
            endTime: '12:00',
            color: 'bg-purple-500'
        },
        {
            id: '3',
            name: '알고리즘',
            professor: '박교수',
            room: '201',
            building: '본관',
            dayOfWeek: 3, // 수요일
            startTime: '13:00',
            endTime: '15:00',
            color: 'bg-green-500'
        },
        {
            id: '4',
            name: '자료구조',
            professor: '정교수',
            room: '302',
            building: 'IT관',
            dayOfWeek: 4, // 목요일
            startTime: '09:00',
            endTime: '11:00',
            color: 'bg-orange-500'
        },
        {
            id: '5',
            name: '운영체제',
            professor: '최교수',
            room: '501',
            building: 'IT관',
            dayOfWeek: 5, // 금요일
            startTime: '14:00',
            endTime: '16:00',
            color: 'bg-pink-500'
        }
    ]);

    const weekDays = [
        { id: 1, name: '월', fullName: '월요일' },
        { id: 2, name: '화', fullName: '화요일' },
        { id: 3, name: '수', fullName: '수요일' },
        { id: 4, name: '목', fullName: '목요일' },
        { id: 5, name: '금', fullName: '금요일' }
    ];

    const timeSlots = generateTimeSlots();
    const groupedSchedule = groupScheduleByDay(schedule);

    /**
     * 특정 요일/시간대에 해당하는 수업 찾기
     */
    const getClassAtTime = (dayOfWeek: number, hour: number): ClassSchedule | null => {
        const dayClasses = groupedSchedule[dayOfWeek] || [];
        return dayClasses.find(cls => {
            const startHour = parseInt(cls.startTime.split(':')[0]);
            const endHour = parseInt(cls.endTime.split(':')[0]);
            return hour >= startHour && hour < endHour;
        }) || null;
    };

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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">전체 시간표</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    월요일부터 금요일까지의 전체 수업 일정을 한눈에 확인하세요
                </p>
            </motion.div>

            {/* 시간표 그리드 - 모바일 가로 스크롤 지원 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm overflow-x-auto"
            >
                <div className="min-w-[800px]">
                    {/* 헤더: 요일 */}
                    <div className="grid grid-cols-6 gap-2 mb-4">
                        <div className="text-center font-bold text-gray-700 dark:text-gray-300 py-3">
                            시간
                        </div>
                        {weekDays.map(day => (
                            <div
                                key={day.id}
                                className="text-center font-bold text-gray-900 dark:text-white bg-primary-50 dark:bg-primary-900/20 rounded-2xl py-3"
                            >
                                <div className="md:hidden">{day.name}</div>
                                <div className="hidden md:block">{day.fullName}</div>
                            </div>
                        ))}
                    </div>

                    {/* 시간표 그리드 */}
                    <div className="space-y-2">
                        {timeSlots.map(slot => (
                            <div key={slot.hour} className="grid grid-cols-6 gap-2">
                                {/* 시간 레이블 */}
                                <div className="flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    {slot.label}
                                </div>

                                {/* 각 요일의 수업 */}
                                {weekDays.map(day => {
                                    const classItem = getClassAtTime(day.id, slot.hour);

                                    return (
                                        <div key={`${day.id}-${slot.hour}`} className="min-h-[80px]">
                                            {classItem && parseInt(classItem.startTime.split(':')[0]) === slot.hour ? (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className={`${classItem.color} text-white rounded-2xl p-3 h-full cursor-pointer hover-lift`}
                                                >
                                                    <h4 className="font-bold text-sm mb-1 line-clamp-1">
                                                        {classItem.name}
                                                    </h4>
                                                    <div className="space-y-1 text-xs opacity-90">
                                                        <div className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            <span className="line-clamp-1">{classItem.professor}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{classItem.building} {classItem.room}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{classItem.startTime} - {classItem.endTime}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl h-full" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 안내 메시지 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-4"
            >
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>팁:</strong> 모바일에서는 화면을 가로로 스크롤하여 전체 요일을 확인할 수 있습니다.
                </p>
            </motion.div>
        </div>
    );
}

export default FullSchedule;
