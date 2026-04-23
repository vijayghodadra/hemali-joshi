"use client";
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";

const FLAG_LOCATIONS = [
    { name: "INDIA", position: [-2.5, 0, 0], flag: "https://flagcdn.com/w160/in.png" },
    { name: "USA", position: [-0.85, 0, 0], flag: "https://flagcdn.com/w160/us.png" },
    { name: "UK", position: [0.85, 0, 0], flag: "https://flagcdn.com/w160/gb.png" },
    { name: "DUBAI", position: [2.5, 0, 0], flag: "https://flagcdn.com/w160/ae.png" },
];

// import { useThree } from "@react-three/fiber"; // useThree removed

function Model() {
    // const { scene } = useGLTF("/mapp.glb");
    // const viewport = useThree((state) => state.viewport);
    // // Detect mobile by viewport width - adjusted threshold
    // const isMobile = viewport.width < 5;
    // const scale = isMobile ? 3.5 : 5; // Smaller base but relative to viewport
    // const positionY = isMobile ? -0.5 : -1;

    // Just return null - flags will orbit around empty space (0,0,0)
    return null;
}

// Custom Shader Material for Waving Flag
const FlagMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.Texture() },
        uSpeed: { value: 2.0 }, // Control wave speed
        uAmplitude: { value: 0.1 }, // Control wave height
        uFrequency: { value: 3.0 }, // Control wave tightness
        uWindStrength: { value: 0.1 } // Control sideways deflection
    },
    vertexShader: `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uAmplitude;
        uniform float uFrequency;
        uniform float uWindStrength;

        varying vec2 vUv;
        varying float vElevation;

        void main() {
            vUv = uv;

            vec3 pos = position;
            
            // Calculate distance from the left edge (width 1.6, left edge is at x = -0.8)
            float distFromLeft = pos.x + 0.8;
            
            // Primary wave moving along X - starting from left edge
            float wave = sin((pos.x + 0.8) * uFrequency - uTime * uSpeed);
            
            // Secondary ripple for complexity
            float ripple = cos(pos.y * 5.0 - uTime * 3.0) * 0.3;
            
            // Combine waves and apply amplitude based on distance from left edge
            // Keep the left edge mostly fixed
            float displacement = (wave + ripple) * uAmplitude * smoothstep(0.0, 1.0, distFromLeft);
            
            // Subtle Z-bend to simulate wind volume
            pos.z += displacement;
            
            // Slight Y-deflection
            pos.y += sin(uTime * 1.5) * 0.05 * distFromLeft;
            
            vElevation = displacement; // Pass to fragment shader for shading
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
            vec4 textureColor = texture2D(uTexture, vUv);
            
            // Simple lighting based on wave height (vElevation)
            float shadow = 1.0 - smoothstep(-0.2, 0.2, vElevation) * 0.15;
            float highlight = smoothstep(0.0, 0.2, vElevation) * 0.15;
            
            // Enhance brightness slightly
            vec3 finalColor = textureColor.rgb * shadow + highlight;
            finalColor *= 1.1; // Boost overall brightness
            
            gl_FragColor = vec4(finalColor, textureColor.a);
        }
    `
};

import { useRouter } from "next/navigation";

function WavingFlag({ position, name, flagUrl }: { position: [number, number, number], name: string, flagUrl: string }) {
    const texture = useTexture(flagUrl);
    const materialRef = React.useRef<THREE.ShaderMaterial>(null);
    const router = useRouter();

    // Randomize start time for variation
    const [offset] = React.useState(() => Math.random() * 100);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime + offset;
        }
    });

    const shaderData = React.useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uSpeed: { value: 3.0 },
            uAmplitude: { value: 0.15 },
            uFrequency: { value: 4.0 },
            uWindStrength: { value: 0.1 }
        },
        vertexShader: FlagMaterial.vertexShader,
        fragmentShader: FlagMaterial.fragmentShader,
        side: THREE.DoubleSide
    }), [texture]);

    const handleFlagClick = () => {
        router.push("/tours");
    };

    return (
        <group
            position={position}
            onClick={handleFlagClick}
            onPointerOver={() => document.body.style.cursor = "pointer"}
            onPointerOut={() => document.body.style.cursor = "auto"}
        >
            {/* Flag Pole */}
            <mesh position={[-0.52, -0.6, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 1.3, 8]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Pole Top Ball */}
            <mesh position={[-0.52, 0.06, 0]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="gold" metalness={1} roughness={0.1} />
            </mesh>

            {/* The Flag Mesh */}
            <mesh position={[0, 0, 0]}>
                {/* High segment count for smooth wave */}
                <planeGeometry args={[1, 0.6, 32, 20]} />
                <shaderMaterial ref={materialRef} attach="material" args={[shaderData]} />
            </mesh>

            {/* Floating Label */}
            <Html position={[0, -0.6, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFlagClick();
                    }}
                    className="bg-black/80 backdrop-blur-sm border border-gold/30 px-3 py-1 rounded-full text-[10px] md:text-sm font-bold text-gold uppercase tracking-widest shadow-lg whitespace-nowrap cursor-pointer hover:bg-gold/20 transition-colors"
                >
                    {name}
                </div>
            </Html>
        </group>
    );
}

function Marker({ position, name, flag }: { position: [number, number, number], name: string, flag: string }) {
    return <WavingFlag position={position} name={name} flagUrl={flag} />;
}

export default function WorldMap3D() {
    return (
        <div className="w-full h-full relative">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />

                {/* Enhanced Cinematic Lighting */}
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={3} castShadow />
                <pointLight position={[-10, 5, -5]} intensity={2} color="#FFD700" />
                <pointLight position={[0, -5, 5]} intensity={1} color="#444" />

                <Suspense fallback={<Html center><div className="text-gold animate-pulse font-serif tracking-widest uppercase text-sm">Crafting World...</div></Html>}>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                        <Model />
                        {FLAG_LOCATIONS.map((loc) => (
                            <Marker key={loc.name} {...loc as any} />
                        ))}
                    </Float>
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enableRotate={false} /* Locked View */
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}
