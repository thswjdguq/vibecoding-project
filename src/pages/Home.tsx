import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    UtensilsCrossed, Calendar, AlertCircle, BookOpen,
    ChevronRight, Bell, TrendingUp, Clock, Award,
    MessageCircle, FileText, Sparkles
} from 'lucide-react';
import SimpleQRWidget from '../components/SimpleQRWidget';

function Home() {
    const navigate = useNavigate();

    // 사용자 정보
    const userName = '김학생';
    const studentId = '20241234';
    const department = '스마트IT과';
    const year = '2학년';
    const currentHour = new Date().getHours();

    // 인사말
    const getGreeting = () => {
        if (currentHour < 12) return '좋은 아침이에요';
        if (currentHour < 18) return '좋은 오후예요';
        return '좋은 저녁이에요';
    };

    // 오늘의 학식
    const getTodayMeal = () => {
        if (currentHour < 14) {
            return { time: '점심', menu: '돈까스 + 우동', price: 5500, icon: '🍛' };
        }
        return { time: '저녁', menu: '불고기 덮밥', price: 5000, icon: '🍚' };
    };

    const todayMeal = getTodayMeal();

    // 주요 학사공지
    const importantNotices = [
        { id: 1, title: '중간고사 일정 안내', category: '학사', color: 'bg-blue-100 text-blue-700' },
        { id: 2, title: '2026년 국가장학금 신청', category: '장학', color: 'bg-primary-100 text-primary-700' }
    ];

    // 마감 임박 과제
    const upcomingAssignments = [
        { id: 1, course: '웹프로그래밍', title: 'HTML/CSS 레이아웃', daysLeft: 2, color: 'orange' },
        { id: 2, course: '데이터베이스', title: 'ERD 설계', daysLeft: 5, color: 'blue' },
        { id: 3, course: '알고리즘', title: '정렬 구현', daysLeft: 7, color: 'purple' }
    ];

    // 도서관 대출
    const libraryBooks = [
        { title: '클린 코드', dueDate: '2026-01-15', daysLeft: 2, isOverdue: false }
    ];

    // 다가오는 학사일정
    const academicSchedule = [
        { event: '중간고사 기간', date: '2026-04-15', daysLeft: 92, type: '시험' },
        { event: '종강', date: '2026-06-20', daysLeft: 158, type: '학사' },
        { event: '여름학기 수강신청', date: '2026-05-10', daysLeft: 117, type: '수강' }
    ];

    // 퀵 액션
    const quickActions = [
        { icon: MessageCircle, label: 'AI 챗봇', path: '/chatbot', color: 'bg-primary-500' },
        { icon: UtensilsCrossed, label: '학식', path: '/cafeteria', color: 'bg-orange-500' },
        { icon: FileText, label: '공지사항', path: '/notices', color: 'bg-blue-500' },
        { icon: TrendingUp, label: '성적', path: '/eclass/1', color: 'bg-purple-500' }
    ];

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            <div className="lg:flex lg:gap-6">
                {/* 메인 콘텐츠 */}
                <div className="flex-1">
                    {/* QR 위젯 (모바일 상단) */}
                    <div className="lg:hidden mb-6">
                        <SimpleQRWidget
                            name={userName}
                            studentId={studentId}
                            department={department}
                            year={year}
                        />
                    </div>

                    {/* AI 스마트 그리팅 */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 mb-6 text-white shadow-lg"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {getGreeting()}, {userName}님! 🍎
                                </h1>
                                <p className="text-primary-100 text-lg">
                                    오늘 하루도 힘내세요!
                                </p>
                            </div>
                            <Sparkles className="w-12 h-12 text-primary-200" />
                        </div>

                        {/* 이번 주 요약 */}
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <p className="text-sm text-primary-100 mb-1">과제</p>
                                <p className="text-2xl font-bold">3개</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <p className="text-sm text-primary-100 mb-1">수업</p>
                                <p className="text-2xl font-bold">18시간</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <p className="text-sm text-primary-100 mb-1">평균 학점</p>
                                <p className="text-2xl font-bold">3.85</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 퀵 액션 */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => navigate(action.path)}
                                    className={`${action.color} text-white rounded-2xl p-4 hover-lift transition`}
                                >
                                    <Icon className="w-6 h-6 mx-auto mb-2" />
                                    <p className="text-xs font-semibold">{action.label}</p>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* 메인 위젯 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 오늘의 학식 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={() => navigate('/cafeteria')}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">오늘의 학식</h3>
                                <UtensilsCrossed className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-3">
                                <div className="text-4xl text-center mb-2">{todayMeal.icon}</div>
                                <p className="text-center font-semibold text-gray-900 dark:text-white mb-1">
                                    {todayMeal.menu}
                                </p>
                                <p className="text-center text-primary-600 font-bold">
                                    {todayMeal.price.toLocaleString()}원
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{todayMeal.time} 메뉴</span>
                                <span className="text-primary-600 font-semibold flex items-center gap-1">
                                    자세히 보기 <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>

                        {/* 주요 학사공지 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            onClick={() => navigate('/notices')}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">주요 학사공지</h3>
                                <Bell className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="space-y-3">
                                {importantNotices.map((notice) => (
                                    <div key={notice.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${notice.color}`}>
                                                {notice.category}
                                            </span>
                                            <p className="flex-1 font-semibold text-sm text-gray-900 dark:text-white">
                                                {notice.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-primary-600 font-semibold text-sm flex items-center justify-center gap-1">
                                    전체 보기 <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </motion.div>

                        {/* 도서관 반납 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => navigate('/mypage')}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">도서관 대출</h3>
                                <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            {libraryBooks.map((book, index) => (
                                <div key={index} className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-4 mb-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            📚 {book.title}
                                        </p>
                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                                            D-{book.daysLeft}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        반납: {book.dueDate}
                                    </p>
                                </div>
                            ))}
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                ⚠️ 연체 주의! 빠른 반납 필요
                            </div>
                        </motion.div>
                    </div>

                    {/* 2열 그리드: 과제 + 학사일정 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* E-클래스 마감 과제 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            onClick={() => navigate('/eclass')}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">마감 임박 과제</h3>
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="space-y-3">
                                {upcomingAssignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1 h-12 bg-${assignment.color}-500 rounded-full`} />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {assignment.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {assignment.course}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${assignment.daysLeft <= 2
                                                ? 'bg-error text-white'
                                                : assignment.daysLeft <= 5
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                            }`}>
                                            D-{assignment.daysLeft}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 다가오는 학사일정 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">다가오는 학사일정</h3>
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="space-y-3">
                                {academicSchedule.map((schedule, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {schedule.event}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{schedule.date}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${schedule.type === '시험'
                                                    ? 'bg-error text-white'
                                                    : schedule.type === '수강'
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-purple-500 text-white'
                                                }`}>
                                                {schedule.type}
                                            </span>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                D-{schedule.daysLeft}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 나의 학업 리포트 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        onClick={() => navigate('/eclass/1')}
                        className="mt-6 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">나의 학업 리포트</h3>
                            <Award className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-primary-600 mb-2">3.85</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">전체 평점</p>
                            </div>
                            <div className="text-center border-l border-r border-gray-200 dark:border-gray-700">
                                <p className="text-5xl font-bold text-blue-600 mb-2">4.0</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">전공 평점</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-purple-600 mb-2">78 / 140</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">취득 학점</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* QR 위젯 (데스크톱 우측) */}
                <div className="hidden lg:block lg:w-80 lg:sticky lg:top-24 lg:self-start">
                    <SimpleQRWidget
                        name={userName}
                        studentId={studentId}
                        department={department}
                        year={year}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
