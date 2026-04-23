"use client";

import React from "react";

const SecurityWatermark = () => {
    // Create a grid of watermarks
    const rows = 10;
    const cols = 6;
    const watermarkText = "© Himali Joshi";

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex flex-col justify-between opacity-[0.03] select-none">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-around w-[120%] -ml-[10%]">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className="transform -rotate-45 text-white/50 text-xl font-bold whitespace-nowrap"
                            style={{
                                marginLeft: rowIndex % 2 === 0 ? "0px" : "50px", // Stagger rows
                            }}
                        >
                            {watermarkText}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SecurityWatermark;
