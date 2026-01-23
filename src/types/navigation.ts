/**
 * 네비게이션 관련 타입 정의
 */

import { LucideIcon } from 'lucide-react';

// 메뉴 아이템 기본 타입
export interface MenuItem {
    id: string;           // 고유 ID
    label: string;        // 메뉴 이름
    icon: LucideIcon;     // Lucide 아이콘
    path: string;         // 라우팅 경로
    badge?: string;       // 배지 (예: "NEW", "3")
}

// 메뉴 카테고리 타입
export interface MenuCategory {
    id: string;           // 카테고리 ID
    title: string;        // 카테고리 제목
    items: MenuItem[];    // 메뉴 아이템 목록
}

// 사용자 프로필 타입
export interface UserProfile {
    name: string;         // 이름
    studentId: string;    // 학번
    department: string;   // 학과
    year: string;         // 학년
    avatarUrl?: string;   // 프로필 사진 (옵션)
}
