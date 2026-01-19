import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { User, GraduationCap, Hash, Award } from 'lucide-react';

interface DigitalIDCardProps {
    name: string;
    studentId: string;
    department: string;
    year: string;
}

const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ name, studentId, department, year }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-sm overflow-hidden relative"
        >
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 p-8">
                {/* 헤더 */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-white/90" />
                        <span className="text-sm font-semibold text-white/90">신구대학교 디지털 학생증</span>
                    </div>
                </div>

                {/* QR 코드 - 상단 중앙 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-lg">
                        <QRCodeSVG
                            value={`SHINGU-STUDENT-${studentId}-${name}`}
                            size={160}
                            level="H"
                            fgColor="#1f2937"
                        />
                    </div>
                </div>

                {/* 학생 정보 - QR 아래 중앙 정렬 */}
                <div className="text-center space-y-4">
                    {/* 이름 */}
                    <h2 className="text-4xl font-bold text-white mb-2">{name}</h2>

                    {/* 학번 */}
                    <div className="flex items-center justify-center gap-2">
                        <Hash className="w-4 h-4 text-white/70" />
                        <span className="text-lg font-semibold text-white/90">{studentId}</span>
                    </div>

                    {/* 학과 */}
                    <div>
                        <p className="text-2xl font-bold text-white">{department}</p>
                    </div>

                    {/* 학년 */}
                    <div className="flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-white/70" />
                        <span className="text-base font-medium text-white/90">{year}</span>
                    </div>
                </div>

                {/* 하단 바코드 스타일 장식 */}
                <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between text-xs text-white/70">
                        <span>유효기간: 2026.03.01 ~ 2027.02.28</span>
                        <span className="font-mono">ID-{studentId}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DigitalIDCard;
