import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, Phone, Shield, Smartphone } from 'lucide-react';

function PasswordChangePage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1); // 1: 인증, 2: 비밀번호

    // Step 1: 본인인증
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [verified, setVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초

    // Step 2: 새 비밀번호
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 타이머
    useEffect(() => {
        if (sentCode && !verified && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [sentCode, verified, timeLeft]);

    // 타이머 포맷
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // 비밀번호 강도 계산
    const getPasswordStrength = (password: string) => {
        if (!password) return { level: 0, text: '', color: '' };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 2) return { level: 1, text: '위험', color: 'bg-error' };
        if (score <= 3) return { level: 2, text: '보통', color: 'bg-orange-500' };
        return { level: 3, text: '안전', color: 'bg-primary-500' };
    };

    const passwordStrength = getPasswordStrength(newPassword);

    // 비밀번호 일치 체크
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

    // 인증번호 발송
    const handleSendVerification = () => {
        setSentCode(true);
        setTimeLeft(180);
        alert('인증번호가 발송되었습니다!');
    };

    // PASS 앱 인증
    const handlePassAuth = () => {
        alert('PASS 앱을 실행합니다...');
        // 실제로는 PASS 앱 연동
    };

    // 인증번호 확인
    const handleVerify = () => {
        if (verificationCode === '123456') {
            setVerified(true);
            setTimeout(() => setCurrentStep(2), 500);
        } else {
            alert('인증번호가 일치하지 않습니다.');
        }
    };

    // 비밀번호 변경
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!newPassword || newPassword.length < 8) {
            newErrors.newPassword = '8자 이상 입력해주세요';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = '비밀번호를 다시 입력해주세요';
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        alert('비밀번호가 성공적으로 변경되었습니다!');
        navigate('/mypage');
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {currentStep === 1 ? (
                        // Step 1: 본인인증
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 md:p-12"
                        >
                            {/* 헤더 */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-100 dark:bg-primary-900 mb-4">
                                    <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    본인 인증
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    등록된 휴대폰으로 인증번호를 받으세요
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* 마스킹된 전화번호 표시 */}
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">등록된 휴대폰</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        010-12**-56**
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        으로 인증번호를 발송합니다
                                    </p>
                                </div>

                                {/* 인증번호 받기 버튼 */}
                                {!sentCode && (
                                    <button
                                        onClick={handleSendVerification}
                                        className="w-full py-5 bg-primary-500 text-white rounded-2xl hover-lift font-bold text-xl transition shadow-lg shadow-primary-500/30"
                                    >
                                        인증번호 받기
                                    </button>
                                )}

                                {/* 인증번호 입력 & 타이머 */}
                                {sentCode && !verified && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4"
                                    >
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="flex-grow px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500 focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700 dark:text-white text-center text-2xl font-bold tracking-widest"
                                                placeholder="000000"
                                                maxLength={6}
                                            />
                                            <div className="flex items-center justify-center px-6 py-4 bg-gray-100 dark:bg-gray-700 rounded-2xl min-w-[100px]">
                                                <span className={`text-xl font-bold ${timeLeft < 60 ? 'text-error' : 'text-primary-600'
                                                    }`}>
                                                    {formatTime(timeLeft)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleVerify}
                                            disabled={verificationCode.length !== 6}
                                            className={`w-full py-4 rounded-2xl font-semibold text-lg transition ${verificationCode.length === 6
                                                    ? 'bg-primary-500 text-white hover-lift'
                                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            인증 확인
                                        </button>

                                        {/* 재발송 */}
                                        <button
                                            onClick={handleSendVerification}
                                            className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
                                        >
                                            인증번호 다시 받기
                                        </button>
                                    </motion.div>
                                )}

                                {/* PASS 앱 인증 (보조) */}
                                {!verified && (
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">또는</span>
                                        </div>
                                    </div>
                                )}

                                {!verified && (
                                    <button
                                        onClick={handlePassAuth}
                                        className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <Smartphone className="w-5 h-5" />
                                        PASS 앱으로 인증하기
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        // Step 2: 새 비밀번호
                        <motion.form
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 md:p-12"
                        >
                            {/* 헤더 */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-100 dark:bg-primary-900 mb-4">
                                    <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    새 비밀번호 설정
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    안전한 비밀번호로 변경하세요
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* 새 비밀번호 */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        새 비밀번호
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setErrors({ ...errors, newPassword: '' });
                                            }}
                                            className={`w-full px-4 py-4 rounded-2xl border-2 ${errors.newPassword
                                                    ? 'border-error focus:border-error focus:ring-error'
                                                    : 'border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500'
                                                } focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700 dark:text-white text-lg`}
                                            placeholder="새 비밀번호를 입력하세요"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* 비밀번호 강도 게이지 */}
                                    {newPassword && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">비밀번호 강도</span>
                                                <span className={`text-sm font-bold ${passwordStrength.level === 1 ? 'text-error' :
                                                        passwordStrength.level === 2 ? 'text-orange-500' :
                                                            'text-primary-600'
                                                    }`}>
                                                    {passwordStrength.text}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(passwordStrength.level / 3) * 100}%` }}
                                                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {errors.newPassword && (
                                        <p className="mt-2 text-sm text-error">{errors.newPassword}</p>
                                    )}
                                </div>

                                {/* 새 비밀번호 확인 */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        새 비밀번호 확인
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors({ ...errors, confirmPassword: '' });
                                            }}
                                            className={`w-full px-4 py-4 pr-12 rounded-2xl border-2 ${errors.confirmPassword
                                                    ? 'border-error focus:border-error focus:ring-error'
                                                    : passwordsMatch
                                                        ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500'
                                                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500'
                                                } focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700 dark:text-white text-lg`}
                                            placeholder="새 비밀번호를 다시 입력하세요"
                                        />
                                        <div className="absolute right-12 top-1/2 -translate-y-1/2">
                                            {passwordsMatch && (
                                                <CheckCircle className="w-6 h-6 text-primary-600" />
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {passwordsMatch && (
                                        <p className="mt-2 text-sm text-primary-600 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            비밀번호가 일치합니다
                                        </p>
                                    )}
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-error">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* 변경 완료 버튼 */}
                                <button
                                    type="submit"
                                    disabled={!passwordsMatch || passwordStrength.level < 2}
                                    className={`w-full py-5 rounded-2xl font-bold text-xl transition mt-6 ${passwordsMatch && passwordStrength.level >= 2
                                            ? 'bg-primary-500 text-white hover-lift shadow-lg shadow-primary-500/30'
                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    비밀번호 변경 완료
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default PasswordChangePage;
