"use client";

import { useState } from "react";
import clsx from "clsx";
import CoreProcessor from "@/components/CoreProcessor";
import SystemHealth from "@/components/SystemHealth";
import SystemLogs from "@/components/SystemLogs";
import MicroservicesMap from "@/components/MicroservicesMap";
import BootSequence from "@/components/BootSequence";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      
      <main className={clsx(
        "min-h-screen py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-center transition-opacity duration-1000",
        bootComplete ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      )}>
      {/* Top Section: Bio & Skills */}
      <div className="w-full flex flex-col xl:flex-row gap-8 justify-center items-stretch">
        <div className="flex-1 flex flex-col items-center xl:items-end justify-start pr-0 xl:pr-4">
           <CoreProcessor />
           <SystemHealth />
        </div>
        
        {/* Right side Terminal */}
        <div className="flex-1 flex flex-col items-center xl:items-start justify-start pl-0 xl:pl-4">
          <SystemLogs />
        </div>
      </div>

      {/* Bottom Section: Map */}
      <div className="w-full mt-16 max-w-5xl">
        <MicroservicesMap />
      </div>
      
      {/* Footer Branding */}
      <div className="mt-20 pb-8 text-center opacity-50 font-mono text-xs">
        <p className="text-tech-cyan">{"// SYSTEM_SHUTDOWN == FALSE"}</p>
        <p className="mt-2 text-foreground">v1.0.0 © Al Shahriah {new Date().getFullYear()}</p>
      </div>
    </main>
    </>
  );
}
