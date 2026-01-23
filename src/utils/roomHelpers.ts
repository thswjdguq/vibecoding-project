import { Room, RoomSchedule, RoomSearchFilter, AvailableRoom } from '../types/room';

/**
 * 시간 문자열을 분 단위로 변환
 */
const parseTime = (timeStr: string): number => {
    const [hour, min] = timeStr.split(':').map(Number);
    return hour * 60 + min;
};

/**
 * 특정 시간대에 강의실이 사용 중인지 확인
 * @param schedule - 강의실 스케줄
 * @param searchStart - 검색 시작 시간
 * @param searchEnd - 검색 종료 시간
 * @returns 사용 중 여부
 */
export const isRoomOccupied = (
    schedule: RoomSchedule,
    searchStart: string,
    searchEnd: string
): boolean => {
    const scheduleStart = parseTime(schedule.startTime);
    const scheduleEnd = parseTime(schedule.endTime);
    const searchStartMin = parseTime(searchStart);
    const searchEndMin = parseTime(searchEnd);

    // 겹치는 시간이 있는지 확인
    return !(scheduleEnd <= searchStartMin || scheduleStart >= searchEndMin);
};

/**
 * 빈 강의실 찾기
 * @param rooms - 전체 강의실 목록
 * @param schedules - 전체 강의실 스케줄
 * @param filter - 검색 조건
 * @returns 사용 가능한 강의실 목록
 */
export const findAvailableRooms = (
    rooms: Room[],
    schedules: RoomSchedule[],
    filter: RoomSearchFilter
): AvailableRoom[] => {
    return rooms
        .filter(room => {
            // 건물 필터
            if (filter.building && room.building !== filter.building) {
                return false;
            }

            // 최소 인원 필터
            if (filter.minCapacity && room.capacity < filter.minCapacity) {
                return false;
            }

            return true;
        })
        .map(room => {
            // 해당 강의실의 해당 요일 스케줄 찾기
            const roomSchedules = schedules.filter(
                s => s.roomId === room.id && s.day === filter.day
            );

            // 검색 시간대에 사용 중인지 확인
            const isOccupied = roomSchedules.some(schedule =>
                isRoomOccupied(schedule, filter.startTime, filter.endTime)
            );

            // 다음 사용 시작 시간 찾기
            let nextOccupiedTime: string | undefined;

            if (!isOccupied) {
                const futureSchedules = roomSchedules
                    .filter(s => parseTime(s.startTime) >= parseTime(filter.endTime))
                    .sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));

                if (futureSchedules.length > 0) {
                    nextOccupiedTime = futureSchedules[0].startTime;
                }
            }

            return {
                ...room,
                isAvailable: !isOccupied,
                nextOccupiedTime
            };
        })
        .filter(room => room.isAvailable);  // 사용 가능한 강의실만 반환
};

/**
 * 주간 전체 시간표 데이터 생성
 * @returns 요일별 수업 목록
 */
export const getWeeklySchedule = () => {
    return {
        1: [ // 월요일
            { name: '웹프로그래밍', time: '09:00-12:00', location: 'IT관 301호', professor: '김교수' },
            { name: '데이터베이스', time: '14:00-17:00', location: 'IT관 201호', professor: '이교수' }
        ],
        2: [ // 화요일
            { name: '알고리즘', time: '10:00-12:00', location: 'IT관 401호', professor: '박교수' },
            { name: '자료구조', time: '13:00-15:00', location: 'IT관 301호', professor: '최교수' }
        ],
        3: [ // 수요일
            { name: '운영체제', time: '09:00-11:00', location: 'IT관 501호', professor: '정교수' },
            { name: '네트워크', time: '13:00-15:00', location: 'IT관 201호', professor: '강교수' }
        ],
        4: [ // 목요일
            { name: '소프트웨어공학', time: '10:00-12:00', location: 'IT관 301호', professor: '윤교수' }
        ],
        5: [ // 금요일
            { name: '캡스톤디자인', time: '14:00-17:00', location: 'IT관 401호', professor: '정교수' }
        ]
    };
};
