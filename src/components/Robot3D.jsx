import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";

// =======================================================
// PALET WARNA MODERN SILVER (Premium & Elegan)
// =======================================================
const mainColor = "#D3D7CF"; // Light Brushed Silver (Perak terang tapi tidak mencolok mata)
const accentColor = "#9CA3AF"; // Slate Silver (Perak sedikit lebih gelap untuk dimensi)
const darkMetal = "#2B2D31"; // Dark Titanium (Untuk leher, sendi, & mesin roket)
const whiteColor = "#FFFFFF"; // Putih bersih (untuk logo dada)
const neonGlow = "#00FFFF"; // Ice Blue / Cyan Neon (untuk lampu)
const blackGlass = "#0A0A0A"; // Kaca Visor Hitam Elegan

// =======================================================
// KOMPONEN MODEL ROBOT MODERN SILVER
// =======================================================
const ModernRockerRobot = () => {
  return (
    // Efek Float: Membuat seluruh tubuh robot melayang/bernapas halus
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <group position={[0, 0.5, 0]}>
        
        {/* --- KEPALA & VISOR --- */}
        <group position={[0, 1.4, 0]}>
          {/* Cangkang Kepala (Brushed Silver) */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.1, 1.2]} />
            <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Layar/Visor Depan (Kaca Hitam Mengkilap) */}
          <mesh position={[0, 0, 0.61]}>
            <boxGeometry args={[1.3, 0.8, 0.05]} />
            <meshStandardMaterial color={blackGlass} metalness={1} roughness={0.05} />
          </mesh>

          {/* Grille Speaker di Visor (Aksen Skene/Retro-Modern) */}
          <mesh position={[0, 0, 0.64]}>
            <boxGeometry args={[1.2, 0.6, 0.02]} />
            <meshBasicMaterial color={darkMetal} />
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

          {/* Telinga / Sendi Kepala (Dark Titanium) */}
          <mesh position={[-0.8, 0.05, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.4} />
          </mesh>
          <mesh position={[0.8, 0.05, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.4} />
          </mesh>

          {/* Antena Kustom Tuning Knobs (Miring ke belakang) */}
          <mesh position={[-0.45, 0.8, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.06, 0.5, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.45, 0.8, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.06, 0.5, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Detail Knobs Antena */}
          <mesh position={[-0.45, 1.05, -0.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0.45, 1.05, -0.2]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* --- LEHER (Dark Titanium) --- */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 16]} />
          <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.5} />
        </mesh>

        {/* --- BADAN UTAMA (Brushed Silver) --- */}
        <group position={[0, -0.3, 0]}>
          {/* Torso */}
          <mesh castShadow>
            <boxGeometry args={[1.3, 1.8, 1]} />
            <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Plat Dada (Aksen Slate Silver) */}
          <mesh position={[0, 0.3, 0.51]}>
            <boxGeometry args={[1, 1, 0.05]} />
            <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Inti Energi / Arc Reactor di Dada (Glow Cyan) */}
          <mesh position={[0, 0.3, 0.54]}>
            <torusGeometry args={[0.18, 0.05, 16, 32]} />
            <meshBasicMaterial color={neonGlow} />
          </mesh>
          <mesh position={[0, 0.3, 0.53]}>
            <circleGeometry args={[0.12, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Detail Garis Mesin di Dada Bawah */}
          <mesh position={[0, -0.35, 0.54]}>
            <boxGeometry args={[0.8, 0.08, 0.01]} />
            <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.5, 0.54]}>
            <boxGeometry args={[0.6, 0.08, 0.01]} />
            <meshStandardMaterial color={darkMetal} metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* --- LENGAN KIRI (Diam Melayang) --- */}
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[-1.1, -0.4, 0.2]}>
            {/* Lengan Silver */}
            <mesh castShadow>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Jari Besi/Titanium */}
            <mesh position={[0, -0.5, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.1, 0.25, 0.1]} />
              <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.4} />
            </mesh>
          </group>
        </Float>

        {/* --- LENGAN KANAN (Diam Melayang) --- */}
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={[1.1, -0.4, 0.2]}>
            {/* Lengan Silver */}
            <mesh castShadow>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Jari Besi/Titanium */}
            <mesh position={[0, -0.5, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[0.1, 0.25, 0.1]} />
              <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.4} />
            </mesh>
          </group>
        </Float>

        {/* --- ROKET/THRUSTER BAWAH --- */}
        <group position={[0, -1.3, 0]}>
          {/* Mesin Knalpot Utama (Titanium) */}
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.25, 0.5, 32]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.5} />
          </mesh>
          {/* Detail Nozzles Thruster */}
          <mesh position={[-0.2, -0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.5} />
          </mesh>
          <mesh position={[0.2, -0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
            <meshStandardMaterial color={darkMetal} metalness={0.9} roughness={0.5} />
          </mesh>
          {/* Cincin Api Jet (Glow Ice Blue) */}
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
        
        {/* Lingkungan pencahayaan studio/kota otomatis dari Drei
            Sangat penting untuk material silver agar bisa memantulkan cahaya!
        */}
        <Environment preset="city" />

        <ambientLight intensity={0.6} />
        {/* Lampu tembak dari atas serong kanan untuk efek kilap */}
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        <spotLight position={[-10, 5, 10]} angle={0.2} penumbra={1} intensity={0.5} color="#00FFFF" />
        
        {/* Model Robot */}
        <ModernRockerRobot />

        {/* Bayangan Halus di Bawah (Menyatu dengan Background website Anda) */}
        <ContactShadows 
          position={[0, -1.9, 0]} 
          opacity={0.8} 
          scale={15} 
          blur={3} 
          far={5} 
          color="#000000" 
        />

        {/* Kontrol Kamera (Bisa di-drag kiri kanan, tapi gak bisa di-zoom) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false} 
          minPolarAngle={Math.PI / 2.5} // Batas lihat dari atas
          maxPolarAngle={Math.PI / 1.8} // Batas lihat dari bawah
        />
        
      </Canvas>
    </div>
  );
};

export default Robot3D;