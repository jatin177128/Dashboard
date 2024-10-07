import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background font-sans antialiased">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] " />
      <Navbar onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="relative flex h-[calc(100vh-3.5rem)]">
        <Sidebar 
          isOpen={isSidebarOpen}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main 
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ease-out 
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}
        >
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;