# 모바일 하단바 및 E클래스 UI 정제 - 15

## 작업 개요

모바일 사용자의 엄지 조작(Thumb Zone)을 고려하여 하단 고정 내비게이션 바를 추가하고, "Simple is Best" 철학에 따라 E-클래스 카드 디자인을 심플하고 일관성 있게 개선했습니다.

---

## 주요 변경 사항

### 1. 모바일 하단 내비게이션 바 (App.tsx)

#### 레이아웃 구조
```
┌──────────────────────────┐
│  Main Content (md+)      │
│                          │
│  (Desktop: No Bottom Nav)│
└──────────────────────────┘

┌──────────────────────────┐
│  Main Content (Mobile)   │
│                          │
├──────────────────────────┤
│ [홈][E클래스][챗봇][MY]  │ ← Bottom Nav
└──────────────────────────┘
```

#### 구현 코드
```tsx
{/* 모바일 하단 내비게이션 바 (md 이하에서만 표시) */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 
  bg-white dark:bg-gray-800 border-t border-gray-200 
  shadow-lg z-50">
  <div className="flex items-center justify-around h-16 px-2">
    {[
      { path: '/', icon: Home, label: '홈' },
      { path: '/eclass', icon: BookOpen, label: 'E클래스' },
      { path: '/chatbot', icon: MessageCircle, label: 'AI 챗봇' },
      { path: '/mypage', icon: User, label: '마이페이지' }
    ].map((item) => {
      const isActive = location.pathname === item.path || 
                     (item.path === '/eclass' && location.pathname.startsWith('/eclass'));
      const Icon = item.icon;
      
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive 
              ? 'text-primary-600'  // 활성화: #a2c54e
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Icon className={`w-6 h-6 mb-1 ${
            isActive ? 'stroke-[2.5]' : 'stroke-2'
          }`} />
          <span className={`text-xs ${
            isActive ? 'font-semibold' : 'font-normal'
          }`}>
            {item.label}
          </span>
        </Link>
      );
    })}
  </div>
</nav>
```

**메뉴 구성:**
1. **홈** (Home 아이콘)
2. **E클래스** (BookOpen 아이콘)
3. **AI 챗봇** (MessageCircle 아이콘)
4. **마이페이지** (User 아이콘)

**디자인 특징:**
- **반응형**: `md:hidden` (모바일/태블릿만)
- **고정**: `fixed bottom-0` (화면 하단 고정)
- **배경**: `bg-white` (화이트)
- **테두리**: `border-t` (상단 테두리)
- **그림자**: `shadow-lg` (부드러운 상단 그림자)
- **높이**: `h-16` (64px - 엄지 조작 최적화)
- **Z-index**: `z-50` (최상위)

