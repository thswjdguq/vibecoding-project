import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/navigation';
import { User } from 'lucide-react';

interface UserProfileSectionProps {
    profile: UserProfile;
}

/**
 * 사이드바 하단 사용자 프로필 섹션
 * 개인화된 느낌을 강조하기 위해 사용자 정보를 표시
 */
const UserProfileSection: React.FC<UserProfileSectionProps> = ({ profile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700"
        >
            <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                    {/* 프로필 아바타 */}
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold shadow-md">
                        {profile.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6" />
                        )}
                    </div>

                    {/* 사용자 정보 */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white truncate">
                            {profile.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {profile.department} · {profile.year}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                            {profile.studentId}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserProfileSection;
