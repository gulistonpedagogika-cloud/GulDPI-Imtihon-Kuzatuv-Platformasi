
import React from 'react';
import { Exam } from '../types';

interface ExamListProps {
  exams: Exam[];
}

const ExamList: React.FC<ExamListProps> = ({ exams }) => {
  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <i className="fas fa-video-slash text-6xl mb-4 opacity-20"></i>
        <p className="text-xl">Hozirda faol imtihonlar mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <div key={exam.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="relative h-48 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src={`https://picsum.photos/seed/${exam.id}/400/300`} 
              alt={exam.name}
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-20 flex items-center bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              LIVE
            </div>
            <div className="absolute bottom-4 left-4 z-20">
              <h3 className="text-white font-bold text-lg line-clamp-1">{exam.name}</h3>
              <p className="text-slate-300 text-xs">GulDPI Imtihon Markazi</p>
            </div>
          </div>
          
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center text-slate-500 text-xs">
              <i className="far fa-clock mr-2"></i>
              <span>{new Date(exam.createdAt).toLocaleDateString('uz-UZ')}</span>
            </div>
            <a 
              href={exam.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors group"
            >
              Kuzatish
              <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
