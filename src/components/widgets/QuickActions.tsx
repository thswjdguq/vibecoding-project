import React from 'react';
import { motion } from 'framer-motion';
import { QuickAction } from '../../types/home';

interface QuickActionsProps {
    actions: QuickAction[];
    onNavigate: (path: string) => void;
}

/**
 * 퀵 액션 버튼 그리드
 * 주요 기능으로 빠르게 이동할 수 있는 버튼들
 */
const QuickActions: React.FC<QuickActionsProps> = ({ actions, onNavigate }) => {
    return (
        <div className="grid grid-cols-4 gap-3 mb-6">
            {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + index * 0.05 }}
                        onClick={() => onNavigate(action.path)}
                        className={`${action.color} text-white rounded-2xl p-4 min-h-[72px] hover-lift transition flex flex-col items-center justify-center`}
                    >
                        <Icon className="w-6 h-6 mb-2" />
                        <p className="text-xs font-semibold">{action.label}</p>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default QuickActions;
