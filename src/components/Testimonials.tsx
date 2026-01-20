"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    quote:
      "Next Zen AI transformed our data infrastructure completely. Their team delivered an AI-powered analytics platform that reduced our decision-making time by 60%.",
    author: "Sarah Mitchell",
    role: "CTO",
    company: "TechVentures Inc.",
    rating: 5,
  },
  {
    quote:
      "The cloud migration was seamless. They handled everything from planning to execution, and we saw a 40% reduction in infrastructure costs within the first quarter.",
    author: "Michael Chen",
    role: "VP of Engineering",
    company: "GlobalFinance Corp",
    rating: 5,
  },
  {
    quote:
      "Their cybersecurity audit revealed vulnerabilities we didn't know existed. The zero-trust framework they implemented has given us peace of mind and regulatory compliance.",
    author: "Jennifer Rodriguez",
    role: "CISO",
    company: "HealthTech Solutions",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2 block">
              Client Success
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2 sm:mb-3">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Don't just take our word for it. Here's what our clients have to
              say about working with us.
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeInUp key={index}>
              <div className="card-container p-5 sm:p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-zen text-xs sm:text-sm"
                    />
                  ))}
                </div>

                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-black text-2xl sm:text-3xl mb-4"
                />

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zen rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm sm:text-base">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-[10px] sm:text-xs">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
