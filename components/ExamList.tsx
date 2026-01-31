
import React from 'react';
import { Exam } from '../types';

interface ExamListProps {
  exams: Exam[];
}

const ExamList: React.FC<ExamListProps> = ({ exams }) => {
  // Ta'lim va imtihon jarayoniga oid maxsus rasmlar to'plami
  const educationImages = [
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600&h=400',
    'https://plus.unsplash.com/premium_photo-1663126298656-4480e1a4ba51?auto=format&fit=crop&q=80&w=600&h=400'
  ];

  // Imtihon ID siga qarab rasm tanlash (doimiylikni saqlash uchun)
  const getExamImage = (id: string) => {
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return educationImages[index % educationImages.length];
  };

  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-video-slash text-4xl opacity-40"></i>
        </div>
        <p className="text-xl font-medium">Hozirda faol imtihonlar mavjud emas</p>
        <p className="text-sm mt-2">Yangi imtihonlar qo'shilganda bu yerda paydo bo'ladi.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {exams.map((exam) => (
        <div key={exam.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full">
          <div className="relative h-56 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <img 
              src={getExamImage(exam.id)} 
              alt={exam.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            
            <div className="absolute top-4 right-4 z-20">
               <div className="flex items-center bg-red-600 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2 shadow-[0_0_8px_white]"></span>
                LIVE STREAMING
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">GulDPI Imtihon Markazi</span>
              <h3 className="text-white font-bold text-xl line-clamp-2 leading-tight group-hover:text-blue-100 transition-colors">{exam.name}</h3>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow justify-between bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-slate-500 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 text-blue-500">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <span>{new Date(exam.createdAt).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="text-slate-400 text-xs">
                <i className="fas fa-users mr-1"></i> 24+ kuzatuvchi
              </div>
            </div>
            
            <a 
              href={exam.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all duration-300 group"
            >
              Kuzatishni boshlash
              <i className="fas fa-chevron-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
