"use client";

import { useEffect, useRef, useState } from "react";
import { FadeInUp } from "@/components";

const stats = [
	{
		value: 500,
		suffix: "+",
		label: "Projects Delivered",
		description: "Across 20+ industries worldwide",
	},
	{
		value: 98,
		suffix: "%",
		label: "Client Satisfaction",
		description: "Based on post-project surveys",
	},
	{
		value: 50,
		suffix: "M+",
		label: "Data Points Processed",
		description: "Through our AI pipelines daily",
	},
	{
		value: 24,
		suffix: "/7",
		label: "Support Available",
		description: "Enterprise-grade assistance",
	},
];

function AnimatedCounter({
	value,
	suffix,
	duration = 2000,
}: {
	value: number;
	suffix: string;
	duration?: number;
}) {
	const [count, setCount] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					setHasAnimated(true);
					let start = 0;
					const end = value;
					const increment = end / (duration / 16);
					const timer = setInterval(() => {
						start += increment;
						if (start >= end) {
							setCount(end);
							clearInterval(timer);
						} else {
							setCount(Math.floor(start));
						}
					}, 16);
				}
			},
			{ threshold: 0.5 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [value, duration, hasAnimated]);

	return (
		<span ref={ref}>
			{count}
			{suffix}
		</span>
	);
}

export default function Stats() {
	return (
		<section className="py-12 sm:py-14 md:py-20 px-4 sm:px-6 bg-white border-y border-gray-100">
			<div className="max-w-6xl mx-auto">
				<FadeInUp>
					<div className="text-center mb-8 sm:mb-10">
						<span className="text-zen font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] mb-2 block">
							By The Numbers
						</span>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
							Proven Results at Scale
						</h2>
					</div>
				</FadeInUp>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{stats.map((stat, index) => (
						<FadeInUp key={index}>
							<div className="text-center p-4 sm:p-6 bg-white rounded-xl border-2 border-black">
								<div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zen mb-2 sm:mb-3">
									<AnimatedCounter value={stat.value} suffix={stat.suffix} />
								</div>
								<h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
									{stat.label}
								</h3>
								<p className="text-[10px] sm:text-xs text-gray-500">
									{stat.description}
								</p>
							</div>
						</FadeInUp>
					))}
				</div>
			</div>
		</section>
	);
}
