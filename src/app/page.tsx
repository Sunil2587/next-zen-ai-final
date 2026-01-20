"use client";

import {
  Header,
  Hero,
  Marquee,
  WhatWeDo,
  WhoWeAre,
  IndustriesWeServe,
  WhyChooseUs,
  HowWeTransform,
  WhatWeThink,
  Contact,
  Footer,
  Background,
} from "@/components";

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <WhatWeDo />
        <WhoWeAre />
        <IndustriesWeServe />
        <WhyChooseUs />
        <HowWeTransform />
        <WhatWeThink />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

