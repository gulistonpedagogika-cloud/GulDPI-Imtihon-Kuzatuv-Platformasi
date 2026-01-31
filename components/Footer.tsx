
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white text-xl font-bold">G</div>
            <span className="text-white font-bold tracking-wide">GulDPI</span>
          </div>
          <p className="text-sm leading-relaxed">
            Guliston Davlat Pedagogika Instituti – kelajak pedagoglarini tayyorlovchi zamonaviy ta'lim maskani. Shaffoflik va sifat bizning ustuvor vazifamizdir.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Foydali havolalar</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Institut sayti</a></li>
            <li><a href="#" className="hover:text-white transition-colors">HEMIS tizimi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Elektron kutubxona</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Bog'lanish</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt w-5 text-blue-500"></i>
              Guliston sh., Universitet ko'chasi, 1-uy
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone w-5 text-blue-500"></i>
              +998 (67) 225-40-42
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope w-5 text-blue-500"></i>
              info@guldpi.uz
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-10 pt-8 border-t border-slate-800 text-center text-xs">
        &copy; {new Date().getFullYear()} Guliston Davlat Pedagogika Instituti. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;
