/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SelectedWorks from './components/SelectedWorks';
import WorkSlider from './components/WorkSlider';
import PromoBanner from './components/PromoBanner';
import CreativeCarousel from './components/CreativeCarousel';
import BrandBanner from './components/BrandBanner';
import Services from './components/Services';
import MyProcess from './components/MyProcess';
import AestheticGrid from './components/AestheticGrid';
import ProductShowcase from './components/ProductShowcase';
import AestheticBanner from './components/AestheticBanner';
import ShowcaseBanner from './components/ShowcaseBanner';
import MoreWorks from './components/MoreWorks';
import ProjectDetail from './components/ProjectDetail';
import { ALL_PROJECTS } from './data';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { CornerDownRight } from 'lucide-react';

function AppContent() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { language, t } = useLanguage();

  // Smooth scroll helper when opening projects
  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard Navigation: Previous, Next
  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProjectId) return;
    
    const currentIndex = ALL_PROJECTS.findIndex(p => p.id === selectedProjectId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;
    if (direction === 'prev') {
      targetIndex = currentIndex === 0 ? ALL_PROJECTS.length - 1 : currentIndex - 1;
    } else {
      targetIndex = currentIndex === ALL_PROJECTS.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedProjectId(ALL_PROJECTS[targetIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fade-in reveal animations on blocks
  const blockFadeIn = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-neutral-200 app-scale-container">
      
      {/* 1. Header Navigation Bar */}
      <Header />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            /* =================== VIEW I: MAIN HOMEPAGE =================== */
            <motion.div
              key="homepage"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className=""
            >
              
              {/* 2. Hero Header Introduction Section (Reference 1) */}
              <motion.section 
                variants={blockFadeIn}
                className="max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-12 pb-2 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start bg-white"
              >
                {/* Large brand typography */}
                <div className="md:col-span-6 space-y-4">
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tight-titles text-neutral-900 leading-none select-none">
                    Nikki
                  </h1>
                </div>

                {/* English explanation block alongside corresponding Chinese translation */}
                <div className="md:col-span-5 md:col-start-8 grid grid-cols-1 gap-6 pt-2 select-text">
                  {language === 'en' ? (
                    <div className="space-y-3">
                      <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-1.5">
                        <CornerDownRight className="w-3 h-3 text-neutral-300" /> Simplicity. Utility. Balance.
                      </p>
                      <p className="text-sm md:text-[14px] text-neutral-500 font-normal leading-[1.75] pr-4">
                        To me, design is about removing unnecessary elements, focusing on what truly matters.
                        <br />
                        Minimalist modernist visual language, focused on brand strategy, branding & visual communication.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-1.5">
                        <CornerDownRight className="w-3 h-3 text-neutral-300" /> 简洁。实用。平衡。
                      </p>
                      <p className="text-sm md:text-[14px] text-neutral-500 font-normal leading-[1.75] pr-4">
                        对我而言，设计在于去除不必要的元素，专注于真正重要的部分。
                        <br />
                        设计语言简约现代，专注于策略、品牌塑造和视觉传达。
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>



              {/* Added: Independent creative carousel block right above The Highlights */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blockFadeIn}
                className="mt-[44px]"
              >
                <CreativeCarousel />
              </motion.div>

              {/* Added: Paginated WORK slider section above Selected Works */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-16"
              >
                <WorkSlider onSelectProject={handleSelectProject} />
              </motion.div>

              {/* Brand New Independent Grid Showcase Block */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-[0.5cm]"
              >
                <AestheticGrid />
              </motion.div>

              {/* 3.5. My Process Section ("我的工作方式") */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-16"
              >
                <MyProcess />
              </motion.div>

              {/* 3. Selected Works Section (Grid / List / Feed / Full Toggle) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-16"
              >
                <SelectedWorks onSelectProject={handleSelectProject} />
              </motion.div>

              {/* 4. Services Introduction Section */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-16"
              >
                <Services />
              </motion.div>

              {/* 5. Product Showcase Section (2-Row edge-to-edge auto-scrolling grayscale product cards) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="mt-16"
              >
                <ProductShowcase />
              </motion.div>

              {/* 6. Showcase Banner Section (1-Column full-bleed, height 586px, right below Product Showcase) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={blockFadeIn}
                className="w-full mt-10"
              >
                <ShowcaseBanner />
              </motion.div>



              {/* Moved: Brand names marquee text block with a fixed height of 70px directly below ProductShowcase section */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blockFadeIn}
                className="mt-6"
              >
                <BrandBanner />
              </motion.div>



            </motion.div>
          ) : (
            /* =================== VIEW II: PROJECT DETAIL VIEW =================== */
            <motion.div key="project-detail">
              <ProjectDetail
                projectId={selectedProjectId}
                onClose={() => setSelectedProjectId(null)}
                onNavigate={handleNavigateProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 6. Footer Navigation Sign-off Bar */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