**활성 상태:**
- 텍스트: `text-primary-600` (#a2c54e)
- 아이콘 굵기: `stroke-[2.5]` (더 굵게)
- 폰트: `font-semibold`

**비활성 상태:**
- 텍스트: `text-gray-600`
- 아이콘 굵기: `stroke-2`
- 폰트: `font-normal`

**경로 매칭:**
```typescript
const isActive = location.pathname === item.path || 
               (item.path === '/eclass' && location.pathname.startsWith('/eclass'));
```
- E클래스: `/eclass` 뿐만 아니라 `/eclass/:courseId`도 활성화

---

### 2. E-클래스 카드 디자인 개선 (EClass.tsx)

#### Before (화려한 디자인)
```
┌──────────────────┐
│ 🌈 Gradient      │ ← 각 과목마다 다른 색상
│ Header           │
├──────────────────┤
│ 과목명           │
│ 교수님           │
│ 강의실           │
└──────────────────┘
```

#### After (심플한 디자인)
```
┏━━━━━━━━━━━━━━━━┓
┃│ 과목명   [2][1]┃ ← 4px 세로 바
┃│ 전공           ┃    (전공: 초록, 교양: 회색)
┃│ 교수님         ┃
┃│ 강의실         ┃
┃│──────────────  ┃
┃│ • 공지 2       ┃
┃│ • 과제 1       ┃
┗━━━━━━━━━━━━━━━━┛
```

**주요 변경사항:**

1. **배경색 통일**:
   - Before: 각 과목마다 다른 그라데이션 헤더
   - After: 모두 화이트 (`bg-white`) 또는 회색 (`bg-gray-50`)

2. **포인트 바 추가**:
```tsx
{/* 왼쪽 포인트 바 */}
<div className={`absolute left-0 top-0 bottom-0 w-1 ${
  course.isMajor ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
}`} />
```
   - 너비: `w-1` (4px)
   - 전공: `bg-primary-500` (#a2c54e)
   - 교양: `bg-gray-300` (회색)
   - 위치: `absolute left-0`

3. **배지 심플화**:
   - Before: 아이콘 + 숫자 + 텍스트 (복잡)
   - After: 숫자만 있는 작은 원형

```tsx
{/* 우측 배지 (심플) */}
<div className="flex gap-2">
  {course.unreadNotices > 0 && (
    <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">
        {course.unreadNotices}
      </span>
    </div>
  )}
  {course.pendingAssignments > 0 && (
    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-white">
        {course.pendingAssignments}
      </span>
    </div>
  )}
</div>
```

**배지 디자인:**
- 크기: `w-6 h-6` (24px × 24px)
- 모양: `rounded-full` (완전한 원)
- 미확인 공지: `bg-error` (빨강)
- 남은 과제: `bg-primary-500` (연두)
- 텍스트: `text-xs font-bold text-white`
- 내용: 숫자만

4. **전공 표시**:
```tsx
{course.isMajor && (
  <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
    전공
  </span>
)}
```

5. **하단 요약**:
```tsx
<div className="flex items-center gap-4 text-sm">
  {course.unreadNotices > 0 && (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-error rounded-full" />
      <span className="text-gray-600">공지 {course.unreadNotices}</span>
    </div>
  )}
  {course.pendingAssignments > 0 && (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-primary-500 rounded-full" />
      <span className="text-gray-600">과제 {course.pendingAssignments}</span>
    </div>
  )}
</div>
```

**과목 데이터 구조:**
```typescript
interface Course {
  id: string;
  name: string;
  professor: string;
  room: string;
  unreadNotices: number;
  pendingAssignments: number;
  isMajor: boolean; // 전공 여부 추가
}

const courses = [
  {
    id: '1',
    name: '웹프로그래밍',
    professor: '김교수',
    room: 'IT관 301호',
    unreadNotices: 2,
    pendingAssignments: 1,
    isMajor: true  // 전공
  },
  {
    id: '5',
    name: '교양영어',
    professor: '정교수',
    room: 'A관 201호',
    unreadNotices: 0,
    pendingAssignments: 1,
    isMajor: false // 교양
  }
];
```

6. **모바일 대응**:
```tsx
<div className="max-w-7xl mx-auto pb-24 md:pb-8">
```
- 모바일: `pb-24` (하단 네비게이션 바 공간 확보)
- 데스크톱: `md:pb-8` (일반 여백)

---

## 디자인 철학

### Thumb Zone 최적화

**엄지 조작 구역:**
```
┌────────────────┐
│                │ ← Difficult
│                │
│                │ ← Comfortable
│                │
└────────────────┘ ← Bottom Nav (Easy)
```

**하단 네비게이션 바 위치:**
- 가장 접근하기 쉬운 영역
- 높이 64px (h-16)
- 4개 메뉴 균등 분할
- 아이콘 + 텍스트 레이블

### Simple is Best

**Before (복잡):**
- 각 과목마다 다른 색상 헤더
- 큰 아이콘 배지
- 시각적으로 화려하지만 정보 파악 어려움

**After (단순):**
- 통일된 화이트 배경
- 작은 숫자 배지
- 왼쪽 세로 바로 전공/교양 구분
- 정보 계층 명확

**컬러링 전략:**
1. **배경**: 모두 동일 (화이트)
2. **포인트**: 왼쪽 4px 바만 색상 적용
3. **전공**: #a2c54e (연두)
4. **교양**: 회색
5. **배지**: 빨강 (공지), 연두 (과제)

---

## 사용자 경험 (UX)

### 모바일 네비게이션
**장점:**
1. 엄지 도달 용이
2. 항상 표시 (fixed)
3. 4개 주요 기능 빠른 접근
4. 현재 위치 명확 (#a2c54e)

**인터랙션:**
- 탭: 페이지 전환
- 활성 상태: 즉시 시각적 피드백

### E-클래스 카드
**개선 효과:**
1. 정보 집중: 화려한 색상 제거
2. 전공/교양 구분: 왼쪽 바로 즉시 파악
3. 배지 인식: 작지만 명확
4. 일관성: 모든 카드 동일 디자인

---

## 반응형 동작

### 하단 네비게이션 바
**모바일 (<md):**
- 표시: `md:hidden`
- 고정: `fixed bottom-0`

**데스크톱 (≥md):**
- 숨김: `hidden md:block` (역으로)
- 사이드바 사용

### E-클래스 그리드
**모바일:**
- 1열: `grid-cols-1`
- 하단 여백: `pb-24` (네비바 공간)

**태블릿:**
- 2열: `md:grid-cols-2`

**데스크톱:**
- 3열: `lg:grid-cols-3`
- 하단 여백: `md:pb-8`

---

## 요약

### 구현 완료
1.  ✅ 모바일 하단 네비게이션 바
2. ✅ 4개 메뉴 (홈/E클래스/챗봇/마이페이지)
3. ✅ 활성 상태 #a2c54e
4. ✅ E-클래스 카드 배경 통일
5. ✅ 4px 왼쪽 포인트 바
6. ✅ 심플 배지 (숫자만)
7. ✅ 전공/교양 구분

### 디자인 원칙
- **Thumb Zone**: 엄지 조작 최적화
- **Simple is Best**: 불필요한 색상 제거
- **#a2c54e**: 포인트 색상만 사용

### 파일 수정
**수정:**
- `src/App.tsx` (모바일 하단 네비게이션 추가)
- `src/pages/EClass.tsx` (카드 디자인 개선)

---

**작성**: 2026-01-13  
**다음 작업**: 공지사항 상세 페이지 및 검색 기능 - 16
