import React from 'react';

export default function AestheticGrid() {
  const images = [
    "https://bee-reg-ab.imagency.cn/mr/5553/26/6744259370c8dfb16c75e21967638706.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/436401148045cda27713f263992d33b6.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/87e2bbc658f1e6a4985d52590ccf49c5.jpg",
    "https://bee-reg-ab.imagency.cn/mr/5553/26/f94de3f07b2c744733fdcc5a5c1355a3.jpg"
  ];

  return (
    <section 
      id="aesthetic-grid-section" 
      className="w-full bg-white max-w-7xl mx-auto px-6 md:px-12 select-none"
    >
      <div className="grid grid-cols-2 gap-[0.1cm] w-full">
        {images.map((src, index) => (
          <div 
            key={index} 
            id={`aesthetic-card-${index + 1}`}
            className="relative w-full aspect-[1685/1745] overflow-hidden p-0 m-0 bg-neutral-100"
          >
            <img 
              src={src} 
              alt={`Aesthetic image ${index + 1}`} 
              className="w-full h-full object-cover p-0 m-0 border-0 outline-none block"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
