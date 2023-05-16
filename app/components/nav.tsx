"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "@radix-ui/react-slider";
import { Line } from "react-chartjs-2";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Link
              href="/projects"
              className="duration-200 text-gray-700 hover:text-gray-900"
            >
              ROAS
            </Link>
            <Link
              href="/contact"
              className="duration-200 text-gray-700 hover:text-gray-900"
            >
              SERP
            </Link>
          </div>

          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <img src="./cleverlyLogo.png" width={125}></img>
          </Link>
        </div>
      </div>
    </header>
  );
};
