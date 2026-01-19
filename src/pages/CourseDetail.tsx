import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, Eye, Download,
    CheckCircle, XCircle, AlertCircle, BookOpen, Target, TrendingUp
} from 'lucide-react';

type TabType = 'syllabus' | 'notices' | 'materials' | 'assignments' | 'grades';

function CourseDetail() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('syllabus');

    // 성적 시뮬레이터 상태
    const [simulatorScores, setSimulatorScores] = useState({
        attendance: 95,
        midterm: 85,
        final: 0,
        assignment: 87.5
    });

    // 더미 데이터
    const courseName = '웹프로그래밍';
    const professor = '김교수';

    const notices = [
        { id: 1, title: '중간고사 안내', date: '2026-01-10', views: 45, isNew: true },
        { id: 2, title: '과제 제출 기한 연장', date: '2026-01-08', views: 32, isNew: true },
        { id: 3, title: '수업 자료 업로드', date: '2026-01-05', views: 28, isNew: false },
        { id: 4, title: '팀 프로젝트 안내', date: '2026-01-03', views: 41, isNew: false }
    ];

    const materials = [
        { id: 1, name: '1주차 - HTML 기초', type: 'PDF', size: '2.5 MB', date: '2026-01-05' },
        { id: 2, name: '2주차 - CSS 스타일링', type: 'PPT', size: '5.1 MB', date: '2026-01-08' },
        { id: 3, name: '3주차 - JavaScript 기초', type: 'PDF', size: '3.2 MB', date: '2026-01-10' },
        { id: 4, name: '실습 예제 코드', type: 'ZIP', size: '1.8 MB', date: '2026-01-12' }
    ];

    const assignments = [
        { id: 1, title: 'HTML/CSS 레이아웃 과제', dueDate: '2026-01-18', daysLeft: 5, status: 'pending' },
        { id: 2, title: 'JavaScript 계산기 만들기', dueDate: '2026-01-15', daysLeft: 2, status: 'pending' },
        { id: 3, title: '웹사이트 디자인 기획', dueDate: '2026-01-10', daysLeft: -3, status: 'overdue' },
        { id: 4, title: 'React 컴포넌트 구현', dueDate: '2026-01-08', daysLeft: 0, status: 'submitted' }
    ];

    const grades = {
        midterm: 85,
        final: 0,
        assignments: [
            { name: '과제 1', score: 90 },
            { name: '과제 2', score: 85 },
            { name: '과제 3', score: 0 },
            { name: '과제 4', score: 0 }
        ],
        attendance: 95
    };

    const getFileIcon = (type: string) => {
        const icons: { [key: string]: string } = {
            'PDF': '📄',
            'PPT': '📊',
            'ZIP': '📦',
            'DOC': '📝'
        };
        return icons[type] || '📄';
    };

    const getStatusBadge = (status: string, daysLeft: number) => {
        if (status === 'submitted') {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">제출완료</span>
                </div>
            );
        }
        if (status === 'overdue') {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-error text-white rounded-full">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">{Math.abs(daysLeft)}일 초과</span>
                </div>
            );
        }
        if (daysLeft <= 2) {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">D-{daysLeft}</span>
                </div>
            );
        }
        return (
            <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                <span className="text-xs font-semibold">D-{daysLeft}</span>
            </div>
        );
    };

    const tabs: { key: TabType; label: string }[] = [
        { key: 'syllabus', label: '수업 계획표' },
        { key: 'notices', label: '교수님 공지' },
        { key: 'materials', label: '수업 자료' },
        { key: 'assignments', label: '과제 제출' },
        { key: 'grades', label: '성적 공개' }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* 헤더 */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/eclass')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-semibold">강의 목록으로</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {courseName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {professor} 교수님
                </p>
            </div>

            {/* 탭 내비게이션 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm mb-6 overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-4 px-6 font-semibold transition relative ${activeTab === tab.key
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 탭 컨텐츠 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* 수업 계획표 */}
                    {activeTab === 'syllabus' && (
                        <div className="space-y-6">
                            {/* 강의 개요 카드 */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        강의 개요
                                    </h2>
                                </div>

                                {/* 강의 목표 */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Target className="w-5 h-5 text-primary-600" />
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            강의 목표
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        본 강의는 웹 프로그래밍의 기초부터 실무 활용까지 체계적으로 학습합니다.
                                        HTML, CSS, JavaScript의 기본 개념을 이해하고, React 프레임워크를 활용한
                                        현대적인 웹 애플리케이션 개발 능력을 배양합니다.
                                    </p>
                                </div>

                                {/* 사용 교재 */}
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                                        사용 교재
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                                        <p className="text-gray-900 dark:text-white font-semibold">📘 모던 웹 개발 입문</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            저자: 김개발 | 출판사: 코딩출판사 | 2026년 1월
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 평가 비중 */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    평가 비중
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { name: '출석', weight: 10, color: 'bg-blue-500' },
                                        { name: '중간고사', weight: 30, color: 'bg-purple-500' },
                                        { name: '기말고사', weight: 40, color: 'bg-primary-500' },
                                        { name: '과제', weight: 20, color: 'bg-orange-500' }
                                    ].map((item) => (
                                        <div key={item.name}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </span>
                                                <span className="text-lg font-bold text-primary-600">
                                                    {item.weight}%
                                                </span>
                                            </div>
                                            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.color} transition-all duration-500`}
                                                    style={{ width: `${item.weight}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 주차별 계획 */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    주차별 수업 계획
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white w-24">
                                                    주차
                                                </th>
                                                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                    학습 주제
                                                </th>
                                                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white w-32">
                                                    수업 방식
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { week: 1, topic: '웹 프로그래밍 개요 및 HTML 기초', method: '이론' },
                                                { week: 2, topic: 'CSS 스타일링과 레이아웃', method: '이론+실습' },
                                                { week: 3, topic: 'JavaScript 기초 문법', method: '이론+실습' },
                                                { week: 4, topic: 'DOM 조작과 이벤트 처리', method: '실습' },
                                                { week: 5, topic: 'jQuery와 Ajax', method: '이론+실습' },
                                                { week: 6, topic: '프론트엔드 프레임워크 개요', method: '이론' },
                                                { week: 7, topic: 'React 기초', method: '이론+실습' },
                                                { week: 8, topic: '중간고사', method: '시험' },
                                                { week: 9, topic: 'React 컴포넌트와 Props', method: '이론+실습' },
                                                { week: 10, topic: 'State와 라이프사이클', method: '실습' },
                                                { week: 11, topic: 'React Hooks', method: '이론+실습' },
                                                { week: 12, topic: 'React Router와 네비게이션', method: '실습' },
                                                { week: 13, topic: 'API 연동과 비동기 처리', method: '이론+실습' },
                                                { week: 14, topic: '프로젝트 실습', method: '실습' },
                                                { week: 15, topic: '기말고사', method: '시험' }
                                            ].map((item) => (
                                                <tr key={item.week} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                    <td className="py-4 px-4">
                                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold">
                                                            {item.week}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                                                        {item.topic}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.method === '시험'
                                                            ? 'bg-error text-white'
                                                            : item.method === '실습'
                                                                ? 'bg-primary-100 text-primary-700'
                                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                            }`}>
                                                            {item.method}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 성적 시뮬레이터 */}
                            <div className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800 rounded-3xl shadow-lg p-8 border-2 border-primary-200 dark:border-primary-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        성적 시뮬레이터
                                    </h2>
                                </div>

                                {/* 예상 총점 및 등급 */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* 예상 총점 */}
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">예상 총점</p>
                                            <motion.p
                                                key={`${simulatorScores.attendance}-${simulatorScores.midterm}-${simulatorScores.final}-${simulatorScores.assignment}`}
                                                initial={{ scale: 1.2, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-5xl font-bold text-primary-600"
                                            >
                                                {(
                                                    simulatorScores.attendance * 0.1 +
                                                    simulatorScores.midterm * 0.3 +
                                                    simulatorScores.final * 0.4 +
                                                    simulatorScores.assignment * 0.2
                                                ).toFixed(1)}
                                            </motion.p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">/ 100점</p>
                                        </div>

                                        {/* 예상 등급 */}
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">예상 등급</p>
                                            {(() => {
                                                const total = (
                                                    simulatorScores.attendance * 0.1 +
                                                    simulatorScores.midterm * 0.3 +
                                                    simulatorScores.final * 0.4 +
                                                    simulatorScores.assignment * 0.2
                                                );
                                                let grade = 'F';
                                                let color = 'text-gray-500';

                                                if (total >= 95) { grade = 'A+'; color = 'text-primary-600'; }
                                                else if (total >= 90) { grade = 'A0'; color = 'text-primary-600'; }
                                                else if (total >= 85) { grade = 'B+'; color = 'text-blue-600'; }
                                                else if (total >= 80) { grade = 'B0'; color = 'text-blue-600'; }
                                                else if (total >= 75) { grade = 'C+'; color = 'text-yellow-600'; }
                                                else if (total >= 70) { grade = 'C0'; color = 'text-yellow-600'; }
                                                else if (total >= 65) { grade = 'D+'; color = 'text-orange-600'; }
                                                else if (total >= 60) { grade = 'D0'; color = 'text-orange-600'; }
                                                else { grade = 'F'; color = 'text-error'; }

                                                return (
                                                    <motion.p
                                                        key={total}
                                                        initial={{ scale: 1.2, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className={`text-5xl font-bold ${color}`}
                                                    >
                                                        {grade}
                                                    </motion.p>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                {/* 입력 카드들 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* 출석 */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">출석</h4>
                                                <p className="text-xs text-gray-500">10% 반영</p>
                                            </div>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {simulatorScores.attendance}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={simulatorScores.attendance}
                                            onChange={(e) => setSimulatorScores({ ...simulatorScores, attendance: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0점</span>
                                            <span>100점</span>
                                        </div>
                                    </div>

                                    {/* 중간고사 */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">중간고사</h4>
                                                <p className="text-xs text-gray-500">30% 반영</p>
                                            </div>
                                            <span className="text-2xl font-bold text-purple-600">
                                                {simulatorScores.midterm}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={simulatorScores.midterm}
                                            onChange={(e) => setSimulatorScores({ ...simulatorScores, midterm: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0점</span>
                                            <span>100점</span>
                                        </div>
                                    </div>

                                    {/* 기말고사 (목표 점수) */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border-2 border-primary-300 dark:border-primary-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">기말고사</h4>
                                                <p className="text-xs text-primary-600 font-semibold">40% 반영 (목표)</p>
                                            </div>
                                            <span className="text-2xl font-bold text-primary-600">
                                                {simulatorScores.final}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={simulatorScores.final}
                                            onChange={(e) => setSimulatorScores({ ...simulatorScores, final: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0점</span>
                                            <span>100점</span>
                                        </div>
                                    </div>

                                    {/* 과제 */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">과제 평균</h4>
                                                <p className="text-xs text-gray-500">20% 반영</p>
                                            </div>
                                            <span className="text-2xl font-bold text-orange-600">
                                                {simulatorScores.assignment}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="0.5"
                                            value={simulatorScores.assignment}
                                            onChange={(e) => setSimulatorScores({ ...simulatorScores, assignment: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0점</span>
                                            <span>100점</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 도움말 */}
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <p className="text-sm text-blue-800 dark:text-blue-300">
                                        💡 <strong>Tip:</strong> 슬라이더를 움직여 목표 점수를 설정하면 실시간으로 예상 등급을 확인할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 공지 */}
                    {activeTab === 'notices' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                교수님 공지사항
                            </h2>
                            <div className="space-y-4">
                                {notices.map((notice) => (
                                    <div
                                        key={notice.id}
                                        className="p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {notice.title}
                                                    </h3>
                                                    {notice.isNew && (
                                                        <span className="px-2 py-0.5 bg-error text-white text-xs font-bold rounded-full">
                                                            NEW
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {notice.date}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {notice.views}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 자료 */}
                    {activeTab === 'materials' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                수업 자료
                            </h2>
                            <div className="space-y-4">
                                {materials.map((material) => (
                                    <div
                                        key={material.id}
                                        className="p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-between hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl">{getFileIcon(material.type)}</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    {material.name}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                    <span>{material.type}</span>
                                                    <span>·</span>
                                                    <span>{material.size}</span>
                                                    <span>·</span>
                                                    <span>{material.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-primary-500 text-white rounded-xl hover-lift transition flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            다운로드
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 과제 */}
                    {activeTab === 'assignments' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                과제 제출
                            </h2>
                            <div className="space-y-4">
                                {assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className={`p-5 rounded-2xl hover:shadow-md transition ${assignment.status === 'overdue'
                                            ? 'bg-error/5 border-2 border-error/20'
                                            : 'bg-gray-50 dark:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-grow">
                                                <h3 className={`font-semibold mb-2 ${assignment.status === 'overdue'
                                                    ? 'text-error'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                    {assignment.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        마감: {assignment.dueDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                {getStatusBadge(assignment.status, assignment.daysLeft)}
                                                {assignment.status === 'pending' && (
                                                    <button className="px-4 py-1.5 bg-primary-500 text-white text-sm rounded-lg hover-lift transition">
                                                        제출하기
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 성적 */}
                    {activeTab === 'grades' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                성적 공개
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                            <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                항목
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                점수
                                            </th>
                                            <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                비고
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-4 px-4 text-gray-900 dark:text-white">중간고사</td>
                                            <td className="text-center py-4 px-4">
                                                <span className="font-bold text-primary-600 text-lg">{grades.midterm}점</span>
                                            </td>
                                            <td className="text-center py-4 px-4 text-gray-600 dark:text-gray-400">
                                                공개
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-4 px-4 text-gray-900 dark:text-white">기말고사</td>
                                            <td className="text-center py-4 px-4 text-gray-500 dark:text-gray-400">
                                                미공개
                                            </td>
                                            <td className="text-center py-4 px-4 text-gray-600 dark:text-gray-400">
                                                예정
                                            </td>
                                        </tr>
                                        {grades.assignments.map((assignment, idx) => (
                                            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="py-4 px-4 text-gray-900 dark:text-white">{assignment.name}</td>
                                                <td className="text-center py-4 px-4">
                                                    {assignment.score > 0 ? (
                                                        <span className="font-bold text-primary-600 text-lg">{assignment.score}점</span>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-gray-400">미공개</span>
                                                    )}
                                                </td>
                                                <td className="text-center py-4 px-4 text-gray-600 dark:text-gray-400">
                                                    {assignment.score > 0 ? '공개' : '채점중'}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-4 px-4 text-gray-900 dark:text-white">출석</td>
                                            <td className="text-center py-4 px-4">
                                                <span className="font-bold text-primary-600 text-lg">{grades.attendance}%</span>
                                            </td>
                                            <td className="text-center py-4 px-4 text-gray-600 dark:text-gray-400">
                                                공개
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default CourseDetail;
