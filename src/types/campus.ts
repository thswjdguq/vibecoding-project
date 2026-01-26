/**
 * 캠퍼스 공간 및 시간표 관련 타입 정의
 */

// 시간표 데이터
export interface ClassSchedule {
    id: string;
    name: string;
    professor: string;
    room: string;
    building: string;
    dayOfWeek: number; // 0: 일, 1: 월, 2: 화, 3: 수, 4: 목, 5: 금, 6: 토
    startTime: string; // "09:00"
    endTime: string; // "10:30"
    color?: string;
}

// 강의실 정보
export interface Room {
    id: string;
    number: string;
    building: string;
    capacity: number;
    features: string[]; // ['프로젝터', '큰 테이블', '화이트보드']
    currentStatus: 'available' | 'occupied';
    nextClass?: {
        time: string;
        className: string;
    };
}

// 건물 정보
export interface Building {
    id: string;
    name: string;
    rooms: string[];
}

// 필터 옵션
export interface RoomFilter {
    building?: string;
    timeSlot?: 'now' | 'after1h' | 'after2h';
    minCapacity?: number;
    features?: string[];
}

// 시간 슬롯 (시간표 그리드용)
export interface TimeSlot {
    hour: number;
    label: string; // "09:00"
}
