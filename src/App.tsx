import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home as HomeIcon,
  Bell,
  Search,
  User,
  Moon,
  Sun,
  Menu,
  LogOut,
  ChevronDown,
  Mail,
  BookOpen,
  Lock,
  UserCircle,
  MonitorPlay,
  LayoutGrid,
  FileCheck,
  MessageCircle
} from 'lucide-react';

// 페이지 컴포넌트들
import Home from './pages/Home';
import Login from './pages/Login';
import ChatBot from './pages/ChatBot';
import GradeCalculator from './pages/GradeCalculator';
import CourseReview from './pages/CourseReview';
import MyPage from './pages/MyPage';
import PasswordChangePage from './pages/PasswordChangePage';
import EClass from './pages/EClass';
import CourseDetail from './pages/CourseDetail';
import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';
import Cafeteria from './pages/Cafeteria';
import Sidebar from './components/Sidebar';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const studentName = localStorage.getItem('studentName') || '학생';
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 모바일에서는 기본 닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentId');
    navigate('/login');
  };

  // 상단 유틸리티 바 - 외부 링크
  const utilityLinks = [
    {
      name: '사이버캠퍼스',
      icon: <MonitorPlay className="w-5 h-5" strokeWidth={2} />,
      url: '#',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      name: 'Office 365',
      icon: <LayoutGrid className="w-5 h-5" strokeWidth={2} />,
      url: '#',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      name: 'Gmail',
      icon: <Mail className="w-5 h-5" strokeWidth={2} />,
      url: '#',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      name: '인터넷 증명발급',
      icon: <FileCheck className="w-5 h-5" strokeWidth={2} />,
      url: '#',
      color: 'text-primary-600 dark:text-primary-400'
    },
  ];

  // 로그인 페이지에서는 네비게이션 숨기기
  if (isLoginPage) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-[#F8FAFC] dark:bg-gray-900`}>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Menu */}
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/images/shingu_logo.png"
                  alt="신구대학교 로고"
                  className="h-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="hidden text-lg font-bold text-gray-900 dark:text-white">
                  신구대학교
                </div>
              </Link>
            </div>

            {/* Right: Utilities */}
            <div className="flex items-center gap-2">
              {/* Utility Links - 아이콘 + 텍스트 */}
              <div className="hidden md:flex items-center gap-1 mr-2 border-r border-gray-200 dark:border-gray-700 pr-3">
                {utilityLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition hover-lift group"
                  >
                    <div className={link.color}>
                      {link.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden lg:block group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Mobile: Utility Icons Only */}
              <div className="flex md:hidden items-center gap-1 mr-2">
                {utilityLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition hover-lift"
                  >
                    <div className={link.color}>
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* User Profile */}
              {isLoggedIn && (
                <div className="relative group">
                  <button className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <span className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {studentName}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-2">
                      <button
                        onClick={() => navigate('/mypage')}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition flex items-center gap-3"
                      >
                        <UserCircle className="w-4 h-4" />
                        마이페이지
                      </button>
                      <button
                        onClick={() => navigate('/mypage?tab=password')}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition flex items-center gap-3"
                      >
                        <Lock className="w-4 h-4" />
                        비밀번호 변경
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-sm text-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-4">
                <div className="max-w-2xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'
          }`}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/notices/:id" element={<NoticeDetail />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path="/cafeteria" element={<Cafeteria />} />
              <Route path="/grade" element={<GradeCalculator />} />
              <Route path="/review" element={<CourseReview />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/password-change" element={<PasswordChangePage />} />
              <Route path="/eclass" element={<EClass />} />
              <Route path="/eclass/:courseId" element={<CourseDetail />} />
            </Routes>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20 py-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'
          }`}
      >
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">© 2026 신구대학교 스마트 캠퍼스 포털. All rights reserved.</p>
          <p className="text-sm">문의사항이 있으시면 고객센터로 연락주세요.</p>
        </div>
      </footer>

      {/* 모바일 하단 내비게이션 바 (md 이하에서만 표시) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {[
            { path: '/', icon: HomeIcon, label: '홈' },
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
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive
                  ? 'text-primary-600'
                  : 'text-gray-600 dark:text-gray-400'
                  }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
