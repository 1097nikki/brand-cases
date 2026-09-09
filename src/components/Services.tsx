import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  titleEn: string;
  titleCn: string;
  descEn: string;
  descCn: string;
  tagsEn: string[];
  tagsCn: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "serv-1",
    num: "01",
    titleEn: "Brand Identity",
    titleCn: "品牌识别",
    descEn: "Your users are our users. We design with a user-centric approach, ensuring a smooth digital experience that not only looks great but functions seamlessly.",
    descCn: "您的用户就是我们的用户。我们以用户为中心进行设计，确保提供流畅的数字化体验，不仅外观精美，而且使用起来也十分顺畅。",
    tagsEn: ["Logo Design", "Visual Identity", "Social Media Design", "Marketing Design", "Motion Graphics"],
    tagsCn: ["标志设计", "视觉识别", "社交媒体", "营销设计", "动态图形"]
  },
  {
    id: "serv-2",
    num: "02",
    titleEn: "Product Packaging",
    titleCn: "产品包装",
    descEn: "From concept to shelf, we craft eye-catching packaging designs. Integrating market insights and brand narratives, we build physical connections with consumers.",
    descCn: "从概念到货架，我们为您打造引人注目的包装设计。结合市场洞察与品牌故事，从物理层面建立用户连接。",
    tagsEn: ["Box Design", "Bottle Design", "Label Design", "E-commerce Packaging", "Display Design"],
    tagsCn: ["礼盒设计", "瓶型设计", "标签设计", "电商包材", "陈列设计"]
  },
  {
    id: "serv-3",
    num: "03",
    titleEn: "UI & Product Experience Design",
    titleCn: "UI&用户体验设计",
    descEn: "We build elegant, fully functional digital interfaces. With in-depth user research and prototype testing, we ensure every interaction is intuitive and efficient.",
    descCn: "打造美观且功能强大的数字接口。我们通过深入的用户研究和原型测试，确保每一个交互都直观高效。",
    tagsEn: ["App Design", "Web Platforms", "Dashboard UI", "Design Systems", "User Flows"],
    tagsCn: ["APP界面", "网页平台", "仪表盘设计", "设计系统", "用户流"]
  },
  {
    id: "serv-4",
    num: "04",
    titleEn: "Website Design",
    titleCn: "网站设计",
    descEn: "We build responsive, high-performance brand websites. We deliver striking visuals while prioritizing SEO optimization and conversion rate growth.",
    descCn: "构建响应式、高性能的品牌官网。不仅追求视觉上的震撼，更注重SEO优化与转化率提升。",
    tagsEn: ["Responsive Design", "Brand Sites", "Landing Pages", "Interaction Design"],
    tagsCn: ["响应式设计", "品牌官网", "落地页", "交互设计"]
  },
  {
    id: "serv-5",
    num: "05",
    titleEn: "PPT System",
    titleCn: "PPT制作",
    descEn: "Boost your persuasion in business. We create professional, unified and compelling presentation documents to help you succeed in speeches and proposals.",
    descCn: "提升您的商务说服力。我们为您打造专业、统一且具有感染力的演示文稿制度，助您在演讲和提案中胜出。",
    tagsEn: ["Business Plans", "Branding", "Conferences & Launch Events", "Template Customization", "Data Visualization", "Chart Design"],
    tagsCn: ["商业计划书", "品牌", "年会发布会", "模板定制", "数据可视化", "图表设计"]
  },
  {
    id: "serv-6",
    num: "06",
    titleEn: "Commercial Visual Design",
    titleCn: "商业视觉设计",
    descEn: "Inject sales momentum into your brand. With exquisite page layouts and communication materials, we grab audience attention amid cluttered markets and drive business growth.",
    descCn: "为品牌注入销售动力。通过精美的页面设计和传播素材，在纷杂的市场中捕捉目光，驱动业务增长。",
    tagsEn: ["E-commerce Images", "Product Detail Page", "Promotional Posters", "Key Visuals", "Advertising Creatives", "Campaign Pages", "Live Streaming Design"],
    tagsCn: ["电商图", "详情页", "推广海报", "KV主视觉", "广告创意", "活动页", "直播设计"]
  }
];

export default function Services() {
  const { t } = useLanguage();
  // Set default opened index to 0 (BRAND IDENTITY) matching the reference screenshot design
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="services-section" 
      className="w-full bg-white max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Side: Massive Bold Elegant Title */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between pt-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-neutral-900 leading-[0.95] select-none text-left">
            {t(
              "为您品牌\n提供的一切\n所需。",
              "EVERYTHING\nYOUR BRAND\nNEEDS."
            ).split('\n').map((line, idx) => (
              <span key={idx} className="block last:text-neutral-500">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Right Side: Foldable Accordion List */}
        <div className="lg:col-span-7 w-full border-t border-neutral-100">
          {SERVICES_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={item.id} 
                id={`service-item-${item.num}`}
                className="border-b border-neutral-100 overflow-hidden"
              >
                {/* Header Row - Padding increased 40% for vertical spacing (py-2 [8px] -> py-[11.2px], sm:py-2.5 [10px] -> sm:py-[14px]) */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-[11.2px] sm:py-[14px] flex items-center justify-between text-left focus:outline-none cursor-pointer group transition-colors hover:bg-neutral-50/55 px-2 -mx-2"
                  aria-expanded={isOpen}
                  aria-controls={`service-content-${item.num}`}
                >
                  <div className="flex items-center gap-6 sm:gap-12 pl-2">
                    {/* Number Indicator - Scaled up by 15% (10.625px -> 12.21875px) */}
                    <span className="text-[12.21875px] font-mono font-medium text-neutral-400 select-none">
                      {item.num}
                    </span>
                    {/* Title - Scaled up by 15% (11.875px -> 13.65625px, and sm:12.5px -> sm:14.375px) */}
                    <h3 className="text-[13.65625px] sm:text-[14.375px] font-semibold tracking-wider text-neutral-900 hover:text-neutral-800 transition-colors uppercase font-sans">
                      {t(item.titleCn, item.titleEn)}
                    </h3>
                  </div>

                  {/* Expand/Collapse Chevron Indicator */}
                  <ChevronDown 
                    className={`w-5 h-5 shrink-0 text-neutral-400 group-hover:text-neutral-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-neutral-800" : ""
                    }`}
                  />
                </button>

                {/* Animated Foldable Content Area */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-content-${item.num}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 }
                        }
                      }}
                    >
                      {/* Inner block - bottom padding increased by 20% (pb-3 [12px] -> pb-[14.4px]), space-y increased by 20% (space-y-2 [8px] -> space-y-[9.6px]) */}
                      <div className="pl-14 sm:pl-24 pr-2 pb-[14.4px] flex flex-col space-y-[9.6px] select-text">
                        {/* Description text - Scaled up by 15% (10.625px -> 12.21875px, and md:11.25px -> md:12.9375px) */}
                        <p className="text-neutral-500 font-sans text-[12.21875px] md:text-[12.9375px] leading-relaxed max-w-xl font-normal">
                          {t(item.descCn, item.descEn)}
                        </p>

                        {/* Tag badges */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(t(item.tagsCn, item.tagsEn) as string[]).map((tag, tIdx) => (
                            <span 
                              key={tIdx}
                              className="text-[9.34375px] md:text-[10.0625px] font-mono tracking-wide font-medium bg-neutral-900/[0.035] text-neutral-600 rounded-full px-2.5 py-0.5 transition-all duration-200 hover:bg-neutral-900/[0.07] hover:text-neutral-900 select-none border border-neutral-900/[0.02]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
