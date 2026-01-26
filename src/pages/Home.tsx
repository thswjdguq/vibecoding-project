import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Library, UtensilsCrossed, Loader } from 'lucide-react';
import SimpleQRWidget from '../components/SimpleQRWidget';
import TodayScheduleWidget from '../components/widgets/TodayScheduleWidget';
import { ClassInfo, CurrentClassStatus } from '../types/home';
import { getTodaySchedule } from '../utils/homeHelpers';

/**
 * 홈 화면 - 글로벌 표준 3단계 구조
 * Simple & Glanceable Design
 * 
 * Top: QR 위젯 (도서관 출입)
 * Middle: 오늘의 시간표
 * Bottom: 퀵 메뉴 4개
 */
function Home() {
    // 사용자 정보
    const userName = '김학생';
    const studentId = '20241234';
    const department = '스마트IT과';
    const year = '2학년';

    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    // 오늘의 시간표 가져오기
    const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ...
    const todayClasses: ClassInfo[] = getTodaySchedule(today);

    // 현재 시간
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    /**
     * 현재 진행 중이거나 다가오는 수업 찾기
     * @returns 수업 상태 정보
     */
    const getCurrentClass = (): CurrentClassStatus => {
        // 현재 진행 중인 수업
        const currentClass = todayClasses.find(cls =>
            currentHour >= cls.startHour &&
            (currentHour < cls.endHour || (currentHour === cls.endHour && currentMinute < cls.endMinute))
        );

        if (currentClass) {
            const minutesLeft = (currentClass.endHour * 60 + currentClass.endMinute) - (currentHour * 60 + currentMinute);
            return {
                class: currentClass,
                status: 'ongoing',
                message: `${minutesLeft}분 남음`
            };
        }

        // 다음 수업 찾기
        const nextClass = todayClasses.find(cls =>
            cls.startHour > currentHour || (cls.startHour === currentHour && cls.startMinute > currentMinute)
        );

        if (nextClass) {
            const minutesUntil = (nextClass.startHour * 60 + nextClass.startMinute) - (currentHour * 60 + currentMinute);
            return {
                class: nextClass,
                status: 'upcoming',
                message: `${minutesUntil}분 후 시작`
            };
        }

        // 수업 종료 또는 공강
        return {
            class: null,
            status: 'free',
            message: todayClasses.length > 0 ? '오늘 수업 종료' : '오늘 수업 없음'
        };
    };

    const classInfo = getCurrentClass();

    // 퀵 메뉴 데이터
    const quickMenus = [
        {
            id: 'eclass',
            name: 'E-Class',
            icon: BookOpen,
            url: 'https://eclass.shingu.ac.kr',
            color: 'bg-blue-500'
        },
        {
            id: 'cyber',
            name: '사이버캠퍼스',
            icon: Globe,
            url: 'https://cyber.shingu.ac.kr',
            color: 'bg-green-500'
        },
        {
            id: 'library',
            name: '중앙도서관',
            icon: Library,
            url: 'https://lib.shingu.ac.kr',
            color: 'bg-purple-500'
        },
        {
            id: 'cafeteria',
            name: '학생식당',
            icon: UtensilsCrossed,
            url: '/cafeteria',
            color: 'bg-orange-500'
        }
    ];

    // 초기 로딩 시뮬레이션 (실제로는 API 호출)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // 로딩 스피너
    if (isLoading) {
        return (
            <div className="max-w-[800px] mx-auto px-4 py-6 pb-24 md:pb-8">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[800px] mx-auto px-4 py-6 pb-24 md:pb-8">
            {/* Step 1: QR 코드 위젯 (상단) */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <SimpleQRWidget
                    name={userName}
                    studentId={studentId}
                    department={department}
                    year={year}
                />
            </motion.div>

            {/* Step 2: 오늘의 시간표 (중앙) */}
            <TodayScheduleWidget
                classInfo={classInfo}
                todayClasses={todayClasses}
            />

            {/* Step 3: 퀵 메뉴 4개 (하단) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm"
            >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    퀵 메뉴
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {quickMenus.map((menu) => {
                        const Icon = menu.icon;
                        return (
                            <a
                                key={menu.id}
                                href={menu.url}
                                target={menu.url.startsWith('http') ? '_blank' : '_self'}
                                rel={menu.url.startsWith('http') ? 'noopener noreferrer' : ''}
                                className={`${menu.color} text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover-lift transition cursor-pointer`}
                            >
                                <Icon className="w-8 h-8" />
                                <span className="font-semibold text-sm text-center">
                                    {menu.name}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}

export default Home;
