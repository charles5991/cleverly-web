import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "ROAS CALCULATOR", href: "/projects" },
  { name: "SERP PREVIEW", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-white via-zinc-100/20 to-white">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-black hover:text-black"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-black cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Cleverly
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="mx-60 my-10 text-center animate-fade-in ">
        <h2 className="text-sm text-black ">YOUR SEARCH ENDS HERE!</h2>
        <h2 className="text-sm text-black ">
          Contact us today, or view the services we have to offer!
        </h2>
      </div>
    </div>
  );
}
