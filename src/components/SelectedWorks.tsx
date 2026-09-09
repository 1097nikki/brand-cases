/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ALL_PROJECTS, getProjectImage } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

interface SelectedWorksProps {
  onSelectProject: (id: string) => void;
}

type ViewMode = 'Feed' | 'Full';

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('Feed');
  const selectedProjects = ALL_PROJECTS.filter(p => p.id.startsWith('selected-'));
  const { t, language } = useLanguage();

  // Container variants for staggered entrance
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="index" className="w-full px-6 md:px-12 pt-4 md:pt-6 pb-12 md:pb-20 max-w-7xl mx-auto bg-white">
      {/* Block Header Nav */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline border-b border-neutral-100 pb-4 mb-8 md:mb-12 gap-4">
        <h3 className="font-sans text-3xl sm:text-4xl tracking-tight font-medium text-neutral-900 flex items-center gap-1.5">
          {t('Selected Works', 'Selected Works')}
        </h3>

        {/* Dynamic Static Filtering Tabs */}
        <div className="flex items-center gap-6 text-[12px] font-mono tracking-widest text-neutral-400">
          {(['Feed', 'Full'] as ViewMode[]).map((mode) => {
            const labelMap: Record<ViewMode, string> = {
              Feed: t("作品", "Works"),
              Full: t("案例", "Cases")
            };
            const isActive = viewMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`relative py-1 cursor-pointer transition-colors duration-300 ${
                  isActive ? 'text-black font-medium' : 'hover:text-neutral-900'
                }`}
              >
                {labelMap[mode]}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 3: Feed Layout (Updated to 4x4 Grid with vertical rectangles) */}
        {viewMode === 'Feed' && (
          <motion.div
            key="feed-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[0.2cm]"
          >
            {Array.from({ length: 16 }).map((_, index) => {
              const targetProjectId = `selected-${index + 1}`;
              const project = ALL_PROJECTS.find(p => p.id === targetProjectId) || selectedProjects[index % selectedProjects.length];
              const feedImages = [
                "https://bee-reg-ab.imagency.cn/mr/5553/26/c7889947de209fbe48f88c8ffe43f5f6.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/f572d3d07d5f1d47f2a8b09888a01a92.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/8198b53e55ec585f02aa2310a6d978b3.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/765e0706bfb7ef4d10959742315109f0.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/fcdb50fbdd90ea682fd33a54c117a0d0.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/c469cc128af5585944aa2421d06cb587.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/6de0bf0e24b598ccb496532385adaf46.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/c6a87c76ac48c36deb23db26d22e4142.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/89f65a88d78465a0db1785388cd7095c.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/af9cb50c5692e5d46f397223ee594d6a.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/aa9f888da70a0d776de78cbdb43d2228.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/87e31baedd23f070aa5f5118efa9ccbd.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/03f3ed5aea7a7c6707bbc072ed352917.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/0b265abf9fcf20879e4aa3d87563b790.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/fc8ff77399e850b8777e87d924a82cc4.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/e455fab099eb982838a8bdae2b7455c2.jpg"
              ];
              const imageSrc = feedImages[index] || getProjectImage(project);
              const targetProject = project;
              const isDisabledCard = index === 1 || index === 2 || targetProjectId === 'selected-3' || index === 3 || targetProjectId === 'selected-4' || index === 5 || index === 14 || Boolean(targetProject.disableDetail || targetProject.disabled);
              return (
                <div
                  key={targetProjectId}
                  onClick={() => {
                    if (!isDisabledCard) {
                      if (typeof window !== 'undefined') {
                        window.location.hash = `#/project/${targetProjectId}`;
                      }
                      onSelectProject(targetProjectId);
                    }
                  }}
                  className={`group ${isDisabledCard ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-neutral-100 rounded-none">
                    <img
                      src={imageSrc}
                      alt={project.titleEn}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 ease-[0.16,1,0.3,1] ${
                        isDisabledCard ? '' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* VIEW 4: Full Layout (Updated to 3x3 Grid with vertical rectangles) */}
        {viewMode === 'Full' && (
          <motion.div
            key="full-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-[0.1cm]"
          >
            {selectedProjects.slice(0, 9).map((project, index) => {
              const casesImages = [
                "https://bee-reg-ab.imagency.cn/mr/5553/26/569132c58ba42d76c5cb7cca28ee05ac.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/a9491927eb23af824fc46cf655ec28ff.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/1518de01f98fa5edcb33a79923bab7e5.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/f2248fee7c338480dd678d8013fa8fee.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/1b69224474c7f756ca15e79981f480e7.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/3bfb0153451e2f9d8d43dc92a04ee0f0.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/8ccefc5c7d3261f72a688cf86571b165.jpg",
                "https://bee-reg-ab.imagency.cn/mr/5553/26/a9a9709d6445167279847ce45c57c55c.jpg",
                "https://bee-reg-ac.imagency.cn/jc/5553/26/a421f8b87f7b3fe6f3b09be701be8898.jpg"
              ];
              const imageSrc = casesImages[index] || getProjectImage(project);
              
              const cardLinks: Record<number, string> = {
                0: "https://huaban.com/boards/88166605",
                1: "https://huaban.com/boards/100777946",
                3: "https://huaban.com/boards/88166605",
                4: "https://huaban.com/boards/88166605",
                5: "https://huaban.com/boards/90161490",
                6: "https://huaban.com/boards/86643281",
                7: "https://www.zcool.com.cn/work/ZNDQ4ODA0ODQ=.html",
                8: "https://www.zcool.com.cn/work/ZNzQxMTI4MTY=.html"
              };
              
              const link = cardLinks[index];
              const isClickable = !!link;

              const cardContent = (
                <img
                  src={imageSrc}
                  alt={project.titleEn}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className={`w-full h-full object-contain transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 ${isClickable ? 'cursor-pointer' : ''}`}
                />
              );

              return (
                <div
                  key={project.id}
                  className="group select-none"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-neutral-100 rounded-none">
                    {link ? (
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        {cardContent}
                      </a>
                    ) : (
                      cardContent
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
