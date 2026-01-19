# AI 스마트 챗봇 UI 구현 - 17

## 작업 개요

신구대학교 스마트 캠퍼스를 위한 AI 챗봇 인터페이스를 구현했습니다. 학생들이 자주 묻는 질문에 빠르게 답변받을 수 있도록 퀵 커맨드 버튼을 제공하고, 실제 채팅처럼 자연스러운 대화 경험을 제공합니다.

---

## 주요 구현 사항

### 1. 신구대 아이덴티티

#### 환영 메시지
```tsx
{
  id: 1,
  text: '안녕하세요! 신구대학교 스마트 캠퍼스 AI 어시스턴트입니다. 무엇을 도와드릴까요? 😊',
  sender: 'ai',
  timestamp: new Date()
}
```

#### 헤더 디자인
```tsx
<div className="flex items-center gap-4">
  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
    <Bot className="w-8 h-8 text-primary-600" />
  </div>
  <div>
    <h1 className="text-2xl font-bold flex items-center gap-2">
      신구 AI 어시스턴트
      <Sparkles className="w-5 h-5 text-primary-500" />
    </h1>
    <p className="text-gray-600">무엇을 도와드릴까요?</p>
  </div>
</div>
```

**특징:**
- Bot 아이콘: 16x16 원형, 연두색 배경
- Sparkles 아이콘: AI 강조
- 친근한 환영 메시지

---

### 2. 메시지 레이아웃 구조

#### AI 메시지 (왼쪽 정렬)
```tsx
<div className="max-w-[80%] md:max-w-[70%] rounded-3xl px-6 py-4 
  bg-primary-50 dark:bg-primary-900/30 text-gray-900 dark:text-white">
  <div className="flex items-center gap-2 mb-2">
    <Bot className="w-4 h-4 text-primary-600" />
    <span className="text-xs font-semibold text-primary-600">AI 어시스턴트</span>
  </div>
  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
  <p className="text-xs text-gray-500 mt-2">
    {message.timestamp.toLocaleTimeString()}
  </p>
</div>
```

**특징:**
- 배경: `bg-primary-50` (연한 연두색)
- Bot 아이콘 + "AI 어시스턴트" 레이블
- 타임스탬프 표시
- 최대 너비: 모바일 80%, 데스크톱 70%

#### 사용자 메시지 (오른쪽 정렬)
```tsx
<div className="max-w-[80%] md:max-w-[70%] rounded-3xl px-6 py-4 
  bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
  <p className="text-xs text-gray-500 mt-2">
    {message.timestamp.toLocaleTimeString()}
  </p>
</div>
```

**특징:**
- 배경: `bg-gray-100` (화이트/연한 회색)
- 아이콘 없음 (간결)
- 오른쪽 정렬: `justify-end`

---

### 3. 퀵 액션 버튼 (Quick Commands)

#### 버튼 목록
```typescript
const quickCommands = [
  '오늘 학식 메뉴 뭐야?',
  '이번 주 과제 알려줘',
  '내 학점 확인하기',
  '도서관 반납 예정 도서'
];
```

#### UI 구현
```tsx
<div className="px-6 py-4 border-t">
  <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
    <Sparkles className="w-4 h-4" />
    자주 묻는 질문
  </p>
  <div className="grid grid-cols-2 gap-2">
    {quickCommands.map((command) => (
      <button
        onClick={() => handleSendMessage(command)}
        className="px-4 py-3 bg-gray-100 hover:bg-primary-100 
          text-gray-700 rounded-2xl text-sm font-semibold 
          transition hover-lift"
      >
        {command}
      </button>
    ))}
  </div>
</div>
```

**디자인:**
- 2열 그리드 레이아웃
- Hover: `hover:bg-primary-100` (연한 연두)
- `hover-lift` 애니메이션
- Sparkles 아이콘으로 섹션 강조

