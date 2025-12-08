import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';

interface CarViewer3DProps {
  onPartSelect?: (partId: string) => void;
}

// Porsche 911 Carrera 4S Model with interactive parts
const CarModel = ({ onPartSelect }: { onPartSelect?: (partId: string) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // Load the Porsche 911 model
  const { scene } = useGLTF('/models/free_porsche_911_carrera_4s.glb');

  // Auto-rotate animation
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  // Clone and enhance the model with interactive parts
  const clonedScene = scene.clone();
  
  // Map of part names to match against mesh names (case-insensitive)
  const partKeywords: Record<string, string[]> = {
    'door': ['door', 'porte', 'tür'],
    'wheel': ['wheel', 'rim', 'tire', 'roue', 'rad'],
    'hood': ['hood', 'bonnet', 'capot', 'motorhaube'],
    'trunk': ['trunk', 'boot', 'coffre', 'kofferraum'],
    'window': ['window', 'glass', 'vitre', 'fenster', 'windshield'],
    'mirror': ['mirror', 'retroviseur', 'spiegel'],
    'headlight': ['headlight', 'light', 'phare', 'scheinwerfer', 'lamp'],
    'taillight': ['taillight', 'tail', 'rear_light', 'backlight'],
    'bumper': ['bumper', 'pare', 'stoßstange'],
    'spoiler': ['spoiler', 'wing', 'aileron'],
    'exhaust': ['exhaust', 'echappement', 'auspuff', 'pipe'],
    'body': ['body', 'chassis', 'karosserie', 'fender', 'quarter'],
  };

  // Function to identify part type from mesh name
  const identifyPart = (meshName: string): string => {
    const lowerName = meshName.toLowerCase();
    for (const [partType, keywords] of Object.entries(partKeywords)) {
      if (keywords.some(keyword => lowerName.includes(keyword))) {
        return partType;
      }
    }
    return 'body'; // default to body
  };

  // Traverse and enhance materials with interactivity
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Identify what part this mesh represents
      const partType = identifyPart(mesh.name);
      mesh.userData.partType = partType;
      
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        
        // Store original material properties
        mesh.userData.originalEmissive = material.emissive?.clone() || new THREE.Color(0x000000);
        mesh.userData.originalEmissiveIntensity = material.emissiveIntensity || 0;
        
        // Enhance materials
        material.envMapIntensity = 1.5;
        material.metalness = Math.min(material.metalness * 1.2, 1);
        material.roughness = Math.max(material.roughness * 0.8, 0.1);
        
        // Update material based on hover/selection state
        const isHovered = hoveredPart === partType;
        const isSelected = selectedPart === partType;
        
        if (isSelected) {
          material.emissive = new THREE.Color('#3b82f6');
          material.emissiveIntensity = 0.4;
        } else if (isHovered) {
          material.emissive = new THREE.Color('#60a5fa');
          material.emissiveIntensity = 0.2;
        } else {
          material.emissive = mesh.userData.originalEmissive;
          material.emissiveIntensity = mesh.userData.originalEmissiveIntensity;
        }
      }
    }
  });

  const handlePartClick = (event: any) => {
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation();
    }
    
    const intersected = event.object;
    if (intersected && intersected.userData.partType) {
      const partType = intersected.userData.partType;
      setSelectedPart(partType);
      setAutoRotate(false);
      onPartSelect?.(partType);
      
      // Resume auto-rotate after 8 seconds
      setTimeout(() => {
        setAutoRotate(true);
        setSelectedPart(null);
      }, 8000);
    }
  };

  const handlePartHover = (event: any) => {
    if (event && event.object && event.object.userData.partType) {
      const partType = event.object.userData.partType;
      setHoveredPart(partType);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePartUnhover = () => {
    setHoveredPart(null);
    document.body.style.cursor = 'default';
  };

  return (
    <group ref={groupRef}>
      <primitive 
        object={clonedScene} 
        scale={1.5} 
        position={[0, -0.8, 0]}
        onClick={handlePartClick}
        onPointerOver={handlePartHover}
        onPointerOut={handlePartUnhover}
      />
    </group>
  );
};

// Premium loading component
const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 1.5]} />
      <meshStandardMaterial color="#3b82f6" wireframe opacity={0.3} transparent />
    </mesh>
  );
};

export const CarViewer3D = ({ onPartSelect }: CarViewer3DProps) => {
  return (
    <div className="relative w-full h-[75vh] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1d2e] via-[#252a3f] to-[#1a1d2e]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full filter blur-[150px]"></div>
      </div>

      <Canvas shadows className="relative z-10">
        <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={50} />
        
        {/* Studio lighting setup for professional look */}
        <ambientLight intensity={0.5} />
        
        {/* Main key light - top front */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light - soft from side */}
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />
        
        {/* Rim light - back highlight */}
        <spotLight position={[-5, 8, -8]} intensity={1.2} angle={0.4} penumbra={1} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Car Model */}
        <Suspense fallback={<LoadingFallback />}>
          <CarModel onPartSelect={onPartSelect} />
        </Suspense>
        
        {/* Ground reflection shadow - like the reference */}
        <ContactShadows 
          position={[0, -0.79, 0]} 
          opacity={0.75} 
          scale={12} 
          blur={2} 
          far={3} 
          resolution={512}
          color="#000000"
        />
        
        {/* Enhanced controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate={false}
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.08}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Floating UI overlay */}
      <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-2xl z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Interactive 3D Model</p>
            <p className="text-white font-medium">Click parts to view details • Drag to rotate • Scroll to zoom</p>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-tesla-blue-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};
