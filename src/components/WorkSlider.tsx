import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface WorkItem {
  id: string;
  titleEn: string;
  titleCn: string;
  descEn: string;
  descCn: string;
  category: string;
  badgeBg?: string; // Optional custom background color for badge (like INTERIORS or ART)
  badgeTextColor?: string;
  image: string;
  dateEn: string;
  dateCn: string;
  views: string;
  projectId: string; // The ID of the project to open when clicked
}

const WORK_ITEMS: WorkItem[] = [
  // Page 1
  {
    id: "work-1",
    titleEn: "Tempo Peach Facial Tissue",
    titleCn: "Tempo得宝浅桃手帕纸",
    descEn: "Tempo Peach Facial Tissue",
    descCn: "Tempo得宝浅桃手帕纸",
    category: "Hand Cream",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/acd6ca8dcf7a77fea8476bb836c2ff51.jpg",
    dateEn: "19 MARCH 2025",
    dateCn: "2025年3月19日",
    views: "3249",
    projectId: "tempo-peach"
  },
  {
    id: "work-2",
    titleEn: "Naturo Fruity Soap",
    titleCn: "Naturo 果香肥皂",
    descEn: "Naturo Fruity Soap",
    descCn: "Naturo 果香肥皂",
    category: "Laundry Powder",
    badgeBg: "bg-[#7186bf]", // Styled steel blue matching screenshot
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f0523b45d9883d5618ddcbf47d55d864.jpg",
    dateEn: "26 MARCH 2025",
    dateCn: "2025年3月26日",
    views: "4488",
    projectId: "naturo-soap"
  },
  {
    id: "work-3",
    titleEn: "SVLVIA Woody Shower Oil",
    titleCn: "SVLVIA木香沐浴油",
    descEn: "SVLVIA Woody Shower Oil",
    descCn: "SVLVIA木香沐浴油",
    category: "Hand Cream",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f660b2176e1ad902076249adda390405.jpg",
    dateEn: "15 DECEMBER 2024",
    dateCn: "2024年12月15日",
    views: "2203",
    projectId: "selected-3"
  },
  // Page 2
  {
    id: "work-4",
    titleEn: "Grasse Rose Hand Cream",
    titleCn: "立白大师香氛格拉斯玫瑰护手霜",
    descEn: "Grasse Rose Hand Cream",
    descCn: "立白大师香氛格拉斯玫瑰护手霜",
    category: "Laundry Powder",
    badgeBg: "bg-[#7f8e7b]", // Sage/olive gray
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f135de13bed3749c370259374a46eb82.jpg",
    dateEn: "08 FEBRUARY 2025",
    dateCn: "2025年2月8日",
    views: "5120",
    projectId: "libai-handrose"
  },
  {
    id: "work-5",
    titleEn: "Sylvia Fragrance Scent Card",
    titleCn: "Sylvia香氛扩香卡",
    descEn: "Sylvia Fragrance Scent Card",
    descCn: "Sylvia香氛扩香卡",
    category: "Scent Card",
    badgeBg: "bg-[#bf9478]", // Warm terra cotta
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/b5a30c0c750a0b8a9834d3303f520514.jpg",
    dateEn: "14 JANUARY 2025",
    dateCn: "2024年1月14日",
    views: "3892",
    projectId: "xiaobai-laundry"
  },
  {
    id: "work-6",
    titleEn: "UNIWONDER Fragrance Body Wash",
    titleCn: "UNIWONDER 香氛沐浴露",
    descEn: "UNIWONDER Fragrance Body Wash",
    descCn: "UNIWONDER 香氛沐浴露",
    category: "Shoe Care",
    badgeBg: "bg-[#7186bf]",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/da9637d9d7e70267378f65cf3661fc2a.jpg",
    dateEn: "03 NOVEMBER 2024",
    dateCn: "2024年11月3日",
    views: "2954",
    projectId: "selected-6"
  },
  // Page 3
  {
    id: "work-7",
    titleEn: "White Shoe Cleaner",
    titleCn: "小白鞋清洁剂",
    descEn: "White Shoe Cleaner",
    descCn: "小白鞋清洁剂",
    category: "Shoe Cleaner",
    badgeBg: "bg-[#7f8e7b]",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/b6331dbe894287a1d58d342627f48ffe.jpg",
    dateEn: "22 OCTOBER 2024",
    dateCn: "2024年10月22日",
    views: "3110",
    projectId: "xiaobai-shoe-cleaner"
  },
  {
    id: "work-8",
    titleEn: "Liby Xiaobai Universe Fragrance Laundry Powder",
    titleCn: "立白小白宇宙香氛免搓洗衣粉",
    descEn: "Liby Xiaobai Universe Fragrance Laundry Powder",
    descCn: "立白小白宇宙香氛免搓洗衣粉",
    category: "Body Wash",
    badgeBg: "bg-neutral-600",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/98cb0eb20ac382eb24fbb7c646149a8b.jpg",
    dateEn: "15 SEPTEMBER 2024",
    dateCn: "2024年9月15日",
    views: "4190",
    projectId: "sylvia-scentcard"
  },
  {
    id: "work-9",
    titleEn: "Grasse Rose Fragrance Hand Soap",
    titleCn: "立白大师香氛格拉斯玫瑰洗手液",
    descEn: "Grasse Rose Fragrance Hand Soap",
    descCn: "立白大师香氛格拉斯玫瑰洗手液",
    category: "Fragrance",
    badgeBg: "bg-[#bf9478]",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/aad781f400d1fe6e4da627fa0aa586a7.jpg",
    dateEn: "30 AUGUST 2024",
    dateCn: "2024年8月30日",
    views: "2840",
    projectId: "selected-9"
  }
];

