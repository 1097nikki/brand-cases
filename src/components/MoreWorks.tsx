/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface MoreWorksProps {
  onSelectProject?: (id: string) => void;
}

export default function MoreWorks({ onSelectProject }: MoreWorksProps) {
  const { t } = useLanguage();

  // Curated 18 highly stylistic design visual images representing creative project outputs
  // Row 1 contains exactly 9 beautiful square works
  const row1Images = [
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=600&auto=format&fit=crop"
  ];

  // Row 2 contains the remaining 9 items, keeping layout rich & beautifully aligned
  const row2Images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-white overflow-hidden">
      {/* Inline styles for perfect seamless hardware-accelerated marquees */}
      <style>{`
        @keyframes marquee-to-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-to-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left-track {
          animation: marquee-to-left 42s linear infinite;
        }
        .animate-marquee-right-track {
          animation: marquee-to-right 42s linear infinite;
        }
        .marquee-container-row:hover .animate-marquee-left-track,
        .marquee-container-row:hover .animate-marquee-right-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Title, bounded within page's standard centered grid gutters */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-12">
        <div className="border-b border-neutral-900 pb-2">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight uppercase text-neutral-900 flex items-baseline gap-3">
            {t('更多作品', 'MORE WORKS')}
            <span className="text-xl md:text-2xl font-light">{t('', 'Selected Digital')}</span>
          </h2>
        </div>
      </div>

      {/* 2-Row uniform height flat image infinite marquee block spanning 100% viewport width */}
      <div className="space-y-4 md:space-y-6">
        {/* ROW 1: LEFT-ROLLING */}
        <div className="marquee-container-row overflow-hidden w-full relative">
          <div className="flex w-max animate-marquee-left-track">
            {/* Primary Track */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
              {row1Images.map((imgUrl, index) => (
                <motion.div
                  key={`row1-${index}`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-[180px] md:w-[260px] aspect-square rounded-none overflow-hidden shrink-0"
                >
                  <img
                    src={imgUrl}
                    alt="Gallery item"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                  />
                </motion.div>
              ))}
            </div>
            {/* Duplicate Track for perfect loop */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden="true">
              {row1Images.map((imgUrl, index) => (
                <motion.div
                  key={`row1-clone-${index}`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-[180px] md:w-[260px] aspect-square rounded-none overflow-hidden shrink-0"
                >
                  <img
                    src={imgUrl}
                    alt="Gallery item"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: RIGHT-ROLLING */}
        <div className="marquee-container-row overflow-hidden w-full relative">
          <div className="flex w-max animate-marquee-right-track">
            {/* Primary Track */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
              {row2Images.map((imgUrl, index) => (
                <motion.div
                  key={`row2-${index}`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-[180px] md:w-[260px] aspect-square rounded-none overflow-hidden shrink-0"
                >
                  <img
                    src={imgUrl}
                    alt="Gallery item"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                  />
                </motion.div>
              ))}
            </div>
            {/* Duplicate Track for perfect loop */}
            <div className="flex gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden="true">
              {row2Images.map((imgUrl, index) => (
                <motion.div
                  key={`row2-clone-${index}`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative w-[180px] md:w-[260px] aspect-square rounded-none overflow-hidden shrink-0"
                >
                  <img
                    src={imgUrl}
                    alt="Gallery item"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
