/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ALL_PROJECTS, getProjectImage } from '../data';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, CornerDownLeft } from 'lucide-react';

interface ProjectDetailProps {
  projectId?: string | null;
  onClose?: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

/**
 * Robust helper to extract project id from HashRouter hash mode or search parameters.
 * Supports:
 * - HashRouter path: #/project/:id, #/detail/:id, #/:id, #:id
 * - HashRouter query: #/project?id=:id, #?id=:id
 * - Standard query: ?id=:id
 * - Direct prop: fallbackPropId
 */
export function getProjectIdFromHash(fallbackPropId?: string | null): string | null {
  if (typeof window === 'undefined') return fallbackPropId || null;

  try {
    const rawHash = window.location.hash || '';
    if (rawHash) {
      // 1. Hash query mode: e.g. #/project?id=selected-1 or #?id=selected-1
      const queryIndex = rawHash.indexOf('?');
      if (queryIndex !== -1) {
        const queryParams = new URLSearchParams(rawHash.slice(queryIndex));
        const idFromQuery = queryParams.get('id') || queryParams.get('projectId');
        if (idFromQuery && idFromQuery.trim()) {
          return decodeURIComponent(idFromQuery.trim());
        }
      }

      // 2. Hash path mode: e.g. #/project/selected-1 or #selected-1
      const cleanPath = rawHash.replace(/^#\/?/, '').split('?')[0];
      const segments = cleanPath.split('/').filter(Boolean);
      if (segments.length > 0) {
        if (segments[0] === 'project' || segments[0] === 'detail' || segments[0] === 'works') {
          if (segments[1] && segments[1].trim()) {
            return decodeURIComponent(segments[1].trim());
          }
        }
        const lastSegment = segments[segments.length - 1];
        if (lastSegment && lastSegment.trim()) {
          return decodeURIComponent(lastSegment.trim());
        }
      }
    }

    // 3. Fallback: Search parameters in window.location.search
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const searchId = searchParams.get('id') || searchParams.get('projectId');
      if (searchId && searchId.trim()) {
        return decodeURIComponent(searchId.trim());
      }
    }
  } catch {
    // Graceful fallback on malformed URI components
  }

  return fallbackPropId ? fallbackPropId.trim() : null;
}

/**
 * Fallback online image mapping for live preview and testing environments
 * in case public /images/ assets are not yet placed on the host disk.
 */
const ONLINE_IMAGE_FALLBACKS: Record<string, string[]> = {
  "selected-1": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/52308eb58c00ecb0eaef8a7dafc0b940.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/811120dacb8cee124689fa8722141cc2.jpg"
  ],
  "selected-2": [
    "https://i.ibb.co/mFGj7bKJ/yep-01.jpg",
    "https://i.ibb.co/9k1PWSVc/yep-02.jpg",
    "https://i.ibb.co/rKLssRbS/yep-03.jpg"
  ],
  "selected-3": [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/32955bbbe361eeaad234c765a11aa932.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/edd4988bba823525b67cc01ab8f10b86.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/e1b3e45818aea795112668ee6ae3a8fb.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/b6316363a9025dfc1cefaf37ae6f4bde.jpg"
  ],
  "selected-4": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/6d746bc0bb236ee686bc0d5ae9680c88.jpg"
  ],
  "selected-5": [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/32955bbbe361eeaad234c765a11aa932.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/b6316363a9025dfc1cefaf37ae6f4bde.jpg"
  ],
  "selected-6": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/2fbb5c52e5d824b6f8baa4c63558a4f0.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/d2ae454a40b90a63e1d4d958d82cf1d3.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/9c658be48122da23de34c9a3acffa327.jpg"
  ],
  "selected-7": [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/40e3ccb38ffb79cc09a7ed5ed54fc44e.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/4831219878f872075134311839d156af.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/8d89f03e928b387c87031d1ae3118fbc.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/3ced29557f717f8858fa2077bd483ca4.jpg"
  ],
  "selected-8": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/d2ae454a40b90a63e1d4d958d82cf1d3.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/2fbb5c52e5d824b6f8baa4c63558a4f0.jpg"
  ],
  "selected-9": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/383a693971edc091b487c992d29a2eef.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/30d54909285c6e78deb144de4831e4f8.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/0c79db9fec8ed684d0942722d78fdf8d.jpg"
  ],
  "selected-10": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e2866138bc43bc43c6a8e235c604b0e8.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/f00ca3e63a7919abdd941a03049e697b.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e1674b457f01d45426b5fa20b5b2a4b7.jpg"
  ],
  "selected-11": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/7f559ebc7076ef1b548c40d54abb785d.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/80c96775492cc027d372760b2526f0a3.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/ecbb9c1b5bef5f267c83647982f88f6a.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/69241d4bb5ae57c2b3712fbb9abf78de.jpg"
  ],
  "selected-12": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/3d7264a22bc830431f7f55c3ccdf9b84.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/8388a67c3dff018e96e8bb8a71b81eab.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e2b5a36a7e0422e1742f04db7d21e7eb.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e9727cdc699b8dcb5749b6f140649600.jpg"
  ],
  "selected-13": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/5b08244a79b310e28d641e5c4f15824f.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/87f8e926879d6f761bb4bf52caa0de17.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/261fcfcdeb851b502706842a34313b68.jpg"
  ],
  "selected-14": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/02f36a624a908795617a960a220c194b.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/1ae63b970a2431acda2e8ff459484c1b.jpg"
  ],
  "selected-15": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/02f36a624a908795617a960a220c194b.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/1ae63b970a2431acda2e8ff459484c1b.jpg"
  ],
  "selected-16": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/8033f033637eb37d0f11c1e1ae2e99ae.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/8e08f95b65381fd7abd789caa7742474.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/075185d30f1b7a4a410841dafac92f0f.jpg"
  ],
  "tempo-peach": [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/a62d03694350018a6b1e41e19595adf0.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/ac9c690a69dbd9b2ea15201ae9623a19.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/6e94c1a914d0aa1fd44ee46e6c41fa29.jpg"
  ],
  "naturo-soap": [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/40e3ccb38ffb79cc09a7ed5ed54fc44e.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/4831219878f872075134311839d156af.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/8d89f03e928b387c87031d1ae3118fbc.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/3ced29557f717f8858fa2077bd483ca4.jpg"
  ],
  "sylvia-scentcard": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e2866138bc43bc43c6a8e235c604b0e8.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/a58eab38206e6e654aa05c81d98d46fc.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/f1c394e9dfe158eadb32a22a1eab3ae1.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/f00ca3e63a7919abdd941a03049e697b.jpg"
  ],
  "xiaobai-shoe-cleaner": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/053572bb06fe727ec68bb237eb451156.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/8f071ca3132015a452e9b238a29d694f.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/c2ceb6bed48d98f954b8dfb75e40ac45.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/e32bae9992f49483900cba2dae35482d.jpg"
  ],
  "xiaobai-laundry": [
    "https://bee-reg-ac.imagency.cn/jc/5553/26/69241d4bb5ae57c2b3712fbb9abf78de.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/7f559ebc7076ef1b548c40d54abb785d.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/ecbb9c1b5bef5f267c83647982f88f6a.jpg",
    "https://bee-reg-ac.imagency.cn/jc/5553/26/80c96775492cc027d372760b2526f0a3.jpg"
  ]
};