**퀵 커맨드 설계 의도:**
1. **학식 메뉴**: 학생들이 가장 자주 묻는 질문
2. **과제 확인**: 학습 관리 핵심 기능
3. **학점 확인**: 성적 정보 빠른 접근
4. **도서관 반납**: 연체 방지

---

### 4. 타이핑 효과 & 로딩 상태

#### 메시지 등장 애니메이션
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
  {/* 메시지 내용 */}
</motion.div>
```

**효과:**
- 아래에서 위로: `y: 20 → 0`
- 페이드 인: `opacity: 0 → 1`
- 부드러운 전환

#### 타이핑 인디케이터
```tsx
{isTyping && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="bg-primary-50 rounded-3xl px-6 py-4">
      <div className="flex items-center gap-2">
        <Bot className="w-4 h-4 text-primary-600" />
        <span className="text-sm text-gray-600">AI가 답변을 생각 중이에요</span>
        <div className="flex gap-1">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
            className="w-2 h-2 bg-primary-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
            className="w-2 h-2 bg-primary-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
            className="w-2 h-2 bg-primary-500 rounded-full"
          />
        </div>
      </div>
    </div>
  </motion.div>
)}
```

**애니메이션:**
- 3개의 점이 순차적으로 깜빡임
- Scale: `1 → 1.3 → 1`
- Delay: 0초, 0.2초, 0.4초
- 무한 반복: `repeat: Infinity`

---

### 5. 입력창 & 음성 인식

#### 입력 필드
```tsx
<div className="flex gap-3">
  <div className="flex-1 relative">
    <input
      type="text"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="메시지를 입력하세요..."
      className="w-full px-6 py-4 pr-14 rounded-2xl border-2 
        border-gray-200 focus:border-primary-500 
        focus:ring-primary-500 text-lg"
    />
    <button className="absolute right-4 top-1/2 -translate-y-1/2 
      text-gray-400 hover:text-primary-600">
      <Mic className="w-5 h-5" />
    </button>
  </div>
  <button
    onClick={() => handleSendMessage()}
    disabled={!inputText.trim()}
    className={`px-6 py-4 rounded-2xl flex items-center gap-2 ${
      inputText.trim()
        ? 'bg-primary-500 text-white hover-lift shadow-lg shadow-primary-500/30'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
  >
    <Send className="w-5 h-5" />
    <span className="hidden md:inline">전송</span>
  </button>
</div>
```

**특징:**
- Mic 아이콘: 음성 인식 암시 (준비 중)
- Send 버튼: 조건부 활성화
- Enter 키: 전송 단축키
- 모바일: Send 텍스트 숨김 (`hidden md:inline`)

#### 키보드 핸들링
```typescript
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};
```

---

### 6. AI 응답 시뮬레이션

```typescript
const getAIResponse = (userText: string): string => {
  const lowerText = userText.toLowerCase();
  
  if (lowerText.includes('학식') || lowerText.includes('메뉴')) {
    return '오늘의 학생식당 메뉴입니다:\n\n🍚 A코너: 김치찌개 + 밥 (4,000원)\n🍜 B코너: 돈까스 + 우동 (5,000원)\n🥗 C코너: 샐러드바 (3,500원)\n\n운영시간: 11:30 ~ 14:00';
  }
  
  if (lowerText.includes('과제')) {
    return '이번 주 과제 현황입니다:\n\n📝 웹프로그래밍: HTML/CSS 레이아웃 과제 (D-5)\n💻 데이터베이스: ERD 설계 과제 (D-2)\n✅ 알고리즘: 정렬 알고리즘 구현 (제출완료)\n\n자세한 내용은 E-클래스에서 확인하세요!';
  }
  
  if (lowerText.includes('학점')) {
    return '현재 학기 성적 정보:\n\n📊 평점: 3.85 / 4.5\n📈 취득학점: 18 / 21\n🎯 전공평점: 4.0 / 4.5\n\n자세한 성적은 마이페이지에서 확인 가능합니다.';
  }
  
  if (lowerText.includes('도서관') || lowerText.includes('반납')) {
    return '도서관 대출 현황:\n\n📚 클린 코드 (D-3)\n📚 리팩토링 (D-1, 연장 필요)\n\n반납 예정일을 확인하시고 연체되지 않도록 주의하세요!';
  }
  
  return '질문해 주셔서 감사합니다! 더 자세한 정보가 필요하시면 구체적으로 질문해 주세요. 😊';
};
```

**응답 패턴:**
- 키워드 기반 매칭
- 이모지 사용으로 가독성 향상
- 스마트 캠퍼스 데이터 연동 준비
- 기본 응답 제공

---

### 7. 스마트 캠퍼스 데이터 연동 시나리오

#### 1단계: 현재 (시뮬레이션)
- 하드코딩된 응답
- 키워드 매칭

#### 2단계: API 연동 (향후)
```typescript
const handleSendMessage = async (text: string) => {
  // ... 사용자 메시지 추가
  
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, userId: user.id })
    });
    
    const data = await response.json();
    // AI 응답 추가
  } catch (error) {
    // 오류 처리
  }
};
```

#### 3단계: 실시간 데이터 (최종)
- 학식 메뉴: 실시간 식단 API
- 과제: E-클래스 데이터베이스
- 학점: 학사 시스템 연동
- 도서관: 도서 대출 시스템 연동

---

### 8. 모바일 최적화

#### 하단 여백
```tsx
<div className="max-w-7xl mx-auto h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] 
  flex flex-col pb-20 md:pb-0">
```

**특징:**
- 모바일: `pb-20` (하단 네비게이션 공간)
- 데스크톱: `md:pb-0`
- 전체 높이: `h-[calc(100vh-10rem)]`

#### 반응형 디자인
- 메시지 너비: 모바일 80%, 데스크톱 70%
- Send 버튼 텍스트: 모바일 숨김
- 퀵 커맨드: 2열 그리드 (모바일/데스크톱 동일)

#### 자동 스크롤
```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
```

---

## 디자인 원칙 준수

### ✅ #a2c54e 연두색 포인트
- AI 메시지 배경: `bg-primary-50`
- Bot 아이콘: `text-primary-600`
- Sparkles 아이콘: `text-primary-500`
- 타이핑 점: `bg-primary-500`
- Send 버튼: `bg-primary-500`
- 그림자: `shadow-primary-500/30`

### ✅ rounded-3xl
- 전체 컨테이너: `rounded-3xl`
- 메시지 말풍선: `rounded-3xl`
- 퀵 커맨드 버튼: `rounded-2xl`
- 입력창: `rounded-2xl`

### ✅ 친근한 UX
- 환영 메시지 + 이모지
- 자주 묻는 질문 제공
- 타이핑 인디케이터
- 즉각적인 피드백

---

## 요약

### 구현 완료
1. ✅ 신구대 AI 어시스턴트 헤더
2. ✅ 환영 메시지
3. ✅ AI/사용자 메시지 구분 (연두/화이트)
4. ✅ 퀵 액션 버튼 (4개)
5. ✅ 타이핑 효과 (Framer Motion)
6. ✅ 로딩 애니메이션 (3-dot)
7. ✅ 입력창 + Mic 아이콘
8. ✅ Enter 키 전송
9. ✅ 모바일 최적화 (pb-20)
10. ✅ AI 응답 시뮬레이션

### 디자인 원칙
- **#a2c54e 테마**: 모든 포인트 색상
- **rounded-3xl**: 부드러운 곡선
- **친근한 UX**: 환영 메시지, 이모지, 퀵 커맨드

### 파일 수정
**수정:**
- `src/pages/ChatBot.tsx` (완전 재구현)
- `src/App.tsx` (불필요한 import 제거)

---

**작성**: 2026-01-13  
**다음 작업**: 최종 통합 테스트 및 문서화 완료 - 18
