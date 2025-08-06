import React from "react";
import { socialMedia } from "@/lib/constants";
import { BackgroundBeams } from "./ui/background-beams";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant, zoomIn } from "@/lib/motion";
const Footer = () => {
  return (
    <footer className="w-full text-white">
      {/* ── Hero / CTA ───────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated beams stay pinned */}
        <BackgroundBeams />
        <div className="relative z-10 flex flex-col items-center pt-[30vh]">
          {/* Heading + button */}
          <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-b from-slate-100 to-slate-500 bg-clip-text text-transparent">
              Have a wild project you can&apos;t stop thinking about?
            </h2>

            <a
              href="mailto:e8bai@uwaterloo.ca"
              className="inline-flex rounded-4xl bg-gradient-to-r from-emerald-400 to-cyan-500 p-[4px] transition-transform hover:scale-105 group"
            >
              <span className="px-8 py-3 bg-slate-900 rounded-3xl transition-colors group-hover:bg-transparent font-semibold text-slate-50">
                Let&apos;s get in touch
              </span>
            </a>
            <span className="text-sm sm:text-md text-slate-400 mt-2 block">
              Or email me manually at{" "}
              <span className="underline font-semibold">
                enhe.bai@uwaterloo.ca
              </span>
            </span>
          </div>
          {/* ── bottom bar, now fixed to the bottom ────── */}
        </div>
      </section>
      <div className="absolute inset-x-0 bottom-10 px-6">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 text-sm text-slate-400">
          <p>© 2025 Enhe. All rights reserved.</p>

          <ul className="flex gap-4">
            {socialMedia.map(({ id, link, img }) => (
              <li key={id}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-15 h-15 rounded-3xl border border-slate-700/60
                         bg-slate-700/40 backdrop-blur-md transition
                         hover:bg-slate-400/70 focus-visible:outline-purple-400"
                >
                  <img src={img} alt={`${id} icon`} width={30} height={30} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
