import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Calendar, Heart, BookOpen, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/playdates', icon: Calendar, label: 'Playdates' },
    { path: '/care-pool', icon: Heart, label: 'Care' },
    { path: '/resources', icon: BookOpen, label: 'Resources' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/20 mobile-safe">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link key={path} to={path} className="relative">
              <motion.div
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive ? 'text-purple-400' : 'text-white/60'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{label}</span>
                
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-purple-400 rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    style={{ x: '-50%' }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;