import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, CheckCircle, Filter } from 'lucide-react';
import { Room, Building } from '../types/campus';

/**
 * 빈 강의실 찾기 페이지
 * 건물별 필터와 현재 사용 가능한 강의실 리스트 표시
 */
function RoomFinder() {
    // 건물 데이터
    const buildings: Building[] = [
        { id: 'all', name: '전체', rooms: [] },
        { id: 'it', name: 'IT관', rooms: ['301', '302', '401', '501'] },
        { id: 'main', name: '본관', rooms: ['201', '202', '301'] },
        { id: 'general', name: '종합관', rooms: ['101', '201', '301'] }
    ];

    // 샘플 강의실 데이터
    const [rooms] = useState<Room[]>([
        {
            id: '1',
            number: '301',
            building: 'IT관',
            capacity: 50,
            features: ['프로젝터', '큰 테이블', '화이트보드'],
            currentStatus: 'available',
            nextClass: {
                time: '14:00',
                className: '웹프로그래밍'
            }
        },
        {
            id: '2',
            number: '401',
            building: 'IT관',
            capacity: 40,
            features: ['프로젝터'],
            currentStatus: 'available',
            nextClass: {
                time: '15:00',
                className: '데이터베이스'
            }
        },
        {
            id: '3',
            number: '201',
            building: '본관',
            capacity: 30,
            features: ['화이트보드'],
            currentStatus: 'occupied'
        },
        {
            id: '4',
            number: '501',
            building: 'IT관',
            capacity: 60,
            features: ['프로젝터', '큰 테이블', '스크린'],
            currentStatus: 'available',
            nextClass: {
                time: '16:30',
                className: '알고리즘'
            }
        },
        {
            id: '5',
            number: '101',
            building: '종합관',
            capacity: 35,
            features: ['프로젝터', '화이트보드'],
            currentStatus: 'available'
        }
    ]);

    // 필터 상태
    const [selectedBuilding, setSelectedBuilding] = useState('all');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<'now' | 'after1h' | 'after2h'>('now');

    // 필터링된 강의실 목록
    const filteredRooms = rooms.filter(room => {
        // 건물 필터
        if (selectedBuilding !== 'all' && room.building !== buildings.find(b => b.id === selectedBuilding)?.name) {
            return false;
        }

        // 현재 사용 가능한 강의실만 표시
        return room.currentStatus === 'available';
    });

    /**
     * 남은 시간 계산
     */
    const getTimeUntilNext = (nextTime: string): string => {
        const currentHour = new Date().getHours();
        const [nextHour, nextMinute] = nextTime.split(':').map(Number);

        const currentMinutes = currentHour * 60 + new Date().getMinutes();
        const nextMinutes = nextHour * 60 + nextMinute;
        const diff = nextMinutes - currentMinutes;

        if (diff < 60) {
            return `${diff}분 남음`;
        }
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}시간 ${minutes}분 남음`;
    };

    /**
     * 특징 태그가 팀플에 적합한지 확인
     */
    const isTeamFriendly = (features: string[]): boolean => {
        return features.includes('큰 테이블');
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-8 h-8 text-primary-600" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">빈 강의실 찾기</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    현재 비어있는 강의실을 찾아 팀 프로젝트나 자습 공간으로 활용하세요
                </p>
            </motion.div>

            {/* 필터 섹션 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">필터</h2>
                </div>

                <div className="space-y-4">
                    {/* 건물 필터 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            건물 선택
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {buildings.map(building => (
                                <button
                                    key={building.id}
                                    onClick={() => setSelectedBuilding(building.id)}
                                    className={`px-4 py-2 rounded-xl font-semibold transition ${selectedBuilding === building.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {building.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 시간대 필터 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            시간대
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTimeSlot('now')}
                                className={`px-4 py-2 rounded-xl font-semibold transition ${selectedTimeSlot === 'now'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                지금 바로
                            </button>
                            <button
                                onClick={() => setSelectedTimeSlot('after1h')}
                                className={`px-4 py-2 rounded-xl font-semibold transition ${selectedTimeSlot === 'after1h'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                1시간 뒤
                            </button>
                            <button
                                onClick={() => setSelectedTimeSlot('after2h')}
                                className={`px-4 py-2 rounded-xl font-semibold transition ${selectedTimeSlot === 'after2h'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                2시간 뒤
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 결과 개수 */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                총 <strong className="text-primary-600">{filteredRooms.length}개</strong>의 강의실을 찾았습니다
            </div>

            {/* 강의실 리스트 */}
            <div className="space-y-4">
                {filteredRooms.map((room, index) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {room.building} {room.number}호
                                    </h3>
                                    {isTeamFriendly(room.features) && (
                                        <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                                            팀플 가능
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Users className="w-4 h-4" />
                                    <span>{room.capacity}인 수용 가능</span>
                                </div>
                            </div>
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>

                        {/* 다음 수업 정보 */}
                        {room.nextClass && (
                            <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-4 mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                                        다음 수업: {room.nextClass.time} ({getTimeUntilNext(room.nextClass.time)})
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                                    {room.nextClass.className}
                                </p>
                            </div>
                        )}

                        {/* 특징 태그 */}
                        <div className="flex flex-wrap gap-2">
                            {room.features.map((feature, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 빈 결과 메시지 */}
            {filteredRooms.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        현재 선택한 조건에 맞는 빈 강의실이 없습니다
                    </p>
                </motion.div>
            )}
        </div>
    );
}

export default RoomFinder;
