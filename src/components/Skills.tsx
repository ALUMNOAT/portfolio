import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { FaJava } from 'react-icons/fa';
import {
  SiPhp, SiPython, SiGit,
  SiJavascript, SiDart, SiFlutter, SiHtml5,
  SiCss
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useLanguage } from '../context/LanguageContext';

interface Skill {
  name: string;
  color: string;
  position: [number, number, number];
  icon: IconType;
}

const skillsData: Skill[] = [
  { name: 'CSS', color: '#264de4', position: [-3, 3.5, 0], icon: SiCss },
  { name: 'Java', color: '#f89820', position: [0, 3.5, 0], icon: FaJava },
  { name: 'PHP', color: '#777BB4', position: [3, 3.5, 0], icon: SiPhp },
  { name: 'JavaScript', color: '#F7DF1E', position: [-3, 0, 0], icon: SiJavascript },
  { name: 'Python', color: '#3776AB', position: [0, 0, 0], icon: SiPython },
  { name: 'Git', color: '#F05032', position: [3, 0, 0], icon: SiGit },
  { name: 'Dart', color: '#0175C2', position: [-3, -3.5, 0], icon: SiDart },
  { name: 'Flutter', color: '#02569B', position: [0, -3.5, 0], icon: SiFlutter },
  { name: 'HTML5', color: '#E34F26', position: [3, -3.5, 0], icon: SiHtml5 },
];

// Géométrie partagée par les 9 boules (créée une seule fois, 16x16 au lieu de 32x32)
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

// Renvoie true quand l'élément est (presque) à l'écran
function useInView<T extends Element>(rootMargin = '100px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

// Transforme une icône React en texture Three.js (SVG blanc -> image)
function useIconTexture(Icon: IconType) {
  const texture = useMemo(() => {
    let svg = renderToStaticMarkup(
      createElement(Icon, { size: 256, style: { color: '#ffffff' } })
    );
    if (!svg.includes('xmlns=')) {
      svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    const t = new THREE.TextureLoader().load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = false;
    t.minFilter = THREE.LinearFilter;
    return t;
  }, [Icon]);

  // Libère la mémoire GPU au démontage
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

// Suit le mode sombre (classe "dark" sur <html>) pour adapter la couleur des languettes
function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

// Dessine la languette (pastille + nom) sur un canvas -> texture Three.js
function useLabelTexture(name: string, dark: boolean) {
  const result = useMemo(() => {
    const font = 'bold 44px system-ui, -apple-system, "Segoe UI", Arial, sans-serif';
    const measure = document.createElement('canvas').getContext('2d')!;
    measure.font = font;
    const textWidth = measure.measureText(name).width;

    const height = 96;
    const width = Math.ceil(textWidth + 80);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.beginPath();
    ctx.roundRect(2, 2, width - 4, height - 4, (height - 4) / 2);
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.92)';
    ctx.fill();

    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = dark ? '#030712' : '#ffffff';
    ctx.fillText(name, width / 2, height / 2 + 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return { texture, aspect: width / height };
  }, [name, dark]);

  // Libère l'ancienne texture quand le thème change, et au démontage
  useEffect(() => () => result.texture.dispose(), [result]);
  return result;
}

function SkillBall({ skill }: { skill: Skill }) {
  const iconTexture = useIconTexture(skill.icon);
  const dark = useIsDark();
  const label = useLabelTexture(skill.name, dark);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={skill.position}>
        <mesh geometry={sphereGeometry}>
          <meshStandardMaterial
            color={skill.color}
            roughness={0.2}
            metalness={0.5}
            emissive={skill.color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Icône dessinée dans la scène 3D, toujours face à la caméra */}
        <Billboard>
          <mesh position={[0, 0, 1.1]}>
            <planeGeometry args={[1.1, 1.1]} />
            <meshBasicMaterial
              map={iconTexture}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>

        {/* Languette avec le nom, dessinée dans la scène 3D */}
        <Billboard position={[0, 1.7, 0]}>
          <mesh>
            <planeGeometry args={[0.55 * label.aspect, 0.55]} />
            <meshBasicMaterial
              map={label.texture}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      </group>
    </Float>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [canvasRef, inView] = useInView<HTMLDivElement>('100px');

  return (
    <section id='skills' className='min-h-screen py-24 flex flex-col items-center relative bg-transparent'>
      <div className='text-center mb-12 mt-10 px-4'>
        <h2 className='text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight'>{t('skillsTitle')}</h2>
        <p className='text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto'>
          {t('skillsSubtitle')}
        </p>
      </div>

      <div ref={canvasRef} className='w-full h-[600px] cursor-grab active:cursor-grabbing relative z-0'>
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 15], fov: 50 }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={3} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ff9999" />

          {skillsData.map((skill) => (
            <SkillBall key={skill.name} skill={skill} />
          ))}

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} enablePan={false} />
        </Canvas>
      </div>
    </section>
  );
}