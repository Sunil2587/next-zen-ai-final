"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserGroup,
  faPaperPlane,
  faLocationDot,
  faPhone,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { FadeInUp } from "@/components";
import { submitContactForm } from "@/lib/supabase";

const officeLocations = {
  usa: {
    name: "United States",
    company: "Next Zen AI Strategix",
    address: "97 Newkirk Street, Suite 341",
    city: "Jersey City, NJ 07306",
    country: "United States",
  },
  india: {
    name: "India",
    company: "Nextzen AI Strategix Private Limited",
    address: "4th Floor, Aparna Astute, Jubilee Hills",
    city: "Shaikpet, Hyderabad, Telangana 500096",
    country: "India",
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "AI Strategy & Consulting",
    details: "",
  });

  const [selectedOffice, setSelectedOffice] = useState<"usa" | "india">("usa");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: submitError } = await submitContactForm({
      name: formData.name,
      email: formData.email,
      interest: formData.interest,
      details: formData.details,
    });

    if (submitError) {
      setError("There was an error sending your message. Please try again.");
      console.error(submitError);
    } else {
      setSubmitted(true);
      setFormData({ name: "", email: "", interest: "AI Strategy & Consulting", details: "" });
    }

    setSubmitting(false);
  };

  const currentOffice = officeLocations[selectedOffice];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              Ready to Transform?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              Connect with our strategy leads for a technical audit or
              deployment roadmap.
            </p>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-2 space-y-4">
            <FadeInUp>
              <div className="flex items-center space-x-4 p-5 md:p-6 bg-black rounded-lg">
                <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
                    General / Strategy
                  </p>
                  <p className="text-sm md:text-base font-bold text-white">
                    info@nextzenaistrategix.com
                  </p>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="p-5 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
                    <FontAwesomeIcon icon={faPhone} className="text-lg" />
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                    Contact
                  </p>
                </div>

                {/* Toggle Buttons for Phone */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedOffice("usa")}
                    className={`flex-1 py-2.5 px-4 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all ${
                      selectedOffice === "usa"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    USA
                  </button>
                  <button
                    onClick={() => setSelectedOffice("india")}
                    className={`flex-1 py-2.5 px-4 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all ${
                      selectedOffice === "india"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    India
                  </button>
                </div>

                <div className="text-left">
                  <p className="text-sm md:text-base font-bold text-black">
                    {selectedOffice === "usa" ? "+1 (551) 371-2342" : "+91 93987 49595"}
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Office Location Selector */}
            <FadeInUp>
              <div className="p-5 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
                    <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                  </div>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                    Office Locations
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedOffice("usa")}
                    className={`flex-1 py-2.5 px-4 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all ${
                      selectedOffice === "usa"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    USA
                  </button>
                  <button
                    onClick={() => setSelectedOffice("india")}
                    className={`flex-1 py-2.5 px-4 rounded-md font-bold uppercase tracking-widest text-[10px] transition-all ${
                      selectedOffice === "india"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    }`}
                  >
                    India
                  </button>
                </div>

                {/* Address Display */}
                <div className="text-left space-y-1">
                  <p className="text-black font-bold text-sm">
                    {currentOffice.company}
                  </p>
                  <p className="text-gray-500 text-sm">{currentOffice.address}</p>
                  <p className="text-gray-500 text-sm">{currentOffice.city}</p>
                  <p className="text-gray-500 text-sm">{currentOffice.country}</p>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-3">
            <FadeInUp>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 md:p-10">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-black placeholder:text-gray-400 focus:outline-none focus:border-zen focus:ring-0 transition-colors"
                        placeholder="Jane Doe"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-black placeholder:text-gray-400 focus:outline-none focus:border-zen focus:ring-0 transition-colors"
                        placeholder="jane@company.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Interest Area
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-black focus:outline-none focus:border-zen focus:ring-0 transition-colors appearance-none cursor-pointer"
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                    >
                      <option>AI Strategy & Consulting</option>
                      <option>Data & Analytics</option>
                      <option>Cloud Migration</option>
                      <option>Cybersecurity Audit</option>
                      <option>Custom Development</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-black placeholder:text-gray-400 focus:outline-none focus:border-zen focus:ring-0 transition-colors resize-none"
                      placeholder="Briefly describe your objectives..."
                      required
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-md text-center">
                      <FontAwesomeIcon icon={faCheck} className="mr-2" />
                      Message sent successfully! We'll be in touch soon.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-black text-white py-4 rounded-md font-bold uppercase text-xs sm:text-sm tracking-[0.2em] flex items-center justify-center group hover:bg-gray-900 transition-colors disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} className="mr-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Dispatch Message
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  )}
                </form>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}

