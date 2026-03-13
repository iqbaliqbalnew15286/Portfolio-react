import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";

// =======================================================
// PALET WARNA SKENA MUSIK ROCK/ALT (Modern tapi Aga Tua)
// =======================================================
const mainColor = "#66504A"; // Deep Rocker Red / Industrial Brown
const accentColor = "#B0B0A3"; // Aged Copper / Patina Brass
const darkMetal = "#363636"; // Weathered Iron (untuk sendi & detail)
const whiteColor = "#F0F0EE"; // Off-White (untuk detail customized)
const neonGlow = "#00FFFF"; // Cyan Neon (untuk lampu indikator)
const blackGlass = "#111111"; // Distressed Visor Kaca

// =======================================================
// KOMPONEN MODEL ROBOT MODERN-TUA GAYA ANAK BAND
// =======================================================
const ModernRockerRobot = () => {
  return (
    // Efek Float: Membuat seluruh tubuh robot melayang/bernapas halus
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <group position={[0, 0.5, 0]}>
        
        {/* --- KEPALA VISOR DENGAN GRILLE SPEAKER (Gaya Anak Band) --- */}
        <group position={[0, 1.4, 0]}>
          {/* Cangkang Kepala (Aged Brown) */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.1, 1.2]} />
            <meshStandardMaterial color={mainColor} metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Layar/Visor Depan (Kaca Distressed) */}
          <mesh position={[0, 0, 0.61]}>
            <boxGeometry args={[1.3, 0.8, 0.05]} />
            <meshStandardMaterial color={blackGlass} metalness={1} roughness={0.1} />
          </mesh>

          {/* Grille Speaker di Visor (Gaya Skene Musik) */}
          <mesh position={[0, 0, 0.64]}>
            <boxGeometry args={[1.2, 0.6, 0.02]} />
            <meshBasicMaterial color={whiteColor} />
          </mesh>

          {/* Mata Glow (LED menyala kecil Cyan) - Mata Kiri */}
          <mesh position={[-0.3, 0.05, 0.67]}>
            <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
            <meshBasicMaterial color={neonGlow} />
          </mesh>

          {/* Mata Glow (LED menyala kecil Cyan) - Mata Kanan */}
          <mesh position={[0.3, 0.05, 0.67]}>
            <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
            <meshBasicMaterial color={neonGlow} />
          </mesh>

          {/* Telinga / Sendi Kepala (Aksen Tembaga Tua) */}
          <mesh position={[-0.8, 0.05, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0.8, 0.05, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Antena Kustom Tuning Knobs (Miring ke belakang) */}
          <mesh position={[-0.45, 0.8, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.06, 0.5, 16]} />
            <meshStandardMaterial color={accentColor} metalness={1} roughness={0.3} />
          </mesh>
          <mesh position={[0.45, 0.8, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.06, 0.5, 16]} />
            <meshStandardMaterial color={accentColor} metalness={1} roughness={0.3} />
          </mesh>
          {/* Detail Knobs Antena */}
          <mesh position={[-0.45, 1.05, -0.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={darkMetal} />
          </mesh>
          <mesh position={[0.45, 1.05, -0.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={darkMetal} />
          </mesh>
        </group>

        {/* --- LEHER robust --- */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.6} />
        </mesh>

        {/* --- BADAN UTAMA LEBIH BESAR & BERKARAKTER --- */}
        <group position={[0, -0.3, 0]}>
          {/* Torso (Deep Rocker Red) */}
          <mesh castShadow>
            <boxGeometry args={[1.3, 1.8, 1]} />
            <meshStandardMaterial color={mainColor} metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Plat Dada (Off-White Bersih) */}
          <mesh position={[0, 0.3, 0.51]}>
            <boxGeometry args={[1, 1, 0.05]} />
            <meshStandardMaterial color={whiteColor} metalness={0.9} roughness={0.3} />
          </mesh>

          {/* Inti Energi / Arc Reactor di Dada (Glow) */}
          <mesh position={[0, 0.3, 0.54]}>
            <torusGeometry args={[0.18, 0.05, 16, 32]} />
            <meshBasicMaterial color={neonGlow} />
          </mesh>
          <mesh position={[0, 0.3, 0.53]}>
            <circleGeometry args={[0.12, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Detail Etched Logo di Plat Dada (Customized Skene Musik) */}
          <mesh position={[0, -0.35, 0.54]}>
            <boxGeometry args={[0.8, 0.1, 0.01]} />
            <meshStandardMaterial color={mainColor} />
          </mesh>
          <mesh position={[0, -0.5, 0.54]}>
            <boxGeometry args={[0.6, 0.1, 0.01]} />
            <meshStandardMaterial color={mainColor} />
          </mesh>
        </group>

        {/* --- LENGAN KIRI robust (Diam Melayang) --- */}
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[-1.1, -0.4, 0.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color={mainColor} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.5, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.1, 0.25, 0.1]} />
              <meshBasicMaterial color={neonGlow} />
            </mesh>
          </group>
        </Float>

        {/* --- LENGAN KANAN robust (Diam Melayang) --- */}
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[1.1, -0.4, 0.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color={mainColor} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.5, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.1, 0.25, 0.1]} />
              <meshBasicMaterial color={neonGlow} />
            </mesh>
          </group>
        </Float>

        {/* --- ROKET/THRUSTER BAWAH LEBIH BESAR & robust --- */}
        <group position={[0, -1.3, 0]}>
          {/* Mesin Knalpot Utama */}
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.25, 0.5, 32]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.6} />
          </mesh>
          {/* Detail Nozzles Thruster */}
          <mesh position={[-0.2, -0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color={darkMetal} />
          </mesh>
          <mesh position={[0.2, -0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color={darkMetal} />
          </mesh>
          {/* Cincin Api Jet (Glow) */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
            <meshBasicMaterial color={neonGlow} />
          </mesh>
        </group>

      </group>
    </Float>
  );
};


// =======================================================
// CANVAS UTAMA PEMBUNGKUS
// =======================================================
const Robot3D = () => {
  return (
    // Container transparan penuh
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1.5, 7.5], fov: 40 }}>
        
        {/* Lingkungan pencahayaan studio/kota otomatis dari Drei (bikin efek metalik jadi realistis) */}
        <Environment preset="city" />

        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        
        {/* Model Robot */}
        <ModernRockerRobot />

        {/* Bayangan Halus di Bawah (Menyatu dengan Background) */}
        <ContactShadows 
          position={[0, -1.9, 0]} 
          opacity={0.8} 
          scale={15} 
          blur={3} 
          far={5} 
          color="#000000" 
        />

        {/* Kontrol Kamera (Hanya Geser, Gak Bisa Zoom/Scroll ke dalam) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false} 
          minPolarAngle={Math.PI / 2.5} // Batas rotasi atas
          maxPolarAngle={Math.PI / 1.8} // Batas rotasi bawah
        />
        
      </Canvas>
    </div>
  );
};

export default Robot3D;