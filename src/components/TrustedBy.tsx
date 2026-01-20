"use client";

import { FadeInUp } from "@/components";

const clients = [
  { name: "Microsoft", logo: "M" },
  { name: "Amazon", logo: "A" },
  { name: "Google", logo: "G" },
  { name: "Salesforce", logo: "S" },
  { name: "Oracle", logo: "O" },
  { name: "IBM", logo: "I" },
  { name: "Cisco", logo: "C" },
  { name: "Dell", logo: "D" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-slate-500 font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px]">
              Trusted by Leading Enterprises
            </span>
          </div>
        </FadeInUp>

        <FadeInUp>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group flex items-center justify-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 hover:text-zen hover:border-zen/30 transition-all duration-300 group-hover:bg-zen/5">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black">
                    {client.logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp>
          <p className="text-center text-slate-600 text-xs sm:text-sm mt-8 sm:mt-12">
            Join 500+ enterprises accelerating their digital transformation
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

