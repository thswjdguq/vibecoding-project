import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, Sparkles } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: '안녕하세요! 신구대학교 스마트 캠퍼스 AI 어시스턴트입니다. 무엇을 도와드릴까요? 😊',
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickCommands = [
        '오늘 학식 메뉴 뭐야?',
        '이번 주 과제 알려줘',
        '내 학점 확인하기',
        '도서관 반납 예정 도서'
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text: string = inputText) => {
        if (!text.trim()) return;

        // 사용자 메시지 추가
        const userMessage: Message = {
            id: Date.now(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // AI 응답 시뮬레이션
        setTimeout(() => {
            const aiResponse = getAIResponse(text);
            const aiMessage: Message = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getAIResponse = (userText: string): string => {
        const lowerText = userText.toLowerCase();

        if (lowerText.includes('학식') || lowerText.includes('메뉴')) {
            return '오늘의 학생식당 메뉴입니다:\n\n🍚 A코너: 김치찌개 + 밥 (4,000원)\n🍜 B코너: 돈까스 + 우동 (5,000원)\n🥗 C코너: 샐러드바 (3,500원)\n\n운영시간: 11:30 ~ 14:00';
        }

        if (lowerText.includes('과제')) {
            return '이번 주 과제 현황입니다:\n\n📝 웹프로그래밍: HTML/CSS 레이아웃 과제 (D-5)\n💻 데이터베이스: ERD 설계 과제 (D-2)\n✅ 알고리즘: 정렬 알고리즘 구현 (제출완료)\n\n자세한 내용은 E-클래스에서 확인하세요!';
        }

        if (lowerText.includes('학점')) {
            return '현재 학기 성적 정보:\n\n📊 평점: 3.85 / 4.5\n📈 취득학점: 18 / 21\n🎯 전공평점: 4.0 / 4.5\n\n자세한 성적은 마이페이지에서 확인 가능합니다.';
        }

        if (lowerText.includes('도서관') || lowerText.includes('반납')) {
            return '도서관 대출 현황:\n\n📚 클린 코드 (D-3)\n📚 리팩토링 (D-1, 연장 필요)\n\n반납 예정일을 확인하시고 연체되지 않도록 주의하세요!';
        }

        return '질문해 주셔서 감사합니다! 더 자세한 정보가 필요하시면 구체적으로 질문해 주세요. 😊';
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col pb-20 md:pb-0">
            {/* 헤더 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <Bot className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            신구 AI 어시스턴트
                            <Sparkles className="w-5 h-5 text-primary-500" />
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">무엇을 도와드릴까요?</p>
                    </div>
                </div>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] md:max-w-[70%] rounded-3xl px-6 py-4 ${message.sender === 'user'
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        : 'bg-primary-50 dark:bg-primary-900/30 text-gray-900 dark:text-white'
                                        }`}
                                >
                                    {message.sender === 'ai' && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bot className="w-4 h-4 text-primary-600" />
                                            <span className="text-xs font-semibold text-primary-600">AI 어시스턴트</span>
                                        </div>
                                    )}
                                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* 타이핑 인디케이터 */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-primary-50 dark:bg-primary-900/30 rounded-3xl px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-4 h-4 text-primary-600" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">AI가 답변을 생각 중이에요</span>
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                                            className="w-2 h-2 bg-primary-500 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                                            className="w-2 h-2 bg-primary-500 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                                            className="w-2 h-2 bg-primary-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* 퀵 커맨드 버튼 */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        자주 묻는 질문
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {quickCommands.map((command, index) => (
                            <button
                                key={index}
                                onClick={() => handleSendMessage(command)}
                                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 rounded-2xl text-sm font-semibold transition hover-lift"
                            >
                                {command}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 입력창 */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="메시지를 입력하세요..."
                                className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500 focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700 dark:text-white text-lg"
                            />
                            <button
                                onClick={() => alert('음성 인식 기능은 준비 중입니다.')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition"
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputText.trim()}
                            className={`px-6 py-4 rounded-2xl transition flex items-center gap-2 ${inputText.trim()
                                ? 'bg-primary-500 text-white hover-lift shadow-lg shadow-primary-500/30'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            <span className="hidden md:inline font-semibold">전송</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
