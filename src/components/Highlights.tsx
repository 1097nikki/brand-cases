import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface HighlightCard {
  id: string;
  projectId: string; // ID of the project in ALL_PROJECTS to redirect to
  titleEn: string;
  titleCn: string;
  subtitleEn: string;
  subtitleCn: string;
  dateEn: string;
  dateCn: string;
  views: number;
  categoryEn: string;
  categoryCn: string;
  image: string;
  cardBg: string; // Background color of the mat board
  tagBg?: string;  // Custom style for category tag background
  tagTextColor?: string;
}

const HIGHLIGHTS_DATA: HighlightCard[] = [
  // Page 1
  {
    id: "hl-1",
    projectId: "selected-6",
    titleEn: "Jordan Fleming",
    titleCn: "Jordan Fleming",
    subtitleEn: "A fusion of art and design",
    subtitleCn: "艺术与设计的跨界融合",
    dateEn: "19 MARCH 2025",
    dateCn: "2025年3月19日",
    views: 3249,
    categoryEn: "ART",
    categoryCn: "艺术",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/acd6ca8dcf7a77fea8476bb836c2ff51.jpg",
    cardBg: "#c38e6a", // Warm terracotta / camel
  },
  {
    id: "hl-2",
    projectId: "selected-2",
    titleEn: "Finn Juhl's House",
    titleCn: "Finn Juhl 芬·尤尔",
    subtitleEn: "Finn Juhl's House, Denmark",
    subtitleCn: "丹麦芬·尤尔之家Finn Juhl's House",
    dateEn: "26 MARCH 2025",
    dateCn: "2025年3月26日",
    views: 4488,
    categoryEn: "INTERIORS",
    categoryCn: "室内空间",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f0523b45d9883d5618ddcbf47d55d864.jpg",
    cardBg: "#96a38c", // Muted sage / olive green
    tagBg: "#5d73b3",  // Beautiful slate-blue color matches screenshot
    tagTextColor: "#ffffff"
  },
  {
    id: "hl-3",
    projectId: "selected-7",
    titleEn: "Hafu Matsumoto",
    titleCn: "Hafu Matsumoto",
    subtitleEn: "Bamboo Exposed",
    subtitleCn: "Bamboo Exposed",
    dateEn: "15 DECEMBER 2024",
    dateCn: "2024年12月15日",
    views: 2203,
    categoryEn: "ART",
    categoryCn: "艺术",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f660b2176e1ad902076249adda390405.jpg",
    cardBg: "#131414", // Deep black/obsidian
  },
  // Page 2
  {
    id: "hl-4",
    projectId: "selected-1",
    titleEn: "Studio KO Studio",
    titleCn: "Studio KO",
    subtitleEn: "Museum Architecture in Marrakech",
    subtitleCn: "摩洛哥马拉喀什博物馆设计",
    dateEn: "12 JANUARY 2025",
    dateCn: "2025年1月12日",
    views: 1850,
    categoryEn: "ARCHITECTURE",
    categoryCn: "建筑空间",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/f135de13bed3749c370259374a46eb82.jpg",
    cardBg: "#475569", // Cool deep grey / slate
  },
  {
    id: "hl-5",
    projectId: "selected-4",
    titleEn: "Charlotte Perriand",
    titleCn: "Charlotte Perriand",
    subtitleEn: "Reinterpreting Iconic Chairs",
    subtitleCn: "经典单椅与空间重塑",
    dateEn: "08 FEBRUARY 2025",
    dateCn: "2025年2月08日",
    views: 2930,
    categoryEn: "FURNITURE",
    categoryCn: "家具设计",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/b5a30c0c750a0b8a9834d3303f520514.jpg",
    cardBg: "#c29676", // Dusty sand beige
    tagBg: "#627d6d",
    tagTextColor: "#ffffff"
  },
  {
    id: "hl-6",
    projectId: "selected-8",
    titleEn: "Jean Arp Works",
    titleCn: "Jean Arp",
    subtitleEn: "Organic Figures and Forms",
    subtitleCn: "有机雕塑与抽象形体",
    dateEn: "20 NOVEMBER 2024",
    dateCn: "2024年11月20日",
    views: 3104,
    categoryEn: "ART",
    categoryCn: "艺术",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/da9637d9d7e70267378f65cf3661fc2a.jpg",
    cardBg: "#2e2528", // Deep burgundy-brown
  },
  // Page 3
  {
    id: "hl-7",
    projectId: "selected-10",
    titleEn: "Azuma Makoto",
    titleCn: "东信康人 Azuma Makoto",
    subtitleEn: "Spiritual Botanical Sculptures",
    subtitleCn: "植物雕塑的精神世界",
    dateEn: "05 MARCH 2025",
    dateCn: "2025年3月5日",
    views: 3670,
    categoryEn: "FLORISTRY",
    categoryCn: "花卉艺术",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/b6331dbe894287a1d58d342627f48ffe.jpg",
    cardBg: "#1e293b", // Slate blue
  },
  {
    id: "hl-8",
    projectId: "selected-12",
    titleEn: "Taizo Kuroda",
    titleCn: "黑田泰藏 Taizo Kuroda",
    subtitleEn: "The Silence of Pure Porcelain",
    subtitleCn: "极致静谧的拼白瓷器",
    dateEn: "18 JANUARY 2025",
    dateCn: "2025年1月18日",
    views: 4190,
    categoryEn: "CERAMICS",
    categoryCn: "陶瓷艺术",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/98cb0eb20ac382eb24fbb7c646149a8b.jpg",
    cardBg: "#a3b19b", // Sage mist green
    tagBg: "#43524b",
    tagTextColor: "#ffffff"
  },
  {
    id: "hl-9",
    projectId: "selected-9",
    titleEn: "Tadao Ando Design",
    titleCn: "安藤忠雄 Tadao Ando",
    subtitleEn: "Church of the Light & Concrete",
    subtitleCn: "光之教堂与清水混凝土",
    dateEn: "30 APRIL 2025",
    dateCn: "2025年4月30日",
    views: 5720,
    categoryEn: "ARCHITECTURE",
    categoryCn: "建筑美学",
    image: "https://bee-reg-ab.imagency.cn/mr/5553/26/aad781f400d1fe6e4da627fa0aa586a7.jpg",
    cardBg: "#1c2022", // Coal charcoal grey
  }
];

