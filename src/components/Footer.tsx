import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer 
      id="site-footer"
      className="w-full bg-[#f9f9f9] border-t border-neutral-100 py-16 md:py-24 px-6 md:px-12 select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start text-left w-full">
        {/* Left column: Heading and descriptions */}
        <div className="md:col-span-8 flex flex-col items-start">
          {/* Main Get in Touch Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 flex items-center gap-2 mb-6 select-none font-sans">
            {t('让我们携手合作 →', "Let's work together →")}
          </h2>

          {/* Supplementary descriptive paragraphs */}
          <div className="space-y-1 font-sans text-neutral-500 text-sm md:text-base leading-relaxed font-normal select-text">
            <p>
              {t("我一直都乐于接受新的项目、合作或关于设计的交流。", "I'm always open to new projects, collaborations, or design conversations.")}
            </p>
            <p>
              {t("如果您有任何想法或想与我联系，欢迎随时联系我。", "If you have any ideas or want to reach out, feel free to contact me.")}
            </p>
          </div>
        </div>

        {/* Right column: Contact Email */}
        <div className="md:col-span-4 flex md:justify-end items-start w-full md:pt-4">
          <p className="font-sans text-neutral-500 text-sm md:text-base leading-relaxed font-normal select-text">
            nikkiherasasasa@foxmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
