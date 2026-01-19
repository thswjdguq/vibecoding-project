import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    className?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    className = '',
    onClick,
}) => {
    const baseStyles = 'rounded-2xl transition-all duration-200';

    const variants = {
        default: 'bg-white dark:bg-gray-800 shadow-soft',
        elevated: 'bg-white dark:bg-gray-800 shadow-medium',
        outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
        glass: 'glass-effect dark:glass-effect-dark border border-white/20',
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverClass = hoverable ? 'hover-lift cursor-pointer' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverClass} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
