/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const footerElement = document.getElementById('site-footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesElement = document.getElementById('services-section');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const worksElement = document.getElementById('index');
    if (worksElement) {
      worksElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-neutral-100 py-4 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center text-[11px] uppercase tracking-[0.2em] font-mono text-neutral-500 bg-white"
    >
      <div className="flex items-center gap-2 mb-2 md:mb-0 mr-auto">
        <span className="font-sans font-semibold text-neutral-900 text-xs tracking-widest">
          {t('Nikki', 'Nikki')}
        </span>
      </div>

      <div className="flex items-center gap-6 md:gap-12 mb-2 md:mb-0 text-neutral-400 mr-0 md:mr-16">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleScrollToWorks}
            className="text-neutral-900 font-sans font-medium hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none"
          >
            {t('Works', 'Works')}
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button 
            type="button"
            onClick={handleScrollToServices}
            className="hover:text-neutral-900 transition-colors cursor-pointer uppercase font-mono tracking-[0.2em] bg-transparent border-0 p-0 text-neutral-400 focus:outline-none"
          >
            {t('服务', 'Services')}
          </button>
          <span className="text-neutral-200">/</span>
          <button 
            type="button"
            onClick={handleScrollToContact}
            className="hover:text-neutral-900 transition-colors cursor-pointer uppercase font-mono tracking-[0.2em] bg-transparent border-0 p-0 text-neutral-400 focus:outline-none"
          >
            {t('联系', 'Contact')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-right">
        {/* Elegant Language Toggle Pill */}
        <div className="flex items-center gap-2.5 border border-neutral-100 rounded-full px-3 py-0.5 text-[9px] tracking-normal font-sans text-neutral-400 bg-neutral-50">
          <button
            onClick={() => setLanguage('zh')}
            className={`transition-all cursor-pointer ${language === 'zh' ? 'text-neutral-900 font-semibold underline underline-offset-4' : 'hover:text-neutral-900 hover:underline'}`}
          >
            中文
          </button>
          <span className="text-neutral-200 font-mono text-[9px]">/</span>
          <button
            onClick={() => setLanguage('en')}
            className={`transition-all cursor-pointer ${language === 'en' ? 'text-neutral-900 font-semibold underline underline-offset-4' : 'hover:text-neutral-900 hover:underline'}`}
          >
            EN
          </button>
        </div>
      </div>
    </motion.header>
  );
}
