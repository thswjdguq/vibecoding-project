import React, { useState } from 'react';

interface Course {
    name: string;
    credit: number;
    type: '전공' | '교양' | '자유';
}

function GradeCalculator() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseName, setCourseName] = useState('');
    const [courseCredit, setCourseCredit] = useState('');
    const [courseType, setCourseType] = useState<'전공' | '교양' | '자유'>('전공');

    const addCourse = () => {
        if (courseName && courseCredit) {
            setCourses([...courses, {
                name: courseName,
                credit: Number(courseCredit),
                type: courseType
            }]);
            setCourseName('');
            setCourseCredit('');
        }
    };

    const removeCourse = (index: number) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    const totalCredit = courses.reduce((sum, course) => sum + course.credit, 0);
    const majorCredit = courses.filter(c => c.type === '전공').reduce((sum, c) => sum + c.credit, 0);
    const generalCredit = courses.filter(c => c.type === '교양').reduce((sum, c) => sum + c.credit, 0);
    const freeCredit = courses.filter(c => c.type === '자유').reduce((sum, c) => sum + c.credit, 0);

    const requiredTotal = 130;
    const requiredMajor = 65;
    const requiredGeneral = 30;

    const progress = (totalCredit / requiredTotal) * 100;

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">학점 계산기</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 왼쪽: 학점 입력 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">과목 추가</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="과목명"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />

                        <input
                            type="number"
                            placeholder="학점"
                            value={courseCredit}
                            onChange={(e) => setCourseCredit(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />

                        <select
                            value={courseType}
                            onChange={(e) => setCourseType(e.target.value as '전공' | '교양' | '자유')}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="전공">전공</option>
                            <option value="교양">교양</option>
                            <option value="자유">자유선택</option>
                        </select>

                        <button
                            onClick={addCourse}
                            className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                        >
                            추가
                        </button>
                    </div>

                    {/* 추가된 과목 리스트 */}
                    <div className="mt-6 space-y-2">
                        {courses.map((course, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="dark:text-white">{course.name} ({course.credit}학점, {course.type})</span>
                                <button
                                    onClick={() => removeCourse(idx)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 오른쪽: 통계 */}
                <div className="space-y-6">
                    {/* 전체 진행률 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">졸업 이수율</h2>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                                        {progress.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-primary-600">
                                        {totalCredit} / {requiredTotal} 학점
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-primary-200">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all"
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* 영역별 학점 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">영역별 이수 현황</h2>
                        <div className="space-y-4">
                            <StatBar label="전공" current={majorCredit} required={requiredMajor} />
                            <StatBar label="교양" current={generalCredit} required={requiredGeneral} />
                            <StatBar label="자유선택" current={freeCredit} required={0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatBarProps {
    label: string;
    current: number;
    required: number;
}

function StatBar({ label, current, required }: StatBarProps) {
    const percent = required > 0 ? Math.min((current / required) * 100, 100) : 100;

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium dark:text-gray-300">{label}</span>
                <span className="text-sm font-medium dark:text-gray-300">
                    {current} / {required > 0 ? required : '-'} 학점
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-primary-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}

export default GradeCalculator;
