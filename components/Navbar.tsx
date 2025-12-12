import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="px-6 md:px-16 py-6 md:py-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src="/centauro.gif" alt="Centauro" className="h-20 md:h-24 w-auto" />
          <a href="#" className="text-primary text-3xl md:text-5xl font-bold tracking-tighter">MDH VÍDEOS IA</a>
        </div>
        <div>
          <img src="/mdh.gif" alt="MDH" className="h-20 md:h-24 w-auto" />
        </div>
      </div>
    </nav>
  );
};
