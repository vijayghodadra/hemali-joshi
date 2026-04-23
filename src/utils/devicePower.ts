/**
 * Utility to detect the device's processing power based on hardware concurrency.
 * This is used to serve optimized assets (low-res videos, reduced animations) 
 * to low-end devices or mobile phones.
 */

export type DevicePower = "low" | "high";

export function getDevicePower(): DevicePower {
    if (typeof window === "undefined") return "high"; // Default for SSR

    // navigator.hardwareConcurrency gives the number of logical processors.
    // Generally, mobile devices and old laptops have 2-4 cores.
    // Modern high-performance laptops have 8+.
    const cores = window.navigator.hardwareConcurrency || 4;
    
    // We can also check for mobile user agents as an additional hint
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
    );

    // If it's a mobile device or has few cores, we treat it as "low" power 
    // to prioritize smoothness over high-res video.
    if (isMobile || cores <= 4) {
        return "low";
    }

    return "high";
}
