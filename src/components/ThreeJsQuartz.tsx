"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeJsQuartz() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* Scene, camera, renderer */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* Create a crystalline quartz geometry */
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd1d5db,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 2.0,
      ior: 1.45,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* Wireframe overlay */
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    /* Lighting */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xf8fafc, 1.2);
    directionalLight.position.set(3, 5, 4);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xcbd5e1, 0.8, 20);
    pointLight.position.set(-3, -2, 3);
    scene.add(pointLight);

    /* Scroll-driven rotation */
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(wireMesh.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    /* Idle subtle rotation */
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      mesh.rotation.x += 0.002;
      mesh.rotation.z += 0.001;
      wireMesh.rotation.x += 0.002;
      wireMesh.rotation.z += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    /* Handle resize */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
