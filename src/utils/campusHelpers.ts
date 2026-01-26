import { ClassSchedule, Room } from '../types/campus';

/**
 * 현재 시간에 강의실이 비어있는지 확인
 * @param room 강의실 정보
 * @param currentTime 현재 시간
 * @param schedule 전체 시간표
 * @returns 비어있으면 true, 사용 중이면 false
 */
export const isRoomAvailable = (
    room: Room,
    currentTime: Date,
    schedule: ClassSchedule[]
): boolean => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    // 해당 강의실에서 진행 중인 수업 찾기
    const ongoingClass = schedule.find(cls =>
        cls.room === room.number &&
        cls.building === room.building &&
        cls.startTime <= currentTimeStr &&
        cls.endTime > currentTimeStr
    );

    return !ongoingClass;
};

/**
 * 다음 수업 시간 찾기
 * @param roomNumber 강의실 번호
 * @param building 건물명
 * @param schedule 전체 시간표
 * @returns 다음 수업 정보 또는 null
 */
export const findNextClass = (
    roomNumber: string,
    building: string,
    schedule: ClassSchedule[]
): ClassSchedule | null => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    // 해당 강의실의 미래 수업들을 시간순으로 정렬
    const upcomingClasses = schedule
        .filter(cls =>
            cls.room === roomNumber &&
            cls.building === building &&
            cls.startTime > currentTimeStr
        )
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return upcomingClasses.length > 0 ? upcomingClasses[0] : null;
};

/**
 * 시간표 데이터를 요일별로 그룹화
 * @param schedule 전체 시간표
 * @returns 요일별로 그룹화된 시간표 ({1: [...], 2: [...], ...})
 */
export const groupScheduleByDay = (
    schedule: ClassSchedule[]
): Record<number, ClassSchedule[]> => {
    return schedule.reduce((acc, cls) => {
        if (!acc[cls.dayOfWeek]) {
            acc[cls.dayOfWeek] = [];
        }
        acc[cls.dayOfWeek].push(cls);
        return acc;
    }, {} as Record<number, ClassSchedule[]>);
};

/**
 * 시간 문자열을 분으로 변환
 * @param timeStr 시간 문자열 ("09:00")
 * @returns 분 단위 (540)
 */
export const timeToMinutes = (timeStr: string): number => {
    const [hour, minute] = timeStr.split(':').map(Number);
    return hour * 60 + minute;
};

/**
 * 두 시간 사이의 차이 계산 (분 단위)
 * @param startTime 시작 시간 ("09:00")
 * @param endTime 종료 시간 ("10:30")
 * @returns 차이 (분 단위)
 */
export const getTimeDifference = (startTime: string, endTime: string): number => {
    return timeToMinutes(endTime) - timeToMinutes(startTime);
};

/**
 * 시간 슬롯 생성 (9시 ~ 18시)
 * @returns 시간 슬롯 배열
 */
export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
        slots.push({
            hour,
            label: `${hour.toString().padStart(2, '0')}:00`
        });
    }
    return slots;
};
