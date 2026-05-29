"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDevicePower, DevicePower } from "@/utils/devicePower";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), { ssr: false });
const LiquidBackground = dynamic(() => import("@/components/LiquidBackground"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function ClientGlobalEffects() {
    const [power, setPower] = useState<DevicePower>("high");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const currentPower = getDevicePower();
        setPower(currentPower);
        setMounted(true);
        if (currentPower === "low") {
            document.body.classList.add("low-power");
        } else {
            document.body.classList.remove("low-power");
        }
    }, []);

    if (!mounted) return <WhatsAppButton />;

    return (
        <>
            {/* Only render heavy effects on high-power (desktop) devices */}
            {power === "high" && <LiquidBackground />}
            {power === "high" && <SplashCursor />}
            <WhatsAppButton />
        </>
    );
}
