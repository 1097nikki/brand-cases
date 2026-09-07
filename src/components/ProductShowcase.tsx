import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ROW1_IMAGES = [
  "https://bee-reg-ab.imagency.cn/mr/5553/26/c967a2e668efb51ea8882666c281f317.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/ead09f41e1b6a974e275917173097806.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/7cf3f1d3a441aaa728ca6299b4018fbb.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/488372ad5b5de3bb79346c648133300f.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/f6af01daef3a7a5ef6ce15588d5b617e.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/721f566bd2c56181bf4069b0e122e938.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/99394137aec5303d500a83aa5fe419ed.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/a4afe3d17d91377f2a2be39174abcf2a.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/635e73642e4233d510a66d0372093072.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/a5b9c724590237e7701f426732acfd54.jpg"
];

const ROW2_IMAGES = [
  "https://bee-reg-ab.imagency.cn/mr/5553/26/e0349fb05a31fcc26f473f7d078e1455.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/2c6616454ea945969967b5885cdf2708.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/97b74da2dcb5ad7dd0470bbd621b2471.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/c2ae705c1c83e746570d93752cac4d0c.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/1e82e173bdbda841ebba5b0731e065d9.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/b7e19016a21a34d049dce3084b74679b.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/0d23ee9664eb73cdc4a5c602d8971d07.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/673bc5e3bc08eda369046a5714d74781.jpg",
  "https://bee-reg-ab.imagency.cn/mr/5553/26/6191d96f7cc4a59183fea9d970b50417.jpg",
  "https://bee-reg-ac.imagency.cn/jc/5553/26/f54385f00be1945639518452143b412d.jpg"
];

export default function ProductShowcase() {
  const { t } = useLanguage();

  // We loop the arrays twice to create seamless continuous scrolling
  const loopRow1 = [...ROW1_IMAGES, ...ROW1_IMAGES];
  const loopRow2 = [...ROW2_IMAGES, ...ROW2_IMAGES];

  return (
    <section 
      id="product-showcase-section"
      className="w-full bg-white select-none py-12 md:py-16 overflow-hidden"
    >
      {/* Self-contained high-performance marquee keyframes */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 38s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
        }
        /* Pause scroll on hover of a specific row */
        .marquee-row:hover .animate-marquee-left,
        .marquee-row:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Block Header Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100 pb-4 mb-8">
        <h3 className="font-sans text-3xl sm:text-4xl tracking-tight font-medium text-neutral-900">
          {t('产品展示', 'Product Showcase')}
        </h3>
      </div>

      {/* Horizontal Stretchy Full Bleed Slider Columns */}
      <div className="w-full flex flex-col gap-[0.1cm] marquee-wrapper">
        
        {/* Row 1: Leftward rolling stream */}
        <div className="w-full overflow-hidden flex whitespace-nowrap marquee-row">
          <div className="animate-marquee-left flex gap-[0.1cm]">
            {loopRow1.map((imgUrl, idx) => (
              <div 
                key={`row1-${idx}`} 
                className="w-[200px] sm:w-[260px] aspect-square bg-[#fcfcfc] overflow-hidden flex-shrink-0 cursor-default select-none rounded-none"
              >
                <img
                  src={imgUrl}
                  alt={`Product Showcase item ${idx}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Unified leftward rolling stream */}
        <div className="w-full overflow-hidden flex whitespace-nowrap marquee-row">
          <div className="animate-marquee-left flex gap-[0.1cm]">
            {loopRow2.map((imgUrl, idx) => (
              <div 
                key={`row2-${idx}`} 
                className="w-[200px] sm:w-[260px] aspect-square bg-[#fcfcfc] overflow-hidden flex-shrink-0 cursor-default select-none rounded-none"
              >
                <img
                  src={imgUrl}
                  alt={`Product Showcase item ${idx}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
