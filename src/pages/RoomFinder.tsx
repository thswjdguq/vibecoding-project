import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Users, Clock } from 'lucide-react';
import { Room, RoomSchedule, RoomSearchFilter } from '../types/room';
import { findAvailableRooms } from '../utils/roomHelpers';

/**
 * 빈 강의실 찾기 페이지
 * 건물별 필터와 시간대 선택으로 사용 가능한 강의실 검색
 */
function RoomFinder() {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();

    // 검색 필터 상태
    const [filter, setFilter] = useState<RoomSearchFilter>({
        building: '',
        minCapacity: undefined,
        startTime: `${currentHour}:00`,
        endTime: `${currentHour + 2}:00`,
        day: currentDay === 0 || currentDay === 6 ? 1 : currentDay  // 주말이면 월요일로
    });

    // 강의실 목록 (실제로는 DB에서 가져와야 함)
    const rooms: Room[] = [
        { id: 'IT-301', building: 'IT관', roomNumber: '301호', capacity: 40, facilities: ['빔프로젝터', '화이트보드'] },
        { id: 'IT-401', building: 'IT관', roomNumber: '401호', capacity: 30, facilities: ['빔프로젝터'] },
        { id: 'IT-501', building: 'IT관', roomNumber: '501호', capacity: 50, facilities: ['빔프로젝터', '화이트보드', '마이크'] },
        { id: 'COMP-201', building: '종합관', roomNumber: '201호', capacity: 60, facilities: ['빔프로젝터', '화이트보드'] },
        { id: 'COMP-301', building: '종합관', roomNumber: '301호', capacity: 35, facilities: ['빔프로젝터'] },
    ];

    // 강의실 스케줄 (실제로는 DB에서 가져와야 함)
    const schedules: RoomSchedule[] = [
        { roomId: 'IT-301', day: 1, startTime: '09:00', endTime: '12:00', className: '웹프로그래밍', professor: '김교수' },
        { roomId: 'IT-401', day: 1, startTime: '10:00', endTime: '12:00', className: '알고리즘', professor: '박교수' },
        { roomId: 'IT-301', day: 2, startTime: '13:00', endTime: '15:00', className: '자료구조', professor: '최교수' },
        { roomId: 'COMP-201', day: 1, startTime: '14:00', endTime: '17:00', className: '데이터베이스', professor: '이교수' },
    ];

    // 빈 강의실 검색
    const availableRooms = findAvailableRooms(rooms, schedules, filter);

    // 건물 목록
    const buildings = ['전체', 'IT관', '종합관', '미래창의관'];

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Search className="w-8 h-8 text-primary-600" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        빈 강의실 찾기
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    팀플이나 스터디에 적합한 강의실을 찾아보세요
                </p>
            </motion.div>

            {/* 검색 필터 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">검색 조건</h3>

                {/* 건물 선택 */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        건물
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {buildings.map((building) => (
                            <button
                                key={building}
                                onClick={() => setFilter({ ...filter, building: building === '전체' ? '' : building })}
                                className={`py-3 px-4 rounded-xl font-semibold transition ${(building === '전체' && !filter.building) || filter.building === building
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {building}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 시간대 선택 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            시작 시간
                        </label>
                        <input
                            type="time"
                            value={filter.startTime}
                            onChange={(e) => setFilter({ ...filter, startTime: e.target.value })}
                            className="w-full py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            종료 시간
                        </label>
                        <input
                            type="time"
                            value={filter.endTime}
                            onChange={(e) => setFilter({ ...filter, endTime: e.target.value })}
                            className="w-full py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* 최소 인원 */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        최소 인원 (팀플 인원)
                    </label>
                    <div className="flex gap-2">
                        {[0, 10, 20, 30, 40].map((capacity) => (
                            <button
                                key={capacity}
                                onClick={() => setFilter({ ...filter, minCapacity: capacity === 0 ? undefined : capacity })}
                                className={`flex-1 py-2 px-3 rounded-xl font-semibold transition ${(!filter.minCapacity && capacity === 0) || filter.minCapacity === capacity
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {capacity === 0 ? '전체' : `${capacity}명+`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 검색 결과 */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        사용 가능한 강의실
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        총 {availableRooms.length}개
                    </span>
                </div>

                {availableRooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableRooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover-lift"
                            >
                                {/* 강의실 번호 */}
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                            {room.roomNumber}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {room.building}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                                        이용 가능
                                    </span>
                                </div>

                                {/* 수용 인원 */}
                                <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold">최대 {room.capacity}명</span>
                                </div>

                                {/* 다음 사용 시간 */}
                                {room.nextOccupiedTime && (
                                    <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 mb-3">
                                        <Clock className="w-4 h-4" />
                                        <span>{room.nextOccupiedTime}부터 사용 예정</span>
                                    </div>
                                )}

                                {/* 편의시설 */}
                                <div className="flex flex-wrap gap-2">
                                    {room.facilities.map((facility, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                        >
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            해당 조건에 맞는 강의실이 없습니다
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            다른 시간대나 건물을 선택해보세요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoomFinder;
