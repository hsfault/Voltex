"use client";

import { MotionConfig } from "framer-motion";
import LenisProvider from "./LenisProvider";
import Splash from "./Splash";
import GarageDrawer from "./GarageDrawer";
import { IntroProvider } from "@/context/IntroContext";
import { GarageProvider } from "@/context/GarageContext";

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <IntroProvider>
          <GarageProvider>
            <Splash />
            {children}
            <GarageDrawer />
          </GarageProvider>
        </IntroProvider>
      </LenisProvider>
    </MotionConfig>
  );
}