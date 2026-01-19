import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User, Hash, GraduationCap, Award, Phone, Mail, MapPin, Lock,
    BookOpen, Shield, CreditCard, Calendar, TrendingUp, Bell, Library, AlertCircle
} from 'lucide-react';

function MyPage() {
    const navigate = useNavigate();
    const studentName = localStorage.getItem('studentName') || '김민수';
    const studentId = localStorage.getItem('studentId') || '2112';

    // 보안 설정 토글 상태
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* 페이지 타이틀 */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">마이페이지</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">내 정보를 확인하고 관리하세요</p>
                </div>

                {/* 핵심 정보 카드 - 전체 너비 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* 프로필 아이콘 */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <User className="w-16 h-16 text-white" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* 정보 */}
                        <div className="flex-grow text-center md:text-left">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {studentName}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <Hash className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">학번</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">{studentId}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">학과</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">IT소프트웨어과</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">학년</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">3학년</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2단 그리드 레이아웃 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 좌측 컬럼 */}
                    <div className="space-y-8">
                        {/* 학적 정보 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="w-6 h-6 text-primary-600" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    학적 정보
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {/* 학적 상태, 지도교수, 입학일자 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">학적 상태</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            재학
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">지도교수</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">김지도 교수</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">입학일자</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">2024년 03월 01일</p>
                                </div>

                                {/* 취득 학점 및 평점 위젯 */}
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl">
                                        <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 취득 학점</p>
                                        <p className="text-3xl font-bold text-primary-600">110</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">/ 130</p>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl">
                                        <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">평균 평점</p>
                                        <p className="text-3xl font-bold text-primary-600">4.2</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">/ 4.5</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 도서관 대출 현황 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Library className="w-6 h-6 text-primary-600" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    도서관 대출 현황
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {/* 대출 도서 리스트 */}
                                {[
                                    { title: '클린 코드', author: '로버트 C. 마틴', dueDate: '2026-01-16', daysLeft: 3, isOverdue: false },
                                    { title: '리팩토링', author: '마틴 파울러', dueDate: '2026-01-15', daysLeft: 1, isOverdue: false },
                                    { title: '이펙티브 자바', author: '조슈아 블로크', dueDate: '2026-01-12', daysLeft: 0, isOverdue: true, overdueDays: 1 },
                                    { title: 'JavaScript 완벽 가이드', author: '데이비드 플래너건', dueDate: '2026-01-22', daysLeft: 8, isOverdue: false }
                                ].map((book, index) => {
                                    // 상태 결정 로직
                                    const getStatus = () => {
                                        if (book.isOverdue) return 'overdue';
                                        if (book.daysLeft <= 1) return 'warning';
                                        return 'normal';
                                    };

                                    const status = getStatus();

                                    return (
                                        <div
                                            key={index}
                                            className={`p-5 rounded-2xl transition ${status === 'overdue'
                                                    ? 'bg-error/5 border-2 border-error/20'
                                                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-grow">
                                                    <h4 className={`font-semibold mb-1 ${status === 'overdue' ? 'text-error' : 'text-gray-900 dark:text-white'
                                                        }`}>
                                                        {book.title}
                                                    </h4>
                                                    <p className={`text-sm mb-2 ${status === 'overdue'
                                                            ? 'text-error/80'
                                                            : 'text-gray-500 dark:text-gray-400'
                                                        }`}>
                                                        저자: {book.author}
                                                    </p>
                                                    <p className={`text-sm ${status === 'overdue'
                                                            ? 'text-error/70 font-semibold'
                                                            : 'text-gray-600 dark:text-gray-300'
                                                        }`}>
                                                        반납 예정: {book.dueDate}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    {/* 상태 배지 */}
                                                    {status === 'overdue' ? (
                                                        <div className="flex items-center gap-1 px-3 py-1 bg-error text-white rounded-full">
                                                            <AlertCircle className="w-4 h-4" />
                                                            <span className="text-xs font-semibold">{book.overdueDays}일 연체</span>
                                                        </div>
                                                    ) : status === 'warning' ? (
                                                        <div className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full">
                                                            <AlertCircle className="w-4 h-4" />
                                                            <span className="text-xs font-semibold">
                                                                {book.daysLeft === 0 ? '반납 당일' : 'D-1'}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="px-3 py-1 bg-primary-500 text-white rounded-full">
                                                            <span className="text-xs font-semibold">D-{book.daysLeft}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 대출 연장 버튼 */}
                                            <button
                                                className={`w-full mt-2 py-2 px-4 rounded-xl font-semibold text-sm transition ${status === 'overdue'
                                                        ? 'bg-error/10 text-error hover:bg-error/20'
                                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300'
                                                    }`}
                                            >
                                                {status === 'overdue' ? '반납 처리' : '대출 연장'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 대출 요약 */}
                            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        총 대출 도서
                                    </span>
                                    <span className="text-xl font-bold text-primary-600">
                                        4권
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                        {/* 기본 정보 섹션 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                기본 정보
                            </h3>

                            <div className="space-y-6">
                                {/* 연락처 */}
                                <div className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">연락처</p>
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">010-1234-5678</p>
                                    </div>
                                </div>

                                {/* 이메일 */}
                                <div className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">이메일</p>
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">{studentId}@shingu.ac.kr</p>
                                    </div>
                                </div>

                                {/* 주소 */}
                                <div className="flex items-center gap-4 py-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">주소</p>
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">경기도 성남시 중원구 광명로 377</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 우측 컬럼 */}
                    <div className="space-y-8">
                        {/* 장학 및 등록 내역 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-6 h-6 text-primary-600" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    장학 내역
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {/* 장학금 리스트 */}
                                {[
                                    { name: '성적우수장학금', semester: '2025-2학기', amount: '1,500,000원' },
                                    { name: '국가장학금 I유형', semester: '2025-2학기', amount: '2,000,000원' },
                                    { name: '교내근로장학금', semester: '2025-1학기', amount: '800,000원' },
                                    { name: '성적우수장학금', semester: '2025-1학기', amount: '1,500,000원' }
                                ].map((scholarship, index) => (
                                    <div
                                        key={index}
                                        className="p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    {scholarship.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {scholarship.semester}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary-600">
                                                    {scholarship.amount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        총 수혜 장학금
                                    </span>
                                    <span className="text-xl font-bold text-primary-600">
                                        5,800,000원
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 계정 및 보안 설정 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-primary-600" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    계정 및 보안
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {/* 비밀번호 변경 */}
                                <button
                                    onClick={() => navigate('/mypage/password-change')}
                                    className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            비밀번호 변경
                                        </span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* 2단계 인증 */}
                                <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">2단계 인증</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">추가 보안 계층</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${twoFactorAuth ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* 알림 수신 설정 */}
                                <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">알림 수신</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">이메일 및 푸시 알림</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${notifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default MyPage;
