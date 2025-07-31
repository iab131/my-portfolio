import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-slate-900 flex justify-center items-center flex-col overflow mx-auto ">
      <div className=" w-full dark">
        <Hero />
      </div>
    </main>
  );
}
