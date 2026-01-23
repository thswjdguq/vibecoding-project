import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuItem } from '../../types/navigation';

interface NavItemProps {
    item: MenuItem;
    isActive: boolean;
}

/**
 * 네비게이션 메뉴 아이템 컴포넌트
 * 개별 메뉴 항목을 렌더링하며 활성화 상태와 호버 효과를 처리
 */
const NavItem: React.FC<NavItemProps> = ({ item, isActive }) => {
    const navigate = useNavigate();
    const Icon = item.icon;

    return (
        <motion.button
            onClick={() => navigate(item.path)}
            whileHover={{ x: 4 }}  // 호버 시 오른쪽으로 살짝 이동
            whileTap={{ scale: 0.98 }}  // 클릭 시 살짝 축소
            className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-200 text-left
        ${isActive
                    ? 'bg-primary-500 text-white font-bold shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
      `}
        >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
            <span className="flex-1">{item.label}</span>

            {/* 배지 표시 (NEW, 숫자 등) */}
            {item.badge && (
                <span className={`
          px-2 py-0.5 rounded-full text-xs font-bold
          ${isActive
                        ? 'bg-white text-primary-600'
                        : 'bg-primary-100 text-primary-700'
                    }
        `}>
                    {item.badge}
                </span>
            )}
        </motion.button>
    );
};

export default NavItem;
