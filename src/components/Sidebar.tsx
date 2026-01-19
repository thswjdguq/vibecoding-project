import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Home as HomeIcon, MessageSquare, Calculator,
    Star, Bell, ChevronDown, ChevronRight,
    BookOpen, Calendar, UtensilsCrossed
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(['학습 관리']);

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const menuSections = [
        {
            title: '메인',
            items: [
                { name: '홈', path: '/', icon: <HomeIcon className="w-5 h-5" /> },
                { name: '공지사항', path: '/notices', icon: <Bell className="w-5 h-5" /> },
            ]
        },
        {
            title: '학습 관리',
            items: [
                { name: 'AI 챗봇', path: '/chatbot', icon: <MessageSquare className="w-5 h-5" /> },
                { name: '학점 계산기', path: '/grade', icon: <Calculator className="w-5 h-5" /> },
                { name: '강의 리뷰', path: '/review', icon: <Star className="w-5 h-5" /> },
                { name: 'E클래스', path: '/eclass', icon: <BookOpen className="w-5 h-5" /> },
            ]
        },
        {
            title: '캠퍼스 생활',
            items: [
                { name: '학사 일정', path: '/calendar', icon: <Calendar className="w-5 h-5" /> },
                { name: '학생식당 메뉴', path: '/cafeteria', icon: <UtensilsCrossed className="w-5 h-5" /> },
            ]
        },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Overlay (모바일) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ x: isOpen ? 0 : -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed left-0 top-16 bottom-0 w-70 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 overflow-y-auto ${isOpen ? '' : 'lg:translate-x-0'
                    }`}
                style={{ width: '280px' }}
            >
                <div className="p-4">
                    {/* Close button (모바일만) */}
                    <button
                        onClick={onClose}
                        className="lg:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Menu sections */}
                    <div className="space-y-6 mt-12 lg:mt-4">
                        {menuSections.map((section) => (
                            <div key={section.title}>
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(section.title)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
                                >
                                    <span>{section.title}</span>
                                    {expandedSections.includes(section.title) ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {/* Section Items */}
                                <AnimatePresence>
                                    {expandedSections.includes(section.title) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-2 space-y-1">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={onClose}
                                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${isActive(item.path)
                                                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 font-semibold'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {item.icon}
                                                        <span>{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
