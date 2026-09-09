import React from 'react';

export default function BrandBanner() {
  const brands = [
    "Swisse斯维诗",
    "汤臣倍健",
    "伊利",
    "安慕希",
    "味可滋",
    "P&G",
    "护舒宝",
    "OLAY",
    "当妮",
    "欧莱雅",
    "沙宣",
    "维达",
    "Tempo得宝",
    "洁柔",
    "立白",
    "蓝月亮"
  ];

  // Duplicate the brand list for a seamless continuous scrolling marquee
  const loopItems = [...brands, ...brands];

  return (
    <section 
      id="brand-ticker-section"
      className="w-full h-[70px] bg-white flex items-center overflow-hidden select-none relative"
    >
      <style>{`
        @keyframes brandMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-brand-marquee {
          display: flex;
          width: max-content;
          animation: brandMarqueeLeft 35s linear infinite;
        }
        /* Pause scroll on hover */
        .brand-marquee-wrapper:hover .animate-brand-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="w-full overflow-hidden flex whitespace-nowrap brand-marquee-wrapper">
        <div className="animate-brand-marquee flex gap-20 items-center px-4">
          {loopItems.map((brand, idx) => (
            <span 
              key={idx} 
              className="text-[25px] font-sans font-medium text-neutral-400 tracking-normal hover:text-neutral-900 transition-colors duration-300 flex-shrink-0 cursor-default"
              style={{ height: '32px', lineHeight: '32px' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

