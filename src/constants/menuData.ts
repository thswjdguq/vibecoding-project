/**
 * 사이드바 메뉴 데이터 상수
 */

import {
    Home, BookOpen, Bell, Calendar, GraduationCap,
    UtensilsCrossed, MapPin, HelpCircle, MessageCircle,
    User, FileText
} from 'lucide-react';
import { MenuCategory } from '../types/navigation';

/**
 * 사이드바 메뉴 구조
 * 4개 카테고리로 그룹화:
 * 1. 메인 (홈, AI 챗봇)
 * 2. 학사관리 (전체 시간표, E-Class, 공지사항, 성적)
 * 3. 캠퍼스 라이프 (빈 강의실, 학식, 강의평가)
 * 4. 지원 (마이페이지, 도움말)
 */
export const menuCategories: MenuCategory[] = [
    {
        id: 'main',
        title: '메인',
        items: [
            {
                id: 'home',
                label: '홈',
                icon: Home,
                path: '/'
            },
            {
                id: 'chatbot',
                label: 'AI 챗봇',
                icon: MessageCircle,
                path: '/chatbot',
                badge: 'NEW'
            }
        ]
    },
    {
        id: 'academic',
        title: '학사관리',
        items: [
            {
                id: 'schedule',
                label: '전체 시간표',
                icon: Calendar,
                path: '/schedule'
            },
            {
                id: 'eclass',
                label: 'E-Class',
                icon: BookOpen,
                path: '/eclass'
            },
            {
                id: 'notices',
                label: '공지사항',
                icon: Bell,
                path: '/notices',
                badge: '3'
            },
            {
                id: 'grade',
                label: '성적조회',
                icon: GraduationCap,
                path: '/grade'
            }
        ]
    },
    {
        id: 'campus-life',
        title: '캠퍼스 라이프',
        items: [
            {
                id: 'room-finder',
                label: '빈 강의실 찾기',
                icon: MapPin,
                path: '/room-finder'
            },
            {
                id: 'cafeteria',
                label: '학생식당',
                icon: UtensilsCrossed,
                path: '/cafeteria'
            },
            {
                id: 'review',
                label: '강의평가',
                icon: FileText,
                path: '/review'
            }
        ]
    },
    {
        id: 'support',
        title: '지원',
        items: [
            {
                id: 'mypage',
                label: '마이페이지',
                icon: User,
                path: '/mypage'
            },
            {
                id: 'help',
                label: '도움말',
                icon: HelpCircle,
                path: '/help'
            }
        ]
    }
];
