import { ClassInfo } from '../types/home';

/**
 * 요일별 시간표 데이터를 반환하는 헬퍼 함수
 * @param day - 요일 (0: 일요일, 1: 월요일, ...)
 * @returns 해당 요일의 수업 목록
 */
export const getTodaySchedule = (day: number): ClassInfo[] => {
    const schedules: { [key: number]: ClassInfo[] } = {
        1: [ // 월요일
            {
                name: '웹프로그래밍',
                time: '09:00-12:00',
                location: 'IT관 301호',
                professor: '김교수',
                startHour: 9,
                startMinute: 0,
                endHour: 12,
                endMinute: 0
            },
            {
                name: '데이터베이스',
                time: '14:00-17:00',
                location: 'IT관 201호',
                professor: '이교수',
                startHour: 14,
                startMinute: 0,
                endHour: 17,
                endMinute: 0
            }
        ],
        2: [ // 화요일
            {
                name: '알고리즘',
                time: '10:00-12:00',
                location: 'IT관 401호',
                professor: '박교수',
                startHour: 10,
                startMinute: 0,
                endHour: 12,
                endMinute: 0
            },
            {
                name: '자료구조',
                time: '13:00-15:00',
                location: 'IT관 301호',
                professor: '최교수',
                startHour: 13,
                startMinute: 0,
                endHour: 15,
                endMinute: 0
            }
        ],
        3: [ // 수요일
            {
                name: '운영체제',
                time: '09:00-11:00',
                location: 'IT관 501호',
                professor: '정교수',
                startHour: 9,
                startMinute: 0,
                endHour: 11,
                endMinute: 0
            }
        ],
        4: [ // 목요일
            {
                name: '네트워크',
                time: '14:00-16:00',
                location: 'IT관 201호',
                professor: '강교수',
                startHour: 14,
                startMinute: 0,
                endHour: 16,
                endMinute: 0
            }
        ],
        5: [], // 금요일 - 공강
        0: [], // 일요일
        6: []  // 토요일
    };

    return schedules[day] || [];
};

/**
 * 현재 시각을 분 단위로 변환
 * @param hour - 시
 * @param minute - 분
 * @returns 총 분수
 */
const timeToMinutes = (hour: number, minute: number): number => {
    return hour * 60 + minute;
};

/**
 * 시간 문자열을 분 단위로 파싱
 * @param timeStr - 시간 문자열 (예: "09:00")
 * @returns 총 분수
 */
const parseTime = (timeStr: string): number => {
    const [hour, min] = timeStr.split(':').map(Number);
    return timeToMinutes(hour, min);
};

/**
 * 현재 수업 상태를 계산하는 함수
 * @param todayClasses - 오늘의 수업 목록
 * @param currentHour - 현재 시
 * @param currentMinute - 현재 분
 * @returns 현재 수업 상태 정보
 */
export const getCurrentClassInfo = (
    todayClasses: ClassInfo[],
    currentHour: number,
    currentMinute: number
) => {
    // 수업이 없는 경우
    if (todayClasses.length === 0) {
        return {
            status: 'free' as const,
            message: '현재 공강이에요! ☕',
            class: null
        };
    }

    const currentTime = timeToMinutes(currentHour, currentMinute);

    // 각 수업을 순회하며 현재 상태 확인
    for (const classItem of todayClasses) {
        const [startTime, endTime] = classItem.time.split('-');
        const classStart = parseTime(startTime);
        const classEnd = parseTime(endTime);

        // 현재 수업 중인지 확인
        if (currentTime >= classStart && currentTime < classEnd) {
            const remainingMin = classEnd - currentTime;
            return {
                status: 'ongoing' as const,
                message: `수업 중 (종료까지 ${remainingMin}분)`,
                class: classItem
            };
        }

        // 다음 수업까지 남은 시간 계산
        if (currentTime < classStart) {
            const untilMin = classStart - currentTime;
            return {
                status: 'upcoming' as const,
                message: `다음 수업까지 ${untilMin}분`,
                class: classItem
            };
        }
    }

    // 모든 수업이 종료된 경우
    return {
        status: 'done' as const,
        message: '오늘 수업 종료! 🎉',
        class: null
    };
};

/**
 * 현재 시간에 맞는 학식 메뉴를 반환
 * @param currentHour - 현재 시
 * @returns 학식 정보
 */
export const getTodayMeal = (currentHour: number) => {
    // 14시 이전: 점심, 이후: 저녁
    if (currentHour < 14) {
        return {
            time: '점심',
            menu: '돈까스 + 우동',
            price: 5500,
            icon: '🍛'
        };
    }
    return {
        time: '저녁',
        menu: '불고기 덮밥',
        price: 5000,
        icon: '🍚'
    };
};

/**
 * 시간대에 맞는 인사말을 반환
 * @param currentHour - 현재 시
 * @returns 인사말
 */
export const getGreeting = (currentHour: number): string => {
    if (currentHour < 12) return '좋은 아침이에요';
    if (currentHour < 18) return '좋은 오후예요';
    return '좋은 저녁이에요';
};

/**
 * 두 수업 사이의 공강 시간을 계산
 * @param class1 - 첫 번째 수업
 * @param class2 - 두 번째 수업
 * @returns 공강 시간 (분) 또는 null
 */
export const calculateBreakTime = (class1: ClassInfo, class2: ClassInfo): number | null => {
    const class1End = parseTime(class1.time.split('-')[1]);
    const class2Start = parseTime(class2.time.split('-')[0]);

    const breakMinutes = class2Start - class1End;

    // 10분 이상의 공강만 반환 (이동 시간 고려)
    return breakMinutes >= 10 ? breakMinutes : null;
};

/**
 * 수업이 종료되었는지 확인
 * @param classItem - 수업 정보
 * @param currentHour - 현재 시
 * @param currentMinute - 현재 분
 * @returns 종료 여부
 */
export const isClassCompleted = (
    classItem: ClassInfo,
    currentHour: number,
    currentMinute: number
): boolean => {
    const currentTime = timeToMinutes(currentHour, currentMinute);
    const classEnd = parseTime(classItem.time.split('-')[1]);

    return currentTime >= classEnd;
};

/**
 * 현재 진행 중인 수업인지 확인
 * @param classItem - 수업 정보
 * @param currentHour - 현재 시
 * @param currentMinute - 현재 분
 * @returns 진행 중 여부
 */
export const isCurrentClass = (
    classItem: ClassInfo,
    currentHour: number,
    currentMinute: number
): boolean => {
    const currentTime = timeToMinutes(currentHour, currentMinute);
    const [startTime, endTime] = classItem.time.split('-');
    const classStart = parseTime(startTime);
    const classEnd = parseTime(endTime);

    return currentTime >= classStart && currentTime < classEnd;
};
