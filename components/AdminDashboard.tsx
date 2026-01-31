
import React, { useState } from 'react';
import { Exam } from '../types.ts';
import { getExamInsights } from '../services/geminiService.ts';

interface AdminDashboardProps {
  exams: Exam[];
  onAdd: (exam: Omit<Exam, 'id' | 'createdAt'>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onLogout: () => void;
  isLoading: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ exams, onAdd, onDelete, onLogout, isLoading }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [aiTip, setAiTip] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !link) return;

    setIsSubmitting(true);
    
    const tip = await getExamInsights(name);
    setAiTip(tip);

    await onAdd({
      name,
      link,
      status: 'active'
    });

    setName('');
    setLink('');
    setIsSubmitting(false);

    setTimeout(() => setAiTip(null), 8000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Haqiqatan ham ushbu imtihonni o'chirmoqchimisiz?")) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <i className="fas fa-tachometer-alt text-blue-600 mr-3"></i>
          Boshqaruv Paneli
        </h2>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-all text-sm font-medium flex items-center border border-transparent hover:border-red-100"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Chiqish
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <i className="fas fa-plus-circle text-blue-600 mr-3"></i>
          Yangi Imtihon Qo'shish
        </h3>

        {aiTip && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-800 text-sm animate-fadeIn">
            <i className="fas fa-robot mr-2"></i>
            <strong>AI Maslahati:</strong> {aiTip}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Imtihon nomi</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Fizika fanidan oraliq nazorat"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Havola (Video/Stream link)</label>
            <input 
              type="url" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div className="md:col-span-2 pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : (
                <i className="fas fa-save mr-2"></i>
              )}
              Bazaga saqlash
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Mavjud imtihonlar ro'yxati</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase">
                <th className="px-6 py-4">Sarlavha</th>
                <th className="px-6 py-4">Havola</th>
                <th className="px-6 py-4">Sana</th>
                <th className="px-6 py-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center">
                    <i className="fas fa-circle-notch fa-spin text-blue-600 mr-2"></i>
                    Ma'lumotlar yuklanmoqda...
                  </td>
                </tr>
              ) : exams.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    Ro'yxat bo'sh
                  </td>
                </tr>
              ) : (
                exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-700">{exam.name}</td>
                    <td className="px-6 py-4">
                      <a href={exam.link} target="_blank" className="text-blue-500 hover:underline truncate max-w-[200px] block">
                        {exam.link}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(exam.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(exam.id)}
                        disabled={deletingId === exam.id}
                        className={`p-2 rounded-lg transition-all ${deletingId === exam.id ? 'text-slate-300' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                        title="O'chirish"
                      >
                        {deletingId === exam.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-trash-alt"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;