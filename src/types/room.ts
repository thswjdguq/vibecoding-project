/**
 * 강의실 및 시간표 관련 타입 정의
 */

// 강의실 정보
export interface Room {
    id: string;              // 강의실 ID
    building: string;        // 건물명 (IT관, 종합관 등)
    roomNumber: string;      // 강의실 번호
    capacity: number;        // 수용 인원
    facilities: string[];    // 편의시설 (빔프로젝터, 화이트보드 등)
}

// 강의실 사용 시간대
export interface RoomSchedule {
    roomId: string;          // 강의실 ID
    day: number;             // 요일 (0: 일, 1: 월, ...)
    startTime: string;       // 시작 시간 (예: "09:00")
    endTime: string;         // 종료 시간 (예: "12:00")
    className: string;       // 수업명
    professor: string;       // 교수명
}

// 빈 강의실 검색 조건
export interface RoomSearchFilter {
    building?: string;       // 건물 필터 (옵션)
    minCapacity?: number;    // 최소 인원 (옵션)
    startTime: string;       // 검색 시작 시간
    endTime: string;         // 검색 종료 시간
    day: number;             // 요일
}

// 빈 강의실 검색 결과
export interface AvailableRoom extends Room {
    isAvailable: boolean;    // 사용 가능 여부
    nextOccupiedTime?: string;  // 다음 사용 시작 시간 (옵션)
}
