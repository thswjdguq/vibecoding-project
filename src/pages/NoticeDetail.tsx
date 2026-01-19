import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Download, FileText, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState<string>('');

    // 더미 데이터
    const notice = {
        id: 1,
        category: '학사',
        title: '2026학년도 1학기 수강신청 안내',
        date: '2026-01-10',
        views: 523,
        author: '학사지원팀',
        content: `2026학년도 1학기 수강신청을 다음과 같이 실시하오니 학생 여러분의 적극적인 참여 바랍니다.

1. 수강신청 기간
  - 재학생: 2026년 1월 20일(월) 10:00 ~ 1월 22일(수) 18:00
  - 신입생 및 편입생: 2026년 2월 10일(월) 10:00 ~ 2월 12일(수) 18:00

2. 수강신청 방법
  - 스마트 캠퍼스 포털 로그인 → 학사정보 → 수강신청
  - 모바일 앱에서도 수강신청 가능

3. 유의사항
  - 수강신청 기간 중에는 시스템 접속이 원활하지 않을 수 있으니 여유를 가지고 신청해 주시기 바랍니다.
  - 정정기간에는 인원제한이 있는 과목에 한하여 선착순으로 신청 가능합니다.
  - 수강신청 학점은 최소 12학점, 최대 21학점입니다.

문의사항은 학사지원팀(02-1234-5678)으로 연락주시기 바랍니다.`,
        attachments: [
            { name: '2026학년도 1학기 수강신청 안내.pdf', size: '2.5 MB', type: 'PDF' },
            { name: '수강신청 가이드.pdf', size: '1.8 MB', type: 'PDF', }
        ]
    };

    const handlePreview = (fileName: string) => {
        setPreviewFile(fileName);
        setPreviewModalOpen(true);
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            '학사': 'bg-blue-100 text-blue-700',
            '장학': 'bg-primary-100 text-primary-700',
            '취업': 'bg-purple-100 text-purple-700',
            '일반': 'bg-gray-100 text-gray-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 뒤로 가기 */}
            <button
                onClick={() => navigate('/notices')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">목록으로</span>
            </button>

            {/* 메인 컨텐츠 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
                {/* 헤더 */}
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(notice.category)}`}>
                            {notice.category}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {notice.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{notice.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>조회 {notice.views}</span>
                        </div>
                        <div>
                            <span>작성자: {notice.author}</span>
                        </div>
                    </div>
                </div>

                {/* 본문 */}
                <div className="p-8 md:p-12">
                    <div className="prose dark:prose-invert max-w-none">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                            {notice.content}
                        </div>
                    </div>

                    {/* 본문 이미지 예시 (반응형) */}
                    <div className="mt-8">
                        <img
                            src="/api/placeholder/800/400"
                            alt="공지사항 이미지"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>

                    {/* AI 요약 버튼 */}
                    <div className="mt-8">
                        <button
                            onClick={() => alert('AI 요약 기능은 준비 중입니다.')}
                            className="w-full md:w-auto px-6 py-4 bg-primary-500 text-white rounded-2xl hover-lift transition flex items-center justify-center gap-2 font-semibold shadow-lg shadow-primary-500/30"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>AI로 이 공지 요약하기</span>
                        </button>
                    </div>
                </div>

                {/* 첨부파일 */}
                {notice.attachments && notice.attachments.length > 0 && (
                    <div className="px-8 pb-8">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                첨부파일 ({notice.attachments.length})
                            </h3>
                            <div className="space-y-3">
                                {notice.attachments.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-600 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3 flex-grow">
                                            <div className="text-2xl">📄</div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {file.type} · {file.size}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handlePreview(file.name)}
                                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span className="hidden sm:inline">미리보기</span>
                                            </button>
                                            <button className="px-4 py-2 bg-primary-500 text-white rounded-xl hover-lift transition flex items-center gap-2">
                                                <Download className="w-4 h-4" />
                                                <span className="hidden sm:inline">다운로드</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 모바일 이전글/다음글 네비게이션 (하단 고정) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40">
                <div className="flex items-center h-16">
                    <button
                        onClick={() => navigate(`/notices/${Number(id) - 1}`)}
                        className="flex-1 h-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-r border-gray-200 dark:border-gray-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-semibold">이전글</span>
                    </button>
                    <button
                        onClick={() => navigate(`/notices/${Number(id) + 1}`)}
                        className="flex-1 h-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <span className="font-semibold">다음글</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 데스크톱 이전글/다음글 */}
            <div className="hidden md:flex gap-4 mt-6">
                <button
                    onClick={() => navigate(`/notices/${Number(id) - 1}`)}
                    className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-3"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400">이전글</p>
                        <p className="font-semibold text-gray-900 dark:text-white">중간고사 일정 안내</p>
                    </div>
                </button>
                <button
                    onClick={() => navigate(`/notices/${Number(id) + 1}`)}
                    className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-3 justify-end"
                >
                    <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">다음글</p>
                        <p className="font-semibold text-gray-900 dark:text-white">2026년 국가장학금 신청 안내</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* 미리보기 모달 */}
            <AnimatePresence>
                {previewModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setPreviewModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        >
                            {/* 모달 헤더 */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        파일 미리보기
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {previewFile}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPreviewModalOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* 모달 본문 (미리보기 영역) */}
                            <div className="p-6 overflow-y-auto h-[calc(90vh-180px)]">
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-2xl p-8">
                                    <FileText className="w-24 h-24 text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                        PDF 파일 미리보기는 브라우저에서 지원됩니다.
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        실제 구현 시 PDF.js 또는 iframe을 사용하여 파일을 표시합니다.
                                    </p>
                                </div>
                            </div>

                            {/* 모달 푸터 */}
                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                                <button
                                    onClick={() => setPreviewModalOpen(false)}
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                >
                                    닫기
                                </button>
                                <button className="px-6 py-3 bg-primary-500 text-white rounded-xl hover-lift transition flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    다운로드
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NoticeDetail;
