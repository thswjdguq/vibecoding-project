/**
 * 홈 화면 관련 타입 정의
 */

// 수업 정보
export interface ClassInfo {
    name: string;          // 과목명
    time: string;          // 시간 (예: "09:00-12:00")
    location: string;      // 강의실 위치
    professor: string;     // 교수명
}

// 현재 수업 상태
export interface CurrentClassStatus {
    status: 'ongoing' | 'upcoming' | 'free' | 'done';  // 진행중, 예정, 공강, 종료
    message: string;       // 상태 메시지
    class: ClassInfo | null;  // 수업 정보 (없으면 null)
}

// 학식 메뉴
export interface MealInfo {
    time: string;          // 식사 시간 (점심/저녁)
    menu: string;          // 메뉴명
    price: number;         // 가격
    icon: string;          // 이모지 아이콘
}

// 공지사항
export interface Notice {
    id: number;
    title: string;
    category: string;      // 학사, 장학 등
    color: string;         // 배지 색상 클래스
}

// 과제
export interface Assignment {
    id: number;
    course: string;        // 과목명
    title: string;         // 과제명
    daysLeft: number;      // 남은 일수
    color: string;         // 색상 구분
}

// 도서 대출
export interface LibraryBook {
    title: string;
    dueDate: string;       // 반납 예정일
    daysLeft: number;      // 남은 일수
}

// 퀵 액션
export interface QuickAction {
    icon: any;             // Lucide 아이콘 컴포넌트
    label: string;
    path: string;          // 라우팅 경로
    color: string;         // 배경 색상 클래스
}
