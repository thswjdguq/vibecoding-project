# Smart Campus Portal

스마트 캠퍼스 포털은 RAG 기반 AI 챗봇과 PWA 기술을 활용한 차세대 스마트 캠퍼스 서비스입니다.

## 🚀 주요 기능

- **🤖 AI 챗봇**: 학사 정보 자연어 질의응답
- **📊 학점 계산기**: 졸업요건 체크 및 학점 관리
- **⭐ 강의 리뷰**: 수강평 공유 시스템
- **📢 공지사항**: 카테고리별 공지 및 검색
- **📱 PWA**: 홈 화면에 설치 가능한 Progressive Web App
- **🌙 다크 모드**: 다크/라이트 테마 지원

## 🛠️ 기술 스택

### Frontend
- React 19 + TypeScript
- Tailwind CSS 4.x
- React Router
- PWA (Service Worker)

### Backend (예정)
- Node.js + Express
- MongoDB Atlas
- OpenAI API + LangChain
- Puppeteer (웹 크롤링)

## 📦 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

프로젝트는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📁 프로젝트 구조

```
smart-campus-portal/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── index.html
├── src/
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Notices.tsx
│   │   ├── ChatBot.tsx
│   │   ├── GradeCalculator.tsx
│   │   └── CourseReview.tsx
│   ├── App.tsx                # 메인 앱
│   ├── index.tsx              # 엔트리 포인트
│   ├── index.css              # 글로벌 스타일
│   └── serviceWorkerRegistration.ts
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 개발 계획

- [x] 프로젝트 초기 설정
- [x] PWA 구성
- [x] 기본 페이지 컴포넌트
- [ ] 백엔드 API 개발
- [ ] AI 챗봇 RAG 파이프라인
- [ ] 데이터베이스 연동
- [ ] 배포

## 📝 License

MIT License

## 👥 Contributors

캡스톤 프로젝트 팀
