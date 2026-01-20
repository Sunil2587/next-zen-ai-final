import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLandmarkDome,
  faMicroscope,
  faGear,
  faTruckRampBox,
} from "@fortawesome/free-solid-svg-icons";

const industries = [
  { icon: faLandmarkDome, name: "Finance & PE" },
  { icon: faMicroscope, name: "Pharma & Healthcare" },
  { icon: faGear, name: "Manufacturing" },
  { icon: faTruckRampBox, name: "Logistics" },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="py-10 sm:py-12 md:py-16 bg-white border-y border-gray-100 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2">
            Market Verticals
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
            Serving 20+ Global Industries
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="p-5 md:p-6 bg-gray-50 border border-gray-100 rounded-xl text-center group hover:bg-black hover:border-black transition-all duration-300">
              <FontAwesomeIcon
                icon={industry.icon}
                className="text-zen text-xl md:text-2xl mb-3 md:mb-4 transition-transform group-hover:scale-110"
              />
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
