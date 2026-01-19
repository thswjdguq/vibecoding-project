# E클래스 UI 프레임워크 구축 - 14

## 작업 개요

E-클래스 (LMS) UI 프레임워크를 구축하여 학생들이 수강 과목을 한눈에 파악하고, 공지사항, 수업 자료, 과제, 성적을 효율적으로 관리할 수 있도록 했습니다. #a2c54e 연두색 테마와 Framer Motion 애니메이션을 활용하여 일관된 디자인을 유지했습니다.

---

## 주요 구현 사항

### 1. EClass.tsx - 강의 대시보드

#### 레이아웃 구조
```
┌─────────────────────────────────┐
│ E-클래스 (제목)                  │
│ 수강 중인 강의를 확인하세요       │
├─────────────────────────────────┤
│  ┌────┐  ┌────┐  ┌────┐         │
│  │과목│  │과목│  │과목│         │
│  │ 1 │  │ 2 │  │ 3 │         │
│  └────┘  └────┘  └────┘         │
│  ┌────┐  ┌────┐  ┌────┐         │
│  │과목│  │과목│  │과목│         │
│  │ 4 │  │ 5 │  │ 6 │         │
│  └────┘  └────┘  └────┘         │
└─────────────────────────────────┘
```

#### 강의 카드 컴포넌트
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.map((course) => (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* 색상 헤더 */}
      <div className={`h-32 bg-gradient-to-br ${course.color} p-6`}>
        {/* 배지 */}
        <div className="flex gap-2">
          {/* 미확인 공지 (빨간 원) */}
          {course.unreadNotices > 0 && (
            <div className="relative">
              <Bell className="text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full">
                {course.unreadNotices}
              </div>
            </div>
          )}
          
          {/* 남은 과제 (연두색 원) */}
          {course.pendingAssignments > 0 && (
            <div className="relative">
              <FileText className="text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full">
                {course.pendingAssignments}
              </div>
            </div>
          )}
        </div>
        <BookOpen className="w-12 h-12 text-white" />
      </div>

      {/* 과목 정보 */}
      <div className="p-6">
        <h3>{course.name}</h3>
        <div>
          <User /> {course.professor} 교수님
        </div>
        <div>
          <MapPin /> {course.room}
        </div>
        
        {/* 하단 요약 */}
        <div>
          {course.unreadNotices > 0 && (
            <span className="text-error">미확인 공지 {course.unreadNotices}</span>
          )}
          {course.pendingAssignments > 0 && (
            <span className="text-primary-600">남은 과제 {course.pendingAssignments}</span>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
``

**과목 데이터:**
```typescript
const courses = [
  {
    id: '1',
    name: '웹프로그래밍',
    professor: '김교수',
    room: 'IT관 301호',
    unreadNotices: 2,      // 빨간 배지
    pendingAssignments: 1,  // 연두 배지
    color: 'from-blue-500 to-blue-600'
  },
  // ... 총 6개 과목
];
```

**배지 시스템:**
1. **미확인 공지** (빨간 원):
   - 위치: 우측 상단
   - 배경: `bg-error` (빨강)
   - 아이콘: Bell
   - 숫자 표시

2. **남은 과제** (연두색 원):
   - 위치: 우측 상단
   - 배경: `bg-primary-500` (연두)
   - 아이콘: FileText
   - 숫자 표시

**색상 헤더:**
- 각 과목마다 다른 그라데이션 색상
- `from-blue-500 to-blue-600` (웹프로그래밍)
- `from-purple-500 to-purple-600` (데이터베이스)
- `from-green-500 to-green-600` (캡스톤디자인)
- ... etc

**Hover 효과:**
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  className="group"
>
  <h3 className="group-hover:text-primary-600 transition">
    {course.name}
  </h3>
</motion.div>
```

---

### 2. CourseDetail.tsx - 과목 상세 페이지

#### 탭 내비게이션
```tsx
const tabs = [
  { key: 'notices', label: '교수님 공지' },
  { key: 'materials', label: '수업 자료' },
  { key: 'assignments', label: '과제 제출' },
  { key: 'grades', label: '성적 공개' }
];

<div className="flex border-b">
  {tabs.map((tab) => (
    <button
      onClick={() => setActiveTab(tab.key)}
      className={`flex-1 py-4 px-6 font-semibold relative ${
        activeTab === tab.key
          ? 'text-primary-600'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {tab.label}
      {activeTab === tab.key && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"
        />
      )}
    </button>
  ))}
</div>
```

**탭 애니메이션:**
- `layoutId="activeTab"`: 탭 간 부드러운 이동
- 하단 바: 선택된 탭 아래 연두색 선
- Spring 애니메이션: `stiffness: 500, damping: 30`

#### Tab 1: 교수님 공지
```tsx
{notices.map((notice) => (
  <div className="p-5 bg-gray-50 rounded-2xl hover:bg-primary-50 transition">
    <div className="flex items-center gap-2">
      <h3>{notice.title}</h3>
      {notice.isNew && (
        <span className="px-2 py-0.5 bg-error text-white text-xs rounded-full">
          NEW
        </span>
      )}
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div><Calendar /> {notice.date}</div>
      <div><Eye /> {notice.views}</div>
    </div>
  </div>
))}
```

**정보 표시:**
- 제목 + NEW 배지
- 작성일 (Calendar 아이콘)
- 조회수 (Eye 아이콘)
- Hover: `bg-primary-50`

#### Tab 2: 수업 자료
```tsx
{materials.map((material) => (
  <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="text-4xl">{getFileIcon(material.type)}</div>
      <div>
        <h3>{material.name}</h3>
        <div className="flex items-center gap-3 text-sm">
          <span>{material.type}</span>
          <span>·</span>
          <span>{material.size}</span>
          <span>·</span>
          <span>{material.date}</span>
        </div>
      </div>
    </div>
    <button className="px-4 py-2 bg-primary-500 text-white rounded-xl hover-lift">
      <Download /> 다운로드
    </button>
  </div>
))}
```

**파일 아이콘:**
```typescript
const getFileIcon = (type: string) => {
  const icons = {
    'PDF': '📄',
    'PPT': '📊',
    'ZIP': '📦',
    'DOC': '📝'
  };
  return icons[type] || '📄';
};
```

**다운로드 버튼:**
- 배경: `bg-primary-500` (연두)
- Hover: `hover-lift`
- Download 아이콘

#### Tab 3: 과제 제출
```tsx
{assignments.map((assignment) => {
  const statusBadge = getStatusBadge(assignment.status, assignment.daysLeft);
  
  return (
    <div className={`p-5 rounded-2xl ${
      assignment.status === 'overdue'
        ? 'bg-error/5 border-2 border-error/20'
        : 'bg-gray-50'
    }`}>
      <h3 className={assignment.status === 'overdue' ? 'text-error' : ''}}>
        {assignment.title}
      </h3>
      <div>
        <Calendar /> 마감: {assignment.dueDate}
      </div>
      {statusBadge}
      {assignment.status === 'pending' && (
        <button className="bg-primary-500 text-white">제출하기</button>
      )}
    </div>
  );
})}
```

**D-Day 배지 로직:**
```typescript
const getStatusBadge = (status: string, daysLeft: number) => {
  // 제출완료
  if (status === 'submitted') {
    return (
      <div className="bg-primary-100 text-primary-700 rounded-full">
        <CheckCircle /> 제출완료
      </div>
    );
  }
  
  // 연체
  if (status === 'overdue') {
    return (
      <div className="bg-error text-white rounded-full">
        <XCircle /> {Math.abs(daysLeft)}일 초과
      </div>
    );
  }
  
  // 긴급 (D-2 이하)
  if (daysLeft <= 2) {
    return (
      <div className="bg-orange-500 text-white rounded-full">
        <AlertCircle /> D-{daysLeft}
      </div>
    );
  }
  
  // 일반
  return (
    <div className="bg-gray-200 text-gray-700 rounded-full">
      D-{daysLeft}
    </div>
  );
};
```

**상태별 스타일:**
1. **제출완료**:
   - 배지: `bg-primary-100 text-primary-700` (연두)
   - 아이콘: CheckCircle
   - 버튼: 없음

2. **연체 (overdue)**:
   - 카드: `bg-error/5 border-2 border-error/20` (빨간 테두리)
   - 제목: `text-error` (빨강)
   - 배지: `bg-error text-white` (빨강)
   - 아이콘: XCircle
   - 버튼: 없음

3. **긴급 (D-2 이하)**:
   - 배지: `bg-orange-500 text-white` (주황)
   - 아이콘: AlertCircle

4. **일반 (D-3 이상)**:
   - 배지: `bg-gray-200 text-gray-700` (회색)

#### Tab 4: 성적 공개
```tsx
<table className="w-full">
  <thead>
    <tr className="border-b-2">
      <th className="text-left py-4 px-4">항목</th>
      <th className="text-center py-4 px-4">점수</th>
      <th className="text-center py-4 px-4">비고</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b">
      <td className="py-4 px-4">중간고사</td>
      <td className="text-center py-4 px-4">
        <span className="font-bold text-primary-600 text-lg">85점</span>
      </td>
      <td className="text-center py-4 px-4">공개</td>
    </tr>
    {/* ... 기말고사, 과제, 출석 */}
  </tbody>
</table>
```

**성적 표시:**
- 공개된 점수: `font-bold text-primary-600 text-lg` (연두색, 큼)
- 미공개: `text-gray-500` (회색, "미공개")
- 비고: 공개/예정/채점중

---

## 사용자 플로우

### 강의 선택
```
1. E-클래스 페이지 접속
   ↓
2. 6개 강의 카드 그리드 표시
   ↓
3. 미확인 공지/남은 과제 배지 확인
   ↓
4. 강의 카드 클릭
   ↓
5. 과목 상세 페이지로 이동
```

### 과목 상세 탐색
```
1. 과목 상세 접속
   ↓
2. [교수님 공지] 탭 (기본)
   ↓
3. 공지사항 리스트 확인
   ↓
4. [수업 자료] 탭 클릭
   ↓
5. 파일 다운로드
   ↓
6. [과제 제출] 탭 클릭
   ↓
7. D-Day 확인
   ↓
8. 제출하기 버튼 클릭
   ↓
9. [성적 공개] 탭 클릭
   ↓
10. 점수 확인
```

---

## 디자인 원칙 준수

### ✅ #a2c54e 연두색 포인트
- 남은 과제 배지: `bg-primary-500`
- 탭 하단 바: `bg-primary-500`
- Hover 색상: `text-primary-600`
- 다운로드 버튼: `bg-primary-500`
- 제출완료 배지: `bg-primary-100 text-primary-700`
- 성적 점수: `text-primary-600`

### ✅ rounded-3xl 카드
- 강의 카드: `rounded-3xl`
- 상세 페이지 컨테이너: `rounded-3xl`
- 내부 항목: `rounded-2xl`
- 배지: `rounded-full`
- 버튼: `rounded-xl`

### ✅ Framer Motion 애니메이션
**강의 목록:**
```tsx
<motion.div
  variants={container}
  initial="hidden"
  animate="show"
>
  {courses.map((course) => (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.02 }}
    />
  ))}
</motion.div>
```

**탭 전환:**
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    {/* 탭 컨텐츠 */}
  </motion.div>
</AnimatePresence>
```

**탭 인디케이터:**
```tsx
<motion.div
  layoutId="activeTab"
  className="absolute bottom-0 h-1 bg-primary-500"
  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
/>
```

---

## 반응형 디자인

### 강의 대시보드
**데스크톱 (≥lg):**
- 3열 그리드: `lg:grid-cols-3`

**태블릿 (≥md):**
- 2열 그리드: `md:grid-cols-2`

**모바일 (<md):**
- 1열 그리드: `grid-cols-1`

### 과목 상세 페이지
**탭 네비게이션:**
- 데스크톱: 전체 텍스트 표시
- 모바일: 동일 (간소화 불필요)

**표 (성적):**
- `overflow-x-auto`: 모바일에서 가로 스크롤

---

## 요약

### 구현 완료
1. ✅ EClass.tsx - 강의 대시보드 (6개 과목)
2. ✅ 미확인 공지 배지 (빨간 원)
3. ✅ 남은 과제 배지 (연두색 원)
4. ✅ CourseDetail.tsx - 과목 상세
5. ✅ 4-탭 네비게이션 (Framer Motion)
6. ✅ 공지/자료/과제/성적 UI
7. ✅ D-Day 배지 시스템
8. ✅ App.tsx 라우팅 추가

### 디자인 원칙
- **#a2c54e 테마**: 모든 포인트 색상
- **rounded-3xl**: 카드 디자인
- **Framer Motion**: 부드러운 애니메이션

### 파일 생성
**신규:**
- `src/pages/EClass.tsx`
- `src/pages/CourseDetail.tsx`

**수정:**
- `src/App.tsx` (라우트 추가)

---

**작성**: 2026-01-13  
**다음 작업**: 공지사항 상세 페이지 및 검색 기능 - 15