export default function ProjectDetail({ projectId, onClose, onNavigate }: ProjectDetailProps) {
  const [currentId, setCurrentId] = useState<string | null>(() => getProjectIdFromHash(projectId));
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Listen to hash and popstate for mobile Safari, WeChat X5, and desktop browser navigation
  useEffect(() => {
    const syncProjectId = () => {
      const activeId = getProjectIdFromHash(projectId);
      if (activeId) {
        setCurrentId(activeId);
      }
    };

    // Immediate sync on mount
    syncProjectId();

    window.addEventListener('hashchange', syncProjectId, { passive: true });
    window.addEventListener('popstate', syncProjectId, { passive: true });

    return () => {
      window.removeEventListener('hashchange', syncProjectId);
      window.removeEventListener('popstate', syncProjectId);
    };
  }, [projectId]);

  // Sync state if prop changes directly
  useEffect(() => {
    if (projectId) {
      setCurrentId(projectId);
    }
  }, [projectId]);

  // Strict lookup using Array.prototype.find by unique ID. Never uses array index [].
  const project: Project | undefined = currentId
    ? ALL_PROJECTS.find(p => p.id === currentId || (currentId === 'libai-loopy-laundry' && p.id === 'selected-15'))
    : undefined;

  useEffect(() => {
    console.log('[ProjectDetail] ID verification check:', {
      propProjectId: projectId,
      resolvedCurrentId: currentId,
      windowHash: typeof window !== 'undefined' ? window.location.hash : '',
      matchedInAllProjects: Boolean(project),
      matchedProjectId: project?.id || null,
      matchedProjectTitle: project?.titleCn || null,
      isMatchValid: Boolean(currentId && project && currentId === project.id)
    });
  }, [projectId, currentId, project]);

  // Safe handler to close detail view and clean URL hash
  const handleClose = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.location.hash) {
          window.location.hash = '';
        }
      } catch {
        // Fallback safely
      }
    }
    onClose?.();
  }, [onClose]);

  // Keyboard navigation handler (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handleNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Smooth reset scroll position to top on project switch
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    if (detailContainerRef.current) {
      detailContainerRef.current.scrollIntoView({ behavior: 'instant' });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentId, handleClose]);

  // Navigate to previous or next project by ID
  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!project) return;
    const currentIndex = ALL_PROJECTS.findIndex(p => p.id === project.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % ALL_PROJECTS.length
      : (currentIndex - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length;

    const targetProject = ALL_PROJECTS.find((_, idx) => idx === nextIndex);
    if (targetProject) {
      setCurrentId(targetProject.id);
      if (typeof window !== 'undefined') {
        window.location.hash = `#/project/${targetProject.id}`;
      }
      onNavigate?.(direction);
    }
  };

  // Graceful fallback UI when project is not found
  if (!project) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <p className="text-neutral-500 font-mono text-sm mb-4">
          {t('未找到对应项目', 'Project Not Found')}
        </p>
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
          <span>{t('返回首页', 'Return to Index')}</span>
        </button>
      </div>
    );
  }

  // Derive detail images directly from project.images
  const rawImages: string[] = (project.images && project.images.length > 0)
    ? project.images
    : [project.bannerImage || getProjectImage(project)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      ref={detailContainerRef}
      className="w-full bg-white min-h-screen px-4 sm:px-6 md:px-12 py-8 md:py-10"
    >
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        {/* Top Header Navigation Bar */}
        <div className="flex justify-between items-center border-b border-neutral-100 pb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-neutral-900 font-semibold group hover:text-neutral-500 transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t('返回首页', 'Back to Index')}</span>
          </button>
        </div>

        {/* Gallery Content Area */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-y-[0.2cm]">
            {rawImages.map((imgSrc, index) => {
              const isTempoPeachThird = project.id === 'tempo-peach' && index === 2;
              const isSelectedOneFourth = project.id === 'selected-1' && index === 3;
              const fallbackUrl = ONLINE_IMAGE_FALLBACKS[project.id]?.[index] || imgSrc;

              const imageElement = (
                <img
                  src={imgSrc}
                  alt={`${project.titleEn} - Detail ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Safe fallback if local image is not available yet
                    if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl;
                    }
                  }}
                  className={`w-full h-auto object-contain transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:opacity-95 filter brightness-[0.98] ${
                    index === 0 ? '' : 'group-hover:scale-[1.02]'
                  }`}
                />
              );

              if (isTempoPeachThird || isSelectedOneFourth) {
                return (
                  <a
                    key={`detail-link-${project.id}-${index}`}
                    href="https://www.digitaling.com/projects/79883.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden bg-[#fdfdfd] border border-neutral-100/70 cursor-pointer"
                  >
                    {imageElement}
                    <div className="absolute inset-0 bg-black/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                );
              }

              return (
                <div
                  key={`detail-item-${project.id}-${index}`}
                  className="group relative overflow-hidden bg-[#fdfdfd] border border-neutral-100/70"
                >
                  {imageElement}
                  <div className="absolute inset-0 bg-black/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Return Button */}
        <div className="border-t border-neutral-100 pt-8 flex justify-end items-center text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-neutral-900 cursor-pointer hover:underline py-2"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>{t('返回首页', 'Close and Return')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