interface HighlightsProps {
  onSelectProject: (id: string) => void;
}

export default function Highlights({ onSelectProject }: HighlightsProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0); // 0, 1, 2 for 3 pages
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const totalPages = 3;

  const handlePrev = () => {
    setDirection('left');
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Extract the 3 items for the current page
  const startIndex = currentPage * 3;
  const currentItems = HIGHLIGHTS_DATA.slice(startIndex, startIndex + 3);

  // Animation variants for the sliding/fade transition
  const containerVariants = {
    hidden: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 30 : -30,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -30 : 30,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="highlights-section" className="w-full bg-white max-w-7xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Title Area */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-3.5xl md:text-4xl text-neutral-900 font-medium tracking-tight">
            The Highlights
          </h2>
        </div>

        {/* Action controls (left/right arrows) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer rounded-xs"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer rounded-xs"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Grid of 3 Cards with Beautiful Animated Transitions */}
      <div className="relative overflow-hidden min-h-[1900px] md:min-h-[610px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectProject(item.projectId)}
                className="relative w-[447px] h-[586px] flex-shrink-0 bg-neutral-900/5 rounded-none overflow-hidden select-text shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-pointer border border-neutral-100"
              >
                <img
                  src={item.image}
                  alt={t(item.titleCn, item.titleEn)}
                  className="w-full h-full object-cover filter brightness-[0.97] transition-transform duration-700 ease-out hover:scale-103"
                  loading="lazy"
                />
                {/* Premium floating category tag overlay in bottom-right with custom styling */}
                <span
                  className="absolute bottom-5 right-5 text-[10px] font-mono tracking-[0.25em] font-medium text-white uppercase drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.65)]"
                >
                  {t(item.categoryCn, item.categoryEn)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>


    </section>
  );
}
