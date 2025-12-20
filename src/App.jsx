import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import SplashScreen from './Components/SplashScreen';
import DashBoard from './Pages/DashBoard'
import AddTaskPage from './Pages/AddTaskPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import TasksPage from './Pages/TasksPage'
import EditTaskPage from './Pages/EditTaskPage'
import ProfilePage from './Pages/ProfilePage'
import AnalyticsPage from './Pages/AnalyticsPage'
import AiInsightsPage from './Pages/AiInsightsPage'
import NotFoundPage from './Pages/NotFoundPage'
import DeveloperPage from './Pages/DeveloperPage'


const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('hasVisited');
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div>

      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {localStorage.getItem('token') && (
          <>
            <Route path="/home" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/add-task" element={<AddTaskPage />} />
            <Route path="/edit-task" element={<EditTaskPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/ai-insights" element={<AiInsightsPage />} />
            <Route path="/dev" element={<DeveloperPage />} />
          </>
        )}
      </Routes>

    </div>
  )
}

export default App