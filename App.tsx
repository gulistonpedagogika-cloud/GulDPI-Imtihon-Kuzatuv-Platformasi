
import React, { useState, useEffect } from 'react';
import { Exam, ViewType } from './types.ts';
import Header from './components/Header.tsx';
import ExamList from './components/ExamList.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Login from './components/Login.tsx';
import Footer from './components/Footer.tsx';
import { fetchExams, addExam as addExamToDb, deleteExam as deleteExamFromDb } from './services/supabaseService.ts';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchExams();
      setExams(data);
      setIsLoading(false);
    };
    
    loadData();
    
    const auth = sessionStorage.getItem('guldpi_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('guldpi_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('guldpi_auth');
    setView('home');
  };

  const handleAddExam = async (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    const newExam = await addExamToDb(examData);
    if (newExam) {
      setExams(prev => [newExam, ...prev]);
    }
  };

  const handleDeleteExam = async (id: string) => {
    const success = await deleteExamFromDb(id);
    if (success) {
      setExams(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header setView={setView} currentView={view} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {view === 'home' ? (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Imtihonlarni Onlayn Kuzatuv Platformasi
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Guliston Davlat Pedagogika Institutining shaffof va adolatli imtihon jarayonlarini real vaqt rejimida kuzatib boring.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-blue-600">
                <i className="fas fa-circle-notch fa-spin text-4xl mb-4"></i>
                <p className="text-slate-500 font-medium">Ma'lumotlar yuklanmoqda...</p>
              </div>
            ) : (
              <ExamList exams={exams} />
            )}
          </div>
        ) : (
          !isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <AdminDashboard 
              exams={exams} 
              onAdd={handleAddExam} 
              onDelete={handleDeleteExam}
              onLogout={handleLogout}
              isLoading={isLoading}
            />
          )
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;