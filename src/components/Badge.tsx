import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gray';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    rounded = false,
    className = '',
}) => {
    const variants = {
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';

    return (
        <span className={`inline-flex items-center font-semibold ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
