'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const useReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HeroSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // -------- Parallax background (throttled & reduced-motion aware) --------
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!bgRef.current || !contentRef.current) return;
    const reduced = reducedMotion
    if (reduced) return; // Respect user preference

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let rafId = 0;
    let lastMove = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 16) return; // ~60fps throttle
      lastMove = now;
      targetX = (e.clientX / window.innerWidth - 0.5) * 36;
      targetY = (e.clientY / window.innerHeight - 0.5) * 36;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.06)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-currentX * 0.03}px, ${-currentY * 0.03}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reducedMotion]);

  // -------------------------- THREE.JS SCENE --------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Visibility controls for power saving
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { root: null, threshold: 0.05 }
    );
    io.observe(container);

    let animating = true;

    // Scene + Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // we’ll rely on DPR for smoothness
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    // Cap DPR for perf; enable AA only on strong devices
    const deviceIsHighEnd =
      (navigator as any).hardwareConcurrency ? (navigator as any).hardwareConcurrency >= 8 : true;
    const DPR = Math.min(deviceIsHighEnd ? 1.75 : 1.25, window.devicePixelRatio || 1);
    renderer.setPixelRatio(DPR);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Resize (debounced)
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener('orientationchange', onResize);

    // ----------------- Content (Instanced for performance) -----------------
    // Laptop (two simple meshes)
    const group = new THREE.Group();
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(3, 2, 0.08),
      new THREE.MeshPhysicalMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      })
    );
    screen.position.y = 1;
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.18, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.45,
        metalness: 0.7,
      })
    );
    base.position.y = -0.1;
    group.add(screen, base);
    scene.add(group);

    // Lights (simple + cheap)
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0x9ec1ff, 1.2);
    dir.position.set(4, 6, 8);
    scene.add(dir);

    const pointA = new THREE.PointLight(0x3b82f6, 1.0, 18);
    const pointB = new THREE.PointLight(0x10b981, 0.8, 14);
    pointA.position.set(2, 2.5, 3.5);
    pointB.position.set(-2.5, -1.5, 3);
    scene.add(pointA, pointB);

    // Orbiting "icons" as instanced boxes/cones/spheres unified into one geometry
    const iconCount = 10; // many, but 1 draw call
    const iconGeo = new THREE.BoxGeometry(0.26, 0.26, 0.1);
    const iconMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.25,
      metalness: 0.85,
      transmission: 0.55,
      thickness: 0.5,
      color: 0xffffff,
    });
    const icons = new THREE.InstancedMesh(iconGeo, iconMat, iconCount);
    const iconDummy = new THREE.Object3D();
    const iconOffsets: Array<{ basePos: THREE.Vector3; speed: number; angle: number }> = [];
    for (let i = 0; i < iconCount; i++) {
      const angle = (i / iconCount) * Math.PI * 2;
      const radius = 3.6 + Math.random() * 2.2;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.6,
        Math.sin(angle) * 1.2
      );
      const speed = 0.15 + Math.random() * 0.35;
      iconOffsets.push({ basePos, speed, angle });
      iconDummy.position.copy(basePos);
      iconDummy.rotation.set(Math.random(), Math.random(), Math.random());
      iconDummy.updateMatrix();
      icons.setMatrixAt(i, iconDummy.matrix);

      // subtle color variance via instance color
      const c = new THREE.Color().setHSL((i / iconCount) * 0.9, 0.6, 0.6);
      icons.setColorAt(i, c);
    }
    icons.instanceMatrix.needsUpdate = true;
    (icons as any).instanceColor.needsUpdate = true;
    scene.add(icons);

    // Particles as one Points object
    const particleCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 8;
      pPos[i3 + 1] = (Math.random() - 0.5) * 6;
      pPos[i3 + 2] = (Math.random() - 0.5) * 8;
      const blueish = Math.random() > 0.5;
      pCol[i3] = blueish ? 0.35 : 0.2;
      pCol[i3 + 1] = blueish ? 0.6 : 0.82;
      pCol[i3 + 2] = blueish ? 1.0 : 0.62;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse → gentle camera rotation (throttled)
    const mouse = new THREE.Vector2();
    const targetRot = new THREE.Vector2();
    let lastMouse = 0;
    const onPointer = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMouse < 16) return;
      lastMouse = now;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.x = mouse.y * 0.13;
      targetRot.y = mouse.x * 0.13;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Animation
    const clock = new THREE.Clock();
    const reduced = reducedMotion;

    const renderLoop = () => {
      if (!animating) return;
      const t = clock.getElapsedTime();
      // Pause rendering when not visible to save battery/CPU
      if (isVisible && !document.hidden) {
        // Smooth camera ease
        camera.rotation.x += (targetRot.x - camera.rotation.x) * 0.04;
        camera.rotation.y += (targetRot.y - camera.rotation.y) * 0.04;

        // Laptop gentle float
        group.rotation.x = Math.sin(t * 0.3) * 0.08;
        group.rotation.y = Math.sin(t * 0.2) * 0.08;
        group.position.y = Math.sin(t * 0.45) * 0.08;

        // Update icons instanced matrices
        const dummy = iconDummy;
        for (let i = 0; i < iconCount; i++) {
          const { basePos, speed, angle } = iconOffsets[i];
          const a = angle + t * speed;
          dummy.position.set(
            Math.cos(a) * basePos.length(),
            basePos.y + Math.sin(t * speed + i * 0.1) * 0.4,
            Math.sin(a) * basePos.z
          );
          if (!reduced) dummy.rotation.set(t * 0.4, t * 0.25, 0);
          dummy.updateMatrix();
          icons.setMatrixAt(i, dummy.matrix);
        }
        icons.instanceMatrix.needsUpdate = true;

        // Particle drift (very cheap)
        const pos = pGeo.getAttribute('position') as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          arr[i] += Math.sin(t + i) * 0.0025;
          arr[i + 1] += Math.cos(t * 0.8 + i) * 0.003;
          arr[i + 2] += Math.sin(t * 0.5 + i) * 0.002;
          // soft bounds reset
          if (Math.abs(arr[i]) > 9 || Math.abs(arr[i + 1]) > 7 || Math.abs(arr[i + 2]) > 9) {
            arr[i] = (Math.random() - 0.5) * 2;
            arr[i + 1] = (Math.random() - 0.5) * 2;
            arr[i + 2] = (Math.random() - 0.5) * 2;
          }
        }
        pos.needsUpdate = true;

        // light orbits (cheap)
        pointA.position.x = Math.sin(t * 0.5) * 2.6;
        pointA.position.z = Math.cos(t * 0.5) * 2.6;
        pointB.position.y = Math.sin(t * 0.35) * 1.8;
        pointB.position.x = Math.cos(t * 0.4) * 2;

        renderer.render(scene, camera);
      }
      // Use setAnimationLoop for better integration with browser refresh rate
      // but guard with requestAnimationFrame fallback just in case:
      _raf = requestAnimationFrame(renderLoop);
    };

    let _raf = requestAnimationFrame(renderLoop);

    // Loading overlay timing
    const loadTimer = setTimeout(() => setIsLoading(false), 500);

    // Page visibility pause
    const onVis = () => {
      // we keep loop, but skip heavy work using document.hidden flag above
    };
    document.addEventListener('visibilitychange', onVis);

    // Cleanup
    return () => {
      animating = false;
      cancelAnimationFrame(_raf);
      clearTimeout(loadTimer);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      window.removeEventListener('orientationchange', onResize);
      io.disconnect();
      container.removeChild(renderer.domElement);
      // Dispose
      icons.geometry.dispose();
      (icons.material as THREE.Material).dispose();
      (screen.geometry as THREE.BufferGeometry).dispose();
      (screen.material as THREE.Material).dispose();
      (base.geometry as THREE.BufferGeometry).dispose();
      (base.material as THREE.Material).dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Layered Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-950" />
        <div
          ref={bgRef}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-500/10 transition-transform duration-1000 ease-out will-change-transform"
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 79px, #60a5fa 79px, #60a5fa 81px, transparent 81px),
              linear-gradient(#60a5fa 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100% 30px',
          }}
        />
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.p className="text-blue-400 font-mono text-sm">Initializing…</motion.p>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full grid grid-cols-1 lg:grid-cols-2 px-6 md:px-12 lg:px-20">
        {/* Left */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col justify-center text-left space-y-6 will-change-transform"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
          >
            TALENT WITH US
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Transforming ideas into{' '}
            <span className="text-cyan-400 font-semibold">world-class digital products</span> with
            cutting-edge AI, immersive 3D, and next-gen web tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 18px 36px rgba(59,130,246,0.28)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl text-lg font-bold shadow-2xl"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(59,130,246,0.1)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 rounded-2xl text-lg font-semibold hover:bg-cyan-400/10"
            >
              Explore Services
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {['AI/ML', 'Web Apps', 'Mobile', 'Cloud', 'Blockchain', 'IoT'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D mount */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex justify-center items-center relative"
        >
          <div ref={mountRef} className="w-full h-[400px] lg:h-[600px] xl:h-[700px]" />
          {/* Floating labels (cheap DOM anims) */}
          <div className="absolute inset-0 pointer-events-none">
            {['React', 'Node.js', 'Python', 'AI', 'Cloud', 'Mobile'].map((label, index) => (
              <motion.div
                key={label}
                className="absolute text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/30"
                style={{
                  left: `${20 + ((index * 12) % 60)}%`,
                  top: `${30 + ((index * 8) % 50)}%`,
                }}
                animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3 + index, repeat: Infinity, delay: index * 0.4 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
