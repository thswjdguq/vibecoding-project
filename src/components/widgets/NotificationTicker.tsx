import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface NotificationTickerProps {
    notices: string[];  // 공지사항 목록
}

/**
 * 실시간 학사공지 티커
 * 무한 스크롤로 공지사항을 흘려보냄
 */
const NotificationTicker: React.FC<NotificationTickerProps> = ({ notices }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-500 text-white rounded-2xl p-4 mb-6 overflow-hidden"
        >
            <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 overflow-hidden">
                    {/* Framer Motion으로 무한 스크롤 구현 */}
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{
                            duration: 30,      // 30초 주기
                            repeat: Infinity,  // 무한 반복
                            ease: "linear"     // 일정한 속도
                        }}
                        className="whitespace-nowrap font-semibold"
                    >
                        {notices.map((notice, i) => (
                            <span key={i} className="mr-12">
                                {notice}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default NotificationTicker;
