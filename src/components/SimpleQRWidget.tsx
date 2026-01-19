import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, GraduationCap, Hash, Award } from 'lucide-react';

interface SimpleQRWidgetProps {
    name: string;
    studentId: string;
    department: string;
    year: string;
}

const SimpleQRWidget: React.FC<SimpleQRWidgetProps> = ({ name, studentId, department, year }) => {
    const [qrTimer, setQrTimer] = useState(60);

    useEffect(() => {
        const qrInterval = setInterval(() => {
            setQrTimer(prev => prev > 0 ? prev - 1 : 60);
        }, 1000);

        return () => clearInterval(qrInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 border-2 border-primary-500"
        >
            {/* 상단: 학생 정보 - 가로 정렬 */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                {/* 이름 - 굵게 강조 */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {name}
                </h3>

                {/* 학과, 학년, 학번 - 가로 정렬 */}
                <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{department}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{year}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">{studentId}</span>
                    </div>
                </div>
            </div>

            {/* QR 코드 - 중앙 */}
            <div className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <QRCodeSVG
                        value={`SHINGU-LIBRARY-${studentId}-${name}-${Date.now()}`}
                        size={180}
                        level="H"
                        fgColor="#1f2937"
                    />
                </div>
            </div>

            {/* 타이틀 */}
            <div className="text-center mb-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    도서관 출입 QR
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    출입 시 스캔해주세요
                </p>
            </div>

            {/* 갱신 타이머 - 하단 강조 */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800">
                    <RefreshCw className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        갱신까지 {String(Math.floor(qrTimer / 60)).padStart(2, '0')}:{String(qrTimer % 60).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default SimpleQRWidget;
