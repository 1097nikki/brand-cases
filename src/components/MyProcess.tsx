import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MyProcess() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      titleCn: "发现",
      titleEn: "DISCOVERY",
      descCn: "通过深入沟通，挖掘品牌核心价值与用户真实需求，确保后期方向偏差零风险。",
      descEn: "Uncover core brand values and real user needs through deep collaboration to eliminate alignment risks."
    },
    {
      num: "02",
      titleCn: "规划",
      titleEn: "PLANNING",
      descCn: "明确项目定位，制定清晰的执行策略、信息架构与可衡量的阶段里程碑规划。",
      descEn: "Establish project positioning, define logical information architecture, and set measurable milestones."
    },
    {
      num: "03",
      titleCn: "设计与交付",
      titleEn: "DESIGN & DELIVERY",
      descCn: "终审全套设计方案，输出规范、切图等完整物料，协同开发无缝落地还原。",
      descEn: "Finalize the complete design system, output full assets like specs and slices, and collaborate with developers for seamless implementation."
    },
    {
      num: "04",
      titleCn: "发布与优化",
      titleEn: "LAUNCH & OPTIMIZATION",
      descCn: "上线监测与用户体验，定期优化视觉、交互、性能，迭代升级。",
      descEn: "Monitor launch and user experience, optimize visuals, interaction, and performance periodically, and iterate for continuous upgrades."
    }
  ];

  return (
    <section 
      id="process-section" 
      className="w-full bg-white max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Side: Category Header and Title */}
        <div className="lg:col-span-5 flex flex-col pt-1">
          {/* Small Category Label */}
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-neutral-400 uppercase mb-3 block">
            {t("我的工作方式", "MY PROCESS")}
          </span>
          {/* Big Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-neutral-900 leading-[0.95] select-none text-left">
            {t(
              "从概念到发布，\n一步一步来。",
              "FROM CONCEPT\nTO LAUNCH,\nSTEP BY STEP."
            ).split('\n').map((line, idx) => (
              <span key={idx} className="block last:text-neutral-500">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Right Side: Step Items with Dividers */}
        <div className="lg:col-span-7 w-full border-t border-neutral-100 divide-y divide-neutral-100">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-12 transition-colors duration-300 hover:bg-[#fcfcfc] px-2 -mx-2"
            >
              {/* Number and Title */}
              <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                <span className="text-[12px] sm:text-[13px] font-mono font-semibold text-neutral-400 select-none w-6">
                  {step.num}
                </span>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-neutral-900 uppercase font-sans shrink-0 min-w-[100px] sm:min-w-[140px]">
                  {t(step.titleCn, step.titleEn)}
                </h3>
              </div>

              {/* Description Body */}
              <p className="text-neutral-500 font-sans text-xs md:text-[13px] leading-relaxed font-normal flex-grow select-text">
                {t(step.descCn, step.descEn)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
