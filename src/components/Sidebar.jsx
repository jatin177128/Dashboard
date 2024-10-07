import React from 'react';
import { cn } from "@/lib/utils";  
import { Button } from "@/components/ui/button";  
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  ChevronRight,
  ChevronLeft,
  FileText,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';  
const Sidebar = ({ isOpen, isMobileOpen, onMobileClose, onToggle }) => {
  const SidebarItem = ({ icon: Icon, label, notification, color }) => (
    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" className="w-full justify-start">
        <div className={`rounded p-1 ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        {isOpen && (
          <>
            <span className="ml-2">{label}</span>
            {notification && (
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {notification}
              </span>
            )}
          </>
        )}
      </Button>
    </motion.div>
  );

  return (
    <>
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      <motion.div
        className={cn(
          "fixed z-50 flex flex-col bg-background/50 backdrop-blur-md border-r",
          "lg:static lg:z-auto",
          isOpen ? "w-64" : "w-16",
          "top-14 h-[calc(100vh-3.5rem)]",
          isMobileOpen ? "left-0" : "-left-64 lg:left-0",
        )}
        initial={false}
        animate={{ width: isOpen ? 256 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Toggle button for expanding/collapsing the sidebar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 hidden lg:flex"
          onClick={onToggle}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </motion.div>
        </Button>

        {/* Scrollable area for sidebar items */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" color="bg-blue-500" />
            <SidebarItem icon={Users} label="Employees" notification="5" color="bg-green-500" />
            <SidebarItem icon={CalendarDays} label="Schedule" color="bg-purple-500" />
            <SidebarItem icon={FileText} label="Documents" color="bg-orange-500" />
            <SidebarItem icon={MessageSquare} label="Messages" notification="9" color="bg-pink-500" />
            <SidebarItem icon={Settings} label="Settings" color="bg-gray-500" />
          </div>
        </ScrollArea>
        
        {/* Footer section in sidebar */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t p-4"
          >
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-4 text-white">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <p className="font-medium">Progress</p>
              </div>
              <p className="text-sm text-blue-100">8/12</p>
              <div className="mt-3 h-2 w-full rounded-full bg-white/20">
                <motion.div
                  className="h-2 rounded-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '66%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;