interface WorkSliderProps {
  onSelectProject: (id: string) => void;
}

export default function WorkSlider({ onSelectProject }: WorkSliderProps) {
  const [currentPage, setCurrentPage] = useState(0); // 0, 1, 2
  const { t } = useLanguage();

  const totalPages = 3;
  const itemsPerPage = 3;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Get index range for current page
  const startIndex = currentPage * itemsPerPage;
  const currentPageItems = WORK_ITEMS.slice(startIndex, startIndex + itemsPerPage);

  // Animation variants for page transitions
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  // State to track slide direction for spring transition animation style
  const [slideDirection, setSlideDirection] = useState(1);

  const prevPage = () => {
    setSlideDirection(-1);
    handlePrev();
  };

  const nextPage = () => {
    setSlideDirection(1);
    handleNext();
  };

  return (
    <section 
      id="work-slider-section" 
      className="w-full px-6 md:px-12 pt-2 md:pt-2 pb-1 max-w-7xl mx-auto bg-white select-none"
    >
      {/* Block Header Nav */}
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-8 md:mb-10">
        <h3 className="font-sans text-3xl sm:text-4xl tracking-[0.05em] font-medium text-neutral-900">
          {t('The Highlights', 'The Highlights')}
        </h3>

        {/* Paginated Navigation Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-medium text-neutral-400 mr-1">
            0{currentPage + 1} / 0{totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevPage}
              className="w-8 h-8 rounded-full border border-neutral-150 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer text-neutral-600 active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPage}
              className="w-8 h-8 rounded-full border border-neutral-150 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer text-neutral-600 active:scale-95"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider View Row (A Grid of 3 Cards with explicit 419x583 px proportions) */}
      <div className="w-full overflow-hidden min-h-[530px] sm:min-h-[380px] md:min-h-[430px] lg:min-h-[390px] xl:min-h-[510px]">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentPage}
            custom={slideDirection}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            id="highlight_card_wrap"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 justify-items-center w-full"
          >
            {currentPageItems.map((item) => {
              const isHandSoap = item.id === 'work-9' || item.projectId === 'selected-9';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!isHandSoap) {
                      onSelectProject(item.projectId);
                    }
                  }}
                  className={`group relative w-full max-w-[419px] aspect-[419/583] bg-neutral-50 rounded-none overflow-hidden shadow-xs border border-neutral-100/30 ${
                    isHandSoap ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  {/* 1. Card Image Cover */}
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className={`w-full h-full object-contain transition-transform duration-[1200ms] ease-[0.16,1,0.3,1] ${
                      isHandSoap ? '' : 'group-hover:scale-[1.04]'
                    }`}
                  />

                  {/* 2. Soft darkening overlay */}
                  <div className={`absolute inset-0 bg-neutral-950/5 transition-colors duration-500 ${
                    isHandSoap ? '' : 'group-hover:bg-neutral-950/10'
                  }`} />

                  {/* 3. Floating category label perfectly matching screenshot placements */}
                  <div className="absolute bottom-[202px] right-6 z-20">
                    {item.badgeBg ? (
                      <span className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest font-semibold text-white uppercase rounded-none ${item.badgeBg}`}>
                        {item.category}
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] font-medium text-white drop-shadow-md uppercase">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* 4. Overlay Content card floating in bottom area */}
                  <div className={`absolute bottom-6 left-6 right-6 bg-white py-2.5 px-4 sm:py-3 sm:px-5 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-transform duration-[1000ms] ease-[0.16,1,0.3,1] ${
                    isHandSoap ? '' : 'group-hover:translate-y-[-4px]'
                  }`}>
                    {/* Subtitle description */}
                    <p className="text-[12px] sm:text-[13px] text-neutral-500 font-sans leading-relaxed truncate">
                      {t(item.descCn, item.descEn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* New bottom navigation controls: Centered dots & arrows surrounding them */}
      <div className="flex items-center justify-center gap-4 mt-7 md:mt-9 w-full">
        {/* Left Arrow Button */}
        <button
          onClick={prevPage}
          className="w-4 h-4 rounded-full border border-neutral-150 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer text-neutral-600 active:scale-95"
          aria-label="Previous Page Bottom"
        >
          <ChevronLeft className="w-2 h-2" />
        </button>

        {/* Centered Indicator Dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSlideDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === index 
                  ? 'bg-neutral-950 w-3' 
                  : 'bg-neutral-200 hover:bg-neutral-400 w-1'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={nextPage}
          className="w-4 h-4 rounded-full border border-neutral-150 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer text-neutral-600 active:scale-95"
          aria-label="Next Page Bottom"
        >
          <ChevronRight className="w-2 h-2" />
        </button>
      </div>
    </section>
  );
}
