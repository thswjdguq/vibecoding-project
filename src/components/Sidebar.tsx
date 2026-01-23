import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import NavItem from './navigation/NavItem';
import UserProfileSection from './navigation/UserProfileSection';
import { menuCategories } from '../constants/menuData';
import { UserProfile } from '../types/navigation';

interface SidebarProps {
    isOpen?: boolean;           // 모바일에서 사이드바 열림 상태
    onClose?: () => void;       // 모바일에서 사이드바 닫기 함수
}

/**
 * 사이드바 메인 컴포넌트
 * 데스크톱: 고정 사이드바
 * 모바일: 햄버거 메뉴로 토글
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
    const location = useLocation();

    // 사용자 프로필 정보 (실제로는 Context나 Redux에서 가져와야 함)
    const userProfile: UserProfile = {
        name: '김학생',
        studentId: '20241234',
        department: '스마트IT과',
        year: '2학년'
    };

    /**
     * 현재 경로가 메뉴 아이템의 경로와 일치하는지 확인
     */
    const isActivePath = (path: string): boolean => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* 모바일 오버레이 배경 */}
            {isOpen && onClose && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* 사이드바 */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: isOpen ? 0 : -280 }}
                transition={{ type: "spring", damping: 20 }}
                className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 
          shadow-xl z-50 flex flex-col
          lg:relative lg:translate-x-0 lg:shadow-none
        `}
            >
                {/* 헤더 (모바일 닫기 버튼) */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">메뉴</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* 메뉴 리스트 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {menuCategories.map((category) => (
                        <div key={category.id}>
                            {/* 카테고리 제목 */}
                            <h3 className="px-4 mb-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {category.title}
                            </h3>

                            {/* 메뉴 아이템들 */}
                            <div className="space-y-1">
                                {category.items.map((item) => (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        isActive={isActivePath(item.path)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 사용자 프로필 (하단) */}
                <div className="p-4">
                    <UserProfileSection profile={userProfile} />
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
