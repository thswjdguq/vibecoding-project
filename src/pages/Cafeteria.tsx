import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, MapPin, Store, Coffee, Mail, BookOpen, Users } from 'lucide-react';

type CafeteriaType = 'south' | 'future';
type MealTime = 'breakfast' | 'lunch' | 'dinner';

interface MenuItem {
    name: string;
    price: number;
    type: 'main' | 'side' | 'soup';
    icon: string;
}

interface Meal {
    breakfast: MenuItem[];
    lunch: MenuItem[];
    dinner: MenuItem[];
}

interface Facility {
    name: string;
    location: string;
    hours: string;
    isOpen: boolean;
    icon: any;
}

function Cafeteria() {
    const [selectedCafeteria, setSelectedCafeteria] = useState<CafeteriaType>('south');
    const [selectedMealTime, setSelectedMealTime] = useState<MealTime>('lunch');

    // 남관 식당 메뉴
    const southMeals: Meal = {
        breakfast: [
            { name: '김치찌개 + 밥', price: 3500, type: 'main', icon: '🍲' },
            { name: '계란후라이', price: 0, type: 'side', icon: '🍳' },
            { name: '김치', price: 0, type: 'side', icon: '🥬' }
        ],
        lunch: [
            { name: '돈까스 + 우동', price: 5500, type: 'main', icon: '🍛' },
            { name: '제육볶음 정식', price: 5000, type: 'main', icon: '🍖' },
            { name: '샐러드바', price: 3500, type: 'side', icon: '🥗' }
        ],
        dinner: [
            { name: '김치찌개 정식', price: 4500, type: 'main', icon: '🍲' },
            { name: '불고기 덮밥', price: 5000, type: 'main', icon: '🍚' },
            { name: '된장국', price: 0, type: 'soup', icon: '🥣' }
        ]
    };

    // 미래창의관 식당 메뉴
    const futureMeals: Meal = {
        breakfast: [
            { name: '토스트 세트', price: 3000, type: 'main', icon: '🍞' },
            { name: '샌드위치', price: 3500, type: 'main', icon: '🥪' }
        ],
        lunch: [
            { name: '떡볶이 + 튀김', price: 4500, type: 'main', icon: '🍢' },
            { name: '비빔밥', price: 5000, type: 'main', icon: '🍚' },
            { name: '라면', price: 3000, type: 'main', icon: '🍜' }
        ],
        dinner: [
            { name: '치킨 덮밥', price: 5500, type: 'main', icon: '🍗' },
            { name: '김밥 세트', price: 4000, type: 'main', icon: '🍱' }
        ]
    };

    // 편의시설
    const facilities: Facility[] = [
        { name: '교내 서점', location: 'A관 1층', hours: '09:00 - 18:00', isOpen: true, icon: BookOpen },
        { name: 'GS25 편의점', location: 'B관 지하', hours: '08:00 - 22:00', isOpen: true, icon: Store },
        { name: '카페 미래', location: '미래창의관 1층', hours: '09:00 - 19:00', isOpen: true, icon: Coffee },
        { name: '우체국', location: 'A관 1층', hours: '09:00 - 17:00', isOpen: false, icon: Mail }
    ];

    const getOperatingStatus = (mealTime: MealTime) => {
        const hour = new Date().getHours();

        if (mealTime === 'breakfast') {
            if (hour >= 7 && hour < 9) return { label: '운영 중', color: 'bg-primary-500 text-white' };
            if (hour >= 6 && hour < 7) return { label: '준비 중', color: 'bg-orange-500 text-white' };
            return { label: '마감', color: 'bg-gray-400 text-white' };
        }

        if (mealTime === 'lunch') {
            if (hour >= 11 && hour < 14) return { label: '운영 중', color: 'bg-primary-500 text-white' };
            if (hour >= 10 && hour < 11) return { label: '준비 중', color: 'bg-orange-500 text-white' };
            return { label: '마감', color: 'bg-gray-400 text-white' };
        }

        if (mealTime === 'dinner') {
            if (hour >= 17 && hour < 19) return { label: '운영 중', color: 'bg-primary-500 text-white' };
            if (hour >= 16 && hour < 17) return { label: '준비 중', color: 'bg-orange-500 text-white' };
            return { label: '마감', color: 'bg-gray-400 text-white' };
        }

        return { label: '마감', color: 'bg-gray-400 text-white' };
    };

    const currentMeals = selectedCafeteria === 'south' ? southMeals : futureMeals;
    const mealItems = currentMeals[selectedMealTime];

    const getMealTimeLabel = (time: MealTime) => {
        const labels = { breakfast: '아침', lunch: '점심', dinner: '저녁' };
        return labels[time];
    };

    const getMealTimeIcon = (time: MealTime) => {
        const icons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };
        return icons[time];
    };

    const getCrowdLevel = () => {
        const hour = new Date().getHours();
        if (hour >= 12 && hour <= 13) return { label: '매우 혼잡', color: 'bg-error text-white' };
        if (hour >= 11 && hour <= 14) return { label: '혼잡', color: 'bg-orange-500 text-white' };
        return { label: '여유', color: 'bg-primary-500 text-white' };
    };

    const crowdLevel = getCrowdLevel();

    return (
        <div className="max-w-7xl mx-auto pb-24 md:pb-8">
            {/* 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <UtensilsCrossed className="w-8 h-8 text-primary-600" />
                    오늘의 학식
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    신구대학교 식당 정보를 확인하세요
                </p>
            </div>

            {/* 식당 선택 탭 */}
            <div className="mb-6">
                <div className="flex gap-3">
                    <button
                        onClick={() => setSelectedCafeteria('south')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition ${selectedCafeteria === 'south'
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        🏛️ 남관 식당
                    </button>
                    <button
                        onClick={() => setSelectedCafeteria('future')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition ${selectedCafeteria === 'future'
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        🏢 미래창의관 식당
                    </button>
                </div>
            </div>

            {/* 혼잡도 */}
            <div className="mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">현재 혼잡도</span>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${crowdLevel.color}`}>
                        {crowdLevel.label}
                    </span>
                </div>
            </div>

            {/* 식사 시간 선택 */}
            <div className="mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {(['breakfast', 'lunch', 'dinner'] as MealTime[]).map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedMealTime(time)}
                            className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition ${selectedMealTime === time
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {getMealTimeIcon(time)} {getMealTimeLabel(time)}
                        </button>
                    ))}
                </div>
            </div>

            {/* 메뉴 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {mealItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm hover-lift transition"
                    >
                        <div className="text-5xl mb-3 text-center">{item.icon}</div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white text-center mb-2">
                            {item.name}
                        </h3>
                        {item.price > 0 ? (
                            <p className="text-2xl font-bold text-primary-600 text-center">
                                {item.price.toLocaleString()}원
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                기본 제공
                            </p>
                        )}
                        <div className="mt-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'main'
                                ? 'bg-primary-100 text-primary-700'
                                : item.type === 'side'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                {item.type === 'main' ? '메인' : item.type === 'side' ? '반찬' : '국'}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 편의시설 안내 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary-600" />
                    캠퍼스 편의시설
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facilities.map((facility, index) => {
                        const Icon = facility.icon;
                        return (
                            <div
                                key={index}
                                className="p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {facility.name}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${facility.isOpen
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-400 text-white'
                                            }`}>
                                            {facility.isOpen ? '영업중' : '종료'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        📍 {facility.location}
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        {facility.hours}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Cafeteria;
