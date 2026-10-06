import { useState } from 'react';
import MRSidebar from './MRSidebar';
import MRHeader from './MRHeader';

export default function MRLayout({ children, title = 'MR Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased text-slate-800">
      <MRSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <MRHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          title={title}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
