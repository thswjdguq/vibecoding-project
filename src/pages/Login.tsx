import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

function Login() {
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        if (!studentId || !password) {
            setError('학번과 비밀번호를 입력해주세요.');
            return;
        }

        setLoading(true);

        // 임시 로그인 로직 (실제로는 API 호출)
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('studentName', '김민수');
            localStorage.setItem('studentId', studentId);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            {/* 중앙 로그인 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-medium p-8">
                    {/* 헤더 */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-100 dark:bg-primary-900 mb-6"
                        >
                            <LogIn className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                신구대학교
                            </h1>
                            <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">
                                스마트 캠퍼스 포털
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                학번과 비밀번호로 로그인하세요
                            </p>
                        </motion.div>
                    </div>

                    {/* 로그인 폼 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="space-y-6"
                    >
                        <Input
                            label="학번"
                            type="text"
                            placeholder="학번을 입력하세요"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            icon={<User className="w-5 h-5" />}
                            iconPosition="left"
                            required
                        />

                        <Input
                            label="비밀번호"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="w-5 h-5" />}
                            iconPosition="left"
                            required
                            error={error}
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    로그인 상태 유지
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition"
                            >
                                비밀번호 찾기
                            </a>
                        </div>

                        <Button
                            fullWidth
                            size="lg"
                            loading={loading}
                            onClick={handleLogin}
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            로그인
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                                    또는
                                </span>
                            </div>
                        </div>

                        {/* 추가 링크 */}
                        <div className="text-center space-y-3">
                            <Button variant="outline" fullWidth>
                                신입생 가이드 보기
                            </Button>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                계정이 없으신가요?{' '}
                                <a
                                    href="#"
                                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition"
                                >
                                    회원가입
                                </a>
                            </p>
                        </div>
                    </motion.div>

                    {/* 푸터 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        <p>문제가 있으신가요? <a href="#" className="text-primary-600 hover:underline">고객센터</a></p>
                        <p className="mt-2">© 2026 신구대학교. All rights reserved.</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
