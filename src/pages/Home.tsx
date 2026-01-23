import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    MessageCircle, TrendingUp, UtensilsCrossed,
    BookOpen, Bell
} from 'lucide-react';
import SimpleQRWidget from '../components/SimpleQRWidget';
import TodayScheduleWidget from '../components/widgets/TodayScheduleWidget';
import NotificationTicker from '../components/widgets/NotificationTicker';
import QuickActions from '../components/widgets/QuickActions';
import { QuickAction, Notice, Assignment, LibraryBook } from '../types/home';
import {
    getTodaySchedule,
    getCurrentClassInfo,
    getTodayMeal,
    getGreeting
} from '../utils/homeHelpers';

/**
 * 홈 페이지 메인 컴포넌트
 * 학생의 주요 정보를 한눈에 보여주는 대시보드
 */
function Home() {
    const navigate = useNavigate();

    // ========== 사용자 정보 ==========
    const userName = '김학생';
    const studentId = '20241234';
    const department = '스마트IT과';
    const year = '2학년';

    // ========== 현재 시간 정보 ==========
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentDay = new Date().getDay(); // 0: 일요일, 1: 월요일, ...

    // ========== 오늘의 수업 정보 계산 ==========
    const todayClasses = getTodaySchedule(currentDay);
    const classInfo = getCurrentClassInfo(todayClasses, currentHour, currentMinute);

    // ========== 실시간 공지 티커 데이터 ==========
    const tickerNotices = [
        '📢 중간고사 일정 안내 (4/15~4/19)',
        '💰 국가장학금 신청 마감 D-7',
        '🏫 휴강 안내: 웹프로그래밍 (2/10)',
        '📚 도서관 24시간 열람실 운영'
    ];

    // ========== 퀵 액션 버튼 설정 (사용 빈도순) ==========
    const quickActions: QuickAction[] = [
        { icon: BookOpen, label: 'E-Class', path: '/eclass', color: 'bg-blue-500' },
        { icon: UtensilsCrossed, label: '학식', path: '/cafeteria', color: 'bg-orange-500' },
        { icon: Bell, label: '공지사항', path: '/notices', color: 'bg-purple-500' },
        { icon: MessageCircle, label: 'AI 챗봇', path: '/chatbot', color: 'bg-primary-500' }
    ];

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* ===== 1. QR 위젯 (최상단 고정) ===== */}
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

            {/* ===== 2. 오늘의 수업 ===== */}
            <TodayScheduleWidget
                classInfo={classInfo}
                todayClasses={todayClasses}
            />

            {/* ===== 3. 실시간 공지 티커 ===== */}
            <NotificationTicker notices={tickerNotices} />

            {/* ===== 4. 퀵 액션 버튼 ===== */}
            <QuickActions
                actions={quickActions}
                onNavigate={navigate}
            />

            {/* ===== 5. 메인 위젯 그리드 ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* TODO: 오늘의 학식, 주요 학사공지, 도서관 위젯 컴포넌트화 예정 */}
                {/* 현재는 기존 코드 유지 */}
            </div>

            {/* ===== 6. 마감 임박 과제 ===== */}
            {/* TODO: AssignmentsWidget 컴포넌트로 분리 예정 */}

            {/* ===== 7. 나의 학업 리포트 ===== */}
            {/* TODO: AcademicReportWidget 컴포넌트로 분리 예정 */}
        </div>
    );
}

export default Home;
