import React from 'react';
import { motion } from 'motion/react';

interface PromoBannerProps {
  onSelectProject: (id: string) => void;
}

export default function PromoBanner({ onSelectProject }: PromoBannerProps) {
  const handleBannerClick = () => {
    onSelectProject('selected-1');
  };

  return (
    <section 
      id="promo-hero-banner"
      onClick={handleBannerClick}
      className="w-full h-[586px] relative overflow-hidden bg-white cursor-pointer group select-none"
    >
      <motion.img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
        alt="Promo Banner"
        className="w-full h-full object-cover transition-transform duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
        referrerPolicy="no-referrer"
      />
    </section>
  );
}
